import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls.js';

const TAU=Math.PI*2;
let seed=47;
function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
const V=(x,y,z)=>new THREE.Vector3(x,y,z);

export class BiologyViewer{
 constructor(host,labelHost,onSelect){
  this.host=host;this.labelHost=labelHost;this.onSelect=onSelect;this.labels=[];this.pickables=[];this.selected='nucleus';this.mode='cell';this.labelsVisible=true;this.active=true;
  this.scene=new THREE.Scene();this.camera=new THREE.PerspectiveCamera(37,1,.1,60);this.camera.position.set(.35,.65,8.4);
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));this.renderer.setClearColor(0xffffff,0);this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.0;this.host.appendChild(this.renderer.domElement);
  this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableDamping=true;this.controls.dampingFactor=.075;this.controls.enablePan=false;this.controls.minDistance=5;this.controls.maxDistance=15;this.controls.autoRotateSpeed=.6;this.controls.target.set(0,0,0);this.controls.saveState();
  this.scene.add(new THREE.HemisphereLight(0xf7faff,0xa6a0a2,1.5));
  const light=new THREE.DirectionalLight(0xfff6ed,2.6);light.position.set(-3,5,7);this.scene.add(light);
  const fill=new THREE.DirectionalLight(0xe3ecff,1.4);fill.position.set(5,1,3);this.scene.add(fill);
  const rim=new THREE.DirectionalLight(0xffffff,2.5);rim.position.set(0,-2,-4);this.scene.add(rim);
  const textureCanvas=document.createElement('canvas');textureCanvas.width=textureCanvas.height=256;const ctx=textureCanvas.getContext('2d');const pixels=ctx.createImageData(256,256);for(let i=0;i<pixels.data.length;i+=4){const v=140+random()*110;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=v;pixels.data[i+3]=255;}ctx.putImageData(pixels,0,0);this.bump=new THREE.CanvasTexture(textureCanvas);this.bump.wrapS=this.bump.wrapT=THREE.RepeatWrapping;this.bump.repeat.set(3,3);
  this.cell=new THREE.Group();this.scene.add(this.cell);this.buildCell();
  this.molecule=new THREE.Group();this.molecule.visible=false;this.scene.add(this.molecule);
  this.raycaster=new THREE.Raycaster();this.pointer=new THREE.Vector2();this.down=null;
  this.renderer.domElement.addEventListener('pointerdown',e=>{this.down={x:e.clientX,y:e.clientY,time:performance.now()};});
  this.renderer.domElement.addEventListener('pointerup',e=>{if(this.down&&Math.hypot(e.clientX-this.down.x,e.clientY-this.down.y)<6&&performance.now()-this.down.time<600)this.pick(e);this.down=null;});
  this.renderer.domElement.addEventListener('pointermove',e=>{if(e.buttons)return;const hit=this.hit(e);this.renderer.domElement.style.cursor=hit?'pointer':'grab';});
  this.host.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){this.zoom(.88);e.preventDefault();}else if(e.key==='-'){this.zoom(1.12);e.preventDefault();}else if(e.key.startsWith('Arrow')){const offset=this.camera.position.clone().sub(this.controls.target);const spherical=new THREE.Spherical().setFromVector3(offset);if(e.key==='ArrowLeft')spherical.theta-=.15;if(e.key==='ArrowRight')spherical.theta+=.15;if(e.key==='ArrowUp')spherical.phi=Math.max(.1,spherical.phi-.15);if(e.key==='ArrowDown')spherical.phi=Math.min(Math.PI-.1,spherical.phi+.15);this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(spherical));this.controls.update();e.preventDefault();}});
  this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(host);this.resize();this.select('nucleus');
  this.renderer.setAnimationLoop(()=>{if(!this.active||document.hidden)return;this.controls.update();this.updateLabels();this.renderer.render(this.scene,this.camera);});
  this.renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();this.active=false;this.host.dispatchEvent(new CustomEvent('viewer-error',{detail:'三维显示暂时中断，请刷新页面恢复。左侧知识点仍可学习。'}));});
 }
 material(color,options={}){const tint=new THREE.Color(color),hsl={};tint.getHSL(hsl,THREE.SRGBColorSpace);tint.setHSL(hsl.h,Math.min(.48,hsl.s*1.65+.04),hsl.l,THREE.SRGBColorSpace);return new THREE.MeshPhysicalMaterial({color:tint,roughness:.42,metalness:0,clearcoat:.2,clearcoatRoughness:.36,bumpMap:this.bump,bumpScale:.022,...options});}
 mesh(geometry,material,parent,id,position=[0,0,0],scale=[1,1,1]){const mesh=new THREE.Mesh(geometry,material);mesh.position.set(...position);mesh.scale.set(...scale);parent.add(mesh);if(id){mesh.userData.topic=id;this.pickables.push(mesh);}return mesh;}
 sphere(parent,pos,scale,color,id,opts={}){return this.mesh(new THREE.SphereGeometry(1,40,28),this.material(color,opts),parent,id,pos,scale);}
 tube(parent,points,radius,color,id,closed=false){return this.mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,closed),Math.max(28,points.length*3),radius,8,closed),this.material(color),parent,id);}
 shell(parent,radii,start,color,id){const geometry=new THREE.SphereGeometry(1,96,64,0,TAU,start,Math.PI-start);geometry.rotateX(Math.PI/2); // polar axis faces camera (+z after rotation sign flip)
  const a=geometry.attributes.position;for(let i=0;i<a.count;i++){const x=a.getX(i),y=a.getY(i),z=a.getZ(i),noise=1+.025*Math.sin(x*7+y*3)*Math.sin(y*6+z*4);a.setXYZ(i,x*radii[0]*noise,y*radii[1]*noise,z*radii[2]*noise);}geometry.computeVertexNormals();return this.mesh(geometry,this.material(color,{side:THREE.DoubleSide}),parent,id);}
 instanceDots(parent,positions,size,color,id){const inst=new THREE.InstancedMesh(new THREE.SphereGeometry(1,10,8),this.material(color),positions.length);const m=new THREE.Matrix4();positions.forEach((p,i)=>{m.compose(V(...p),new THREE.Quaternion(),V(size,size*.8,size));inst.setMatrixAt(i,m);});parent.add(inst);if(id){inst.userData.topic=id;this.pickables.push(inst);}return inst;}
 addLabel(id,text,position,offset=[0,0]){const el=document.createElement('button');el.className='model-label';el.textContent=text;el.dataset.topic=id;el.setAttribute('aria-label','查看'+text+'讲解');el.addEventListener('click',()=>this.onSelect(id));this.labelHost.append(el);this.labels.push({id,el,position:V(...position),offset});}
 buildCell(){
  // Open membrane shell. The removed front cap exposes organelles for learning.
  const shell=this.shell(this.cell,[2.72,2.2,1.62],1.43,'#c4c2b5','membrane');shell.material.roughness=.38;
  const rim=[];for(let i=0;i<120;i++){const a=i/120*TAU,n=1+.025*Math.sin(Math.cos(a)*7+Math.sin(a)*3)*Math.sin(Math.sin(a)*6+.4);rim.push(V(2.69*Math.cos(a)*n,2.18*Math.sin(a)*n,.23+.03*Math.sin(a*5)));}this.tube(this.cell,rim,.045,'#b5b9a8','membrane',true);
  const rim2=rim.map(p=>V(p.x*.982,p.y*.982,p.z-.075));this.tube(this.cell,rim2,.035,'#d6d2c1','membrane',true);
  const lipids=[];for(let i=0;i<260;i++){const a=i/260*TAU;lipids.push([2.69*Math.cos(a),2.18*Math.sin(a),.24]);}this.instanceDots(this.cell,lipids,.033,'#dcd9c8','membrane');
  // Interior cytoplasmic contours visible behind the organelles.
  for(let j=0;j<12;j++){const pts=[];const a0=random()*TAU;for(let i=0;i<30;i++){const a=a0+i*.075;const r=1.6+j*.075;pts.push(V(Math.cos(a)*r,Math.sin(a)*r*.76,-.75+.09*Math.sin(i*.4)));}this.tube(this.cell,pts,.013,'#b8bfb3',null);}
  const nucleus=new THREE.Group();nucleus.position.set(-.25,.24,.17);this.cell.add(nucleus);
  this.shell(nucleus,[.93,.87,.77],.85,'#9c92ab','nucleus');
  // Cut surface and chromatin, with a separate dark nucleolus inside the nucleus.
  this.sphere(nucleus,[0,0,.32],[.71,.67,.28],'#b6acc4','nucleus',{roughness:.75});
  const nr=[];for(let i=0;i<100;i++){const a=i/100*TAU;nr.push(V(.71*Math.cos(a),.67*Math.sin(a),.51));}this.tube(nucleus,nr,.035,'#c0b5cc','nucleus',true);
  for(let j=0;j<8;j++){const pts=[];for(let k=0;k<55;k++){const a=k*.22+j*.65,r=.18+j*.052;pts.push(V(Math.cos(a)*r+.05*Math.sin(k*.6),Math.sin(a)*r*.87,.55+.018*Math.sin(k*.8)));}this.tube(nucleus,pts,.013,'#978aa9','nucleus');}
  this.sphere(nucleus,[.09,-.08,.6],[.25,.23,.16],'#887897','nucleus',{roughness:.66});
  for(let j=0;j<26;j++){const a=random()*TAU,p=.95+random()*1.5;const pos=V(.94*Math.sin(p)*Math.cos(a),.88*Math.sin(p)*Math.sin(a),.78*Math.cos(p));const ring=this.mesh(new THREE.TorusGeometry(.038,.012,6,14),this.material('#d2c9dc'),nucleus,'nucleus',pos.toArray());ring.quaternion.setFromUnitVectors(V(0,0,1),pos.clone().normalize());}
  // Folded membrane cisternae, drawn as surfaces with rounded edges.
  const dots=[];
  for(let j=0;j<8;j++){
   const vertices=[],indices=[],edgeA=[],edgeB=[];const n=110;
   for(let i=0;i<=n;i++){const a=.18+i/n*4.95,base=1.01+j*.095,wave=.045*Math.sin(a*7+j*.8);const radial=base+wave;
    for(let k=0;k<2;k++){const r=radial+k*.12,x=-.25+r*Math.cos(a),y=.24+r*Math.sin(a)*.79,z=.01+j*.026+.055*Math.sin(a*6+j*.65);vertices.push(x,y,z);(k?edgeB:edgeA).push(V(x,y,z));if(k===1&&i%8===0&&j%2===0)dots.push([x,y,z+.045]);}
    if(i<n){const q=i*2;indices.push(q,q+1,q+2,q+1,q+3,q+2);}
   }
   const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.setIndex(indices);geo.computeVertexNormals();this.mesh(geo,this.material(j%2?'#a0adbc':'#acb7c4',{side:THREE.DoubleSide}),this.cell,'er');this.tube(this.cell,edgeA,.026,'#8e9fb2','er');this.tube(this.cell,edgeB,.028,'#c1c9d3','er');
  }
  this.instanceDots(this.cell,dots,.036,'#c1b7a1','ribosome');
  // Mitochondria with an open face, inner membrane rim and folded cristae.
  const mito=(pos,angle,scale)=>{const group=new THREE.Group();group.position.set(...pos);group.rotation.z=angle;group.scale.setScalar(scale);this.cell.add(group);
   this.shell(group,[.68,.32,.29],1.32,'#b69087','mitochondria');this.sphere(group,[0,0,-.04],[.62,.27,.12],'#c7a89b','mitochondria',{roughness:.65});
   const rim=[];for(let i=0;i<60;i++){const a=i/60*TAU;rim.push(V(.65*Math.cos(a),.29*Math.sin(a),.075));}this.tube(group,rim,.024,'#ddbeb0','mitochondria',true);
   for(let j=-4;j<=4;j++){const x=j*.115,h=.23*Math.sqrt(1-(x/.62)**2),pts=[];for(let k=0;k<=16;k++){const f=k/16;pts.push(V(x+.027*Math.sin(f*TAU),-h+f*h*1.75,.07+.065*Math.sin(f*Math.PI)));}this.tube(group,pts,.025,'#a9847d','mitochondria');}
  };
  mito([1.73,.69,.08],-.65,.94);mito([.95,-1.48,.2],.4,1.02);mito([-1.76,1.0,.13],.82,.82);mito([-1.85,-.57,.04],-.55,.62);mito([.65,1.65,-.15],-.3,.65);
  // Golgi stacks have flattened sacs and associated vesicles.
  const golgi=new THREE.Group();golgi.position.set(-1.12,-1.08,.28);golgi.rotation.z=-.18;this.cell.add(golgi);
  for(let j=0;j<6;j++){const pts=[];for(let i=0;i<35;i++){const u=i/34*2-1;pts.push(V(u*(.66-j*.04),j*.12-.26+.13*u*u,.05+Math.cos(u*Math.PI/2)*.035));}const sac=this.tube(golgi,pts,.088,'#bcac91','golgi');sac.scale.z=.58;const edge=pts.map(p=>p.clone().add(V(0,.02,.055)));this.tube(golgi,edge,.025,'#d8c8ab','golgi');}
  for(let i=0;i<13;i++){const side=i%2?1:-1;this.sphere(golgi,[side*(.62+random()*.22),-.3+random()*.8,random()*.2],[.06,.06,.055],'#c5b79b','golgi');}
  for(const p of [[1.65,-.62,.1],[-.85,1.62,-.1],[.22,-1.75,.03],[2.13,-.07,-.17]]){this.sphere(this.cell,p,[.19,.19,.18],'#a8b4a5','lysosome',{roughness:.27,clearcoat:.5});const gran=[];for(let i=0;i<8;i++)gran.push([p[0]+(random()-.5)*.18,p[1]+(random()-.5)*.18,p[2]+.15]);this.instanceDots(this.cell,gran,.021,'#c7cbb9','lysosome');}
  const free=[];for(let i=0;i<65;i++){const a=random()*TAU,r=1.8+random()*.65;free.push([Math.cos(a)*r,Math.sin(a)*r*.78,-.08+random()*.12]);}this.instanceDots(this.cell,free,.029,'#baaf99','ribosome');
  this.addLabel('nucleus','细胞核',[-.2,.34,.83],[0,-26]);this.addLabel('membrane','细胞膜',[2.25,1.12,.24],[24,-7]);this.addLabel('mitochondria','线粒体',[1.76,.65,.36],[32,5]);this.addLabel('golgi','高尔基体',[-1.1,-1.05,.5],[-34,30]);this.addLabel('er','内质网',[-1.1,.86,.27],[-25,-17]);this.addLabel('ribosome','核糖体',[.45,-1.05,.3],[25,25]);this.addLabel('lysosome','溶酶体',[1.65,-.62,.3],[36,10]);
 }
 buildMolecule(topic){
  // Dispose old geometry; shared textures stay alive for the viewer lifetime.
  this.molecule.traverse(o=>{if(o.isMesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});this.molecule.clear();this.pickables=this.pickables.filter(o=>this.isDescendant(o,this.cell));
  const id=['rna','transcription'].includes(topic)?'rna':['protein','translation','signaling'].includes(topic)?'protein':topic==='metabolite'?'metabolite':'dna';this.molecularTopic=id;
  if(id==='dna'||id==='rna'){
   const strandCount=id==='dna'?2:1;const cols=['#a599b7','#b8a78e'];
   for(let s=0;s<strandCount;s++){const pts=[];for(let i=0;i<180;i++){const y=-2.1+i/179*4.2,a=y*3.4+s*Math.PI;pts.push(V(.68*Math.cos(a),y,.68*Math.sin(a)));}this.tube(this.molecule,pts,.105,cols[s],id);
    for(let j=0;j<28;j++){const y=-2+j/27*4,a=y*3.4+s*Math.PI;this.sphere(this.molecule,[.68*Math.cos(a),y,.68*Math.sin(a)],[.13,.13,.13],cols[s],id,{roughness:.3});if(s===0){const end=strandCount===2?V(-.68*Math.cos(a),y,-.68*Math.sin(a)):V(.12*Math.cos(a),y+.07,.12*Math.sin(a));this.tube(this.molecule,[V(.62*Math.cos(a),y,.62*Math.sin(a)),end],.047,j%2?'#9aafbd':'#b8ad9c',id);}}
   }this.molecule.rotation.z=-.48;
  }else if(id==='protein'){
   const pts=[];for(let i=0;i<360;i++){const t=i/359*TAU*3;pts.push(V(1.35*Math.sin(t)+.35*Math.cos(t*5),.9*Math.cos(t*1.33)+.4*Math.sin(t*3),.8*Math.sin(t*1.67)+.3*Math.cos(t*4)));}this.tube(this.molecule,pts,.095,'#96aab6',id);for(let i=0;i<pts.length;i+=4)this.sphere(this.molecule,pts[i].toArray(),[.11,.11,.11],i%8?'#a5b6be':'#879da9',id);this.molecule.rotation.z=.2;
  }else{const pts=[];for(let i=0;i<6;i++){const a=i/6*TAU;pts.push(V(Math.cos(a)*1.1,Math.sin(a)*1.1,.15*Math.sin(a*2)));}pts.forEach((p,i)=>{this.sphere(this.molecule,p.toArray(),[.26,.26,.26],i===5?'#bc9c94':'#a9b8a3',id);this.tube(this.molecule,[p,pts[(i+1)%6]],.09,'#c2c9be',id);const q=p.clone().multiplyScalar(1.5);this.tube(this.molecule,[p,q],.07,'#c2c9be',id);this.sphere(this.molecule,q.toArray(),[.16,.16,.16],'#d4d4c9',id);});this.molecule.rotation.z=.25;}
 }
 isDescendant(o,parent){while(o){if(o===parent)return true;o=o.parent;}return false;}
 setMode(mode,topic){this.mode=mode;this.cell.visible=mode==='cell';this.molecule.visible=mode==='molecule';if(mode==='molecule')this.buildMolecule(topic);this.labels.forEach(l=>l.el.hidden=mode!=='cell'||!this.labelsVisible);this.reset();this.select(topic);}
 select(id){this.selected=id;this.labels.forEach(l=>l.el.classList.toggle('active',l.id===id));for(const mesh of this.pickables){if(mesh.material?.emissive){mesh.material.emissive.set(mesh.userData.topic===id?'#354665':'#000000');mesh.material.emissiveIntensity=mesh.userData.topic===id?.11:0;}}}
 setLabels(value){this.labelsVisible=value;this.updateLabels();}
 updateLabels(){if(this.mode!=='cell')return;const w=this.host.clientWidth,h=this.host.clientHeight;const world=new THREE.Vector3();for(const label of this.labels){world.copy(label.position);this.cell.localToWorld(world);const projected=world.clone().project(this.camera);const front=this.camera.position.clone().sub(this.controls.target).z>0;const x=(projected.x*.5+.5)*w+label.offset[0],y=(-projected.y*.5+.5)*h+label.offset[1];label.el.hidden=!this.labelsVisible||projected.z>1||!front||x<30||x>w-30||y<50||y>h-55;label.el.style.left=x+'px';label.el.style.top=y+'px';}}
 hit(e){const rect=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);this.raycaster.setFromCamera(this.pointer,this.camera);return this.raycaster.intersectObjects(this.pickables.filter(o=>this.isDescendant(o,this.mode==='cell'?this.cell:this.molecule)),false)[0];}
 pick(e){const hit=this.hit(e);if(hit)this.onSelect(hit.object.userData.topic);}
 zoom(factor){const off=this.camera.position.clone().sub(this.controls.target);off.multiplyScalar(factor).clampLength(this.controls.minDistance,this.controls.maxDistance);this.camera.position.copy(this.controls.target).add(off);this.controls.update();}
 reset(){this.controls.reset();this.controls.autoRotate=false;this.camera.position.set(.35,.65,this.mode==='molecule'?9:8.4);this.resize();this.controls.update();}
 resize(){const w=this.host.clientWidth,h=this.host.clientHeight;if(!w||!h)return;this.camera.aspect=w/h;this.camera.fov=w/h<1.1?50:37;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h,false);}
 setActive(active){this.active=active;if(active)this.resize();}
 getState(){return{mode:this.mode,selected:this.selected,camera:this.camera.position.toArray(),meshCount:this.pickables.length,ready:true};}
}
