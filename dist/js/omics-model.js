import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls.js';

export const modelNotes={
 dna:[['序列骨架','沿着 DNA 的序列寻找变异、重复与结构差异。模型仅示意双链，不代表特定基因。'],['互补链','另一条骨架代表与其互补的 DNA 链。图中两种骨架颜色只用于区分两条链。'],['碱基配对','横向连接代表两条链之间的配对关系。图中的球体和连杆不对应完整原子结构。']],
 chromatin:[['组蛋白核心','DNA 与组蛋白组成核小体。不同修饰与染色质状态相关。'],['连接 DNA','核小体之间的 DNA 可及性与调控背景有关。ATAC-seq 捕获的信号与可及性相关。'],['修饰标记','色点表示一个抽象修饰位置。甲基化、组蛋白修饰和开放程度需要不同方法测量。']],
 rna:[['RNA 链','RNA 的序列、数量、剪接和修饰是不同观察层次。'],['局部片段','测序读段通常只覆盖原分子的部分信息；长读段可帮助连接较远片段。'],['功能位置','色点代表可研究的位置。它可以是修饰、结合或翻译相关区域，需用对应实验验证。']],
 protein:[['折叠骨架','氨基酸连接并折叠形成蛋白。这里是程序生成的教学形态。'],['局部肽段','常见质谱流程先分析肽段，再用其序列信息推断蛋白。'],['修饰位点','修饰可以改变蛋白的状态。位点信号与总蛋白丰度要分别理解。']],
 glycan:[['连接主干','糖链有连接方向、分支和不同单糖组成，不是单纯一条线。'],['分支单元','不同颜色仅区分教学单元，不采用真实糖链的完整标准符号。'],['末端结构','末端糖结构可以影响分子识别。总质量相同仍可能有不同结构。']],
 lipid:[['亲水头部','磷脂含亲水部分，帮助形成膜与水环境的界面。'],['疏水链','脂肪酸链的长度和不饱和程度可以不同。'],['分子种差异','模型以磷脂为例；脂质组还包括甘油三酯、甾醇等许多类别。']],
 metabolite:[['小分子单元','球体代表抽象分子或元素，不表示真实原子种类和化学键。'],['转化关联','连线用于表达一个可研究的关联或反应。浓度与通量是不同的量。'],['标记或状态','色点代表可区分的示踪或化学状态；真实同位素需要相应检测方法。']],
 network:[['网络节点','节点可代表蛋白、基因或基因组片段，具体对象由当前研究问题决定。'],['关系连线','连线可能来自接触、共纯化或统计关联，需注明证据类型。'],['候选关系','点击一个节点不等于证明因果。网络帮助整理证据和提出可检验的问题。']],
 community:[['群落成员','不同形态表示不同成员的教学示意，并非真实物种鉴定图。'],['群落差异','群落中既有成员数量差异，也有每个成员的功能差异。'],['遗传信息','核酸可帮助识别成员与功能潜力，但检出不直接证明活性或感染性。']],
 cells:[['单个细胞','单细胞是观察单位，仍需要来自不同生物学样本的重复。'],['细胞内信号','同一种细胞可有不同状态；图中颜色仅用于区分示例。'],['细胞间差异','大量细胞的均值可能掩盖异质性。扰动或免疫研究需要结合具体背景。']],
 tissue:[['组织位置','空间组学保留位置，帮助解释组织区域和细胞邻域。'],['测量单位','一个点位可能混合多个细胞，分辨率与细胞分割影响解释。'],['区域信号','颜色表示教学信号。空间共现提供线索，不能单独证明细胞通讯。']]
};
const palette=[0xa99bb8,0x98afbb,0xb8a790];
export class OmicsModel{
 constructor(host,type,onPick){this.host=host;this.type=type;this.onPick=onPick;this.pickables=[];this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#eff3f7');this.camera=new THREE.PerspectiveCamera(38,1,.1,100);this.camera.position.set(0,1.6,11);this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false});this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));this.renderer.setSize(host.clientWidth,host.clientHeight);host.append(this.renderer.domElement);this.scene.add(new THREE.HemisphereLight(0xffffff,0xa9b6c7,2.6));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(4,6,8);this.scene.add(light);this.group=new THREE.Group();this.scene.add(this.group);this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.enableDamping=true;this.controls.enablePan=false;this.controls.minDistance=5;this.controls.maxDistance=19;this.controls.autoRotateSpeed=.7;this.build();this.abort=new AbortController();const opts={signal:this.abort.signal};let start;
 this.renderer.domElement.addEventListener('pointerdown',e=>start=[e.clientX,e.clientY],opts);this.renderer.domElement.addEventListener('pointerup',e=>{if(!start||Math.hypot(e.clientX-start[0],e.clientY-start[1])>7)return;const rect=host.getBoundingClientRect(),ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),this.camera);const hit=ray.intersectObjects(this.pickables)[0];if(hit)this.select(hit.object.userData.part);},opts);
 host.addEventListener('keydown',e=>{if(['+','=','-'].includes(e.key)){this.zoom(e.key==='-'?1.15:.87);e.preventDefault();}if(e.key.startsWith('Arrow')){const s=new THREE.Spherical().setFromVector3(this.camera.position);s.theta+=e.key==='ArrowLeft'?-.15:e.key==='ArrowRight'?.15:0;s.phi=Math.max(.15,Math.min(Math.PI-.15,s.phi+(e.key==='ArrowUp'?-.15:e.key==='ArrowDown'?.15:0)));this.camera.position.setFromSpherical(s);e.preventDefault();}},opts);
 this.observer=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h);});this.observer.observe(host);this.camera.aspect=host.clientWidth/host.clientHeight;this.camera.updateProjectionMatrix();this.renderer.setAnimationLoop(()=>{if(document.hidden)return;this.controls.update();this.renderer.render(this.scene,this.camera);});this.select(0);
 }
 mesh(geometry,part,pos=[0,0,0],scale=[1,1,1]){const m=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:palette[part],roughness:.46,metalness:.02}));m.position.set(...pos);m.scale.set(...scale);m.userData.part=part;this.group.add(m);this.pickables.push(m);return m;}
 ball(pos,r,part=0,scale=[1,1,1]){return this.mesh(new THREE.SphereGeometry(r,24,16),part,pos,scale);}
 tube(points,r,part){return this.mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),Math.max(24,points.length*5),r,8,false),part);}
 build(){const t=this.type;
 if(t==='dna'){for(let s=0;s<2;s++){let p=[];for(let i=0;i<=60;i++){const a=i*.18+s*Math.PI;p.push([Math.cos(a),i*.085-2.55,Math.sin(a)]);}this.tube(p,.12,s);}for(let i=0;i<20;i++){const a=i*.54,y=i*.255-2.55;this.tube([[Math.cos(a),y,Math.sin(a)],[-Math.cos(a),y,-Math.sin(a)]],.065,2);this.ball([Math.cos(a)*.5,y,Math.sin(a)*.5],.15,2);}}
 else if(t==='chromatin'){for(let j=0;j<5;j++){const x=(j-2)*1.3,y=Math.sin(j)*.5;this.ball([x,y,0],.55,0);let p=[];for(let i=0;i<44;i++){const a=i*.25;p.push([x+Math.cos(a)*.67,y+Math.sin(a)*.67,(i/43-.5)*.8]);}this.tube(p,.055,1);this.ball([x,y+.75,.2],.13,2);}this.tube([[-3,-.6,0],[-1,.7,0],[1,-.8,0],[3,.4,0]],.04,1);}
 else if(t==='rna'||t==='protein'){const p=Array.from({length:90},(_,i)=>t==='rna'?[(i/89-.5)*6,Math.sin(i*.15)*.7,Math.cos(i*.13)*.45]:[Math.sin(i*.13)*1.6,Math.cos(i*.21)*1.4,Math.sin(i*.31)*1.15]);this.tube(p,t==='rna'?.1:.15,0);for(let i=4;i<90;i+=9){this.ball(p[i],.21,1);if(i%3===1)this.ball([p[i][0],p[i][1]+.33,p[i][2]],.16,2);}}
 else if(t==='glycan'){const pts=[[0,-2,0],[0,-1,0],[0,0,0],[-1,1,0],[1,1,0],[-1.6,2,.3],[-.6,2,-.4],[1.7,2,0]];const edges=[[0,1],[1,2],[2,3],[2,4],[3,5],[3,6],[4,7]];edges.forEach(([a,b])=>this.tube([pts[a],pts[b]],.09,0));pts.forEach((p,i)=>this.ball(p,.29,i<3?0:i<5?1:2));}
 else if(t==='lipid'){for(let i=0;i<5;i++){const x=(i-2)*1.1,z=Math.sin(i)*.25;this.ball([x,1.1,z],.34,0);for(let j=0;j<2;j++)this.tube([[x+(j-.5)*.3,.8,z],[x+(j-.5)*.4,-.1,z],[x+(j-.5)*.6,-.65,z+.2],[x+(j-.5)*.5,-1.6,z]],.09,j===0?1:2);}}
 else if(t==='metabolite'||t==='network'){const pts=Array.from({length:9},(_,i)=>[Math.cos(i*2.4)*(1.3+i*.14),Math.sin(i*2.4)*1.7,Math.cos(i*1.3)]);pts.forEach((p,i)=>{this.ball(p,i===0?.46:.3,i%3);if(i)this.tube([pts[Math.floor((i-1)/2)],p],.055,1);});}
 else{const n=t==='tissue'?30:t==='community'?13:12;for(let i=0;i<n;i++){const x=t==='tissue'?(i%6-2.5)*.9:Math.cos(i*2.4)*Math.sqrt(i)*.65,y=t==='tissue'?(Math.floor(i/6)-2)*.85:Math.sin(i*2.4)*Math.sqrt(i)*.65,z=t==='tissue'?Math.sin(i)*.12:Math.sin(i)*.6;this.ball([x,y,z],t==='tissue'?.4:.47,i%3,t==='community'?[1.3,.7,.7]:[1,1,1]);this.ball([x,y,z+.4],.14,(i+1)%3);}}
 }
 select(part){this.selected=part;this.pickables.forEach(m=>m.material.emissive.set(m.userData.part===part?0x17212b:0));this.onPick(part);}
 zoom(f){this.camera.position.multiplyScalar(f).clampLength(5,19);this.controls.update();}
 reset(){this.camera.position.set(0,1.6,11);this.controls.autoRotate=false;this.controls.update();}
 getState(){return{type:this.type,part:this.selected,position:this.camera.position.toArray(),autoRotate:this.controls.autoRotate};}
 projectPart(part){const m=this.pickables.find(m=>m.userData.part===part);if(!m)return null;this.scene.updateMatrixWorld(true);const p=new THREE.Vector3().fromBufferAttribute(m.geometry.attributes.position,0);m.localToWorld(p);p.project(this.camera);return{x:(p.x*.5+.5)*this.host.clientWidth,y:(-.5*p.y+.5)*this.host.clientHeight};}
 destroy(){this.abort.abort();this.observer.disconnect();this.controls.dispose();this.renderer.setAnimationLoop(null);this.group.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();}
}
