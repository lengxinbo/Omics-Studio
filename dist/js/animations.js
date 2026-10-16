// Deterministic SVG process diagrams: every visible position is driven by the
// timeline, so pause, scrub, replay and reduced-motion remain predictable.
const step=(title,text)=>({title,text});
export const animations=[
 {id:'transport',title:'跨膜运输：从差异到平衡',focus:{cell:'membrane'},legend:['蓝灰：可通过的小分子','中央：膜与开放通道'],note:'示意易化扩散；以不带电溶质的浓度差为例，省略电位影响。',steps:[step('先观察浓度差','左侧分子较多，右侧较少。所有分子都在随机运动，膜中通道为这类分子提供通过路径。'),step('经通道向两侧运动','分子可双向通过。左侧较多时，向右移动的净数量较多；这不需要逐个消耗 ATP。'),step('两侧数量逐渐接近','差异减小，净流量也趋于减小。通道帮助通过膜，但并不替分子选择“正确方向”。'),step('动态平衡','相同条件下，两方向的平均流量相等。分子仍在运动，变化的是净流量，而不是是否运动。')]},
 {id:'secretion',title:'一份分泌蛋白的旅程',focus:{cell:'golgi'},legend:['紫灰：分泌蛋白货物','圆形边界：运输囊泡'],note:'典型分泌路线示意；定位信号、折叠与质量控制等细节简化。',steps:[step('内质网：合成与加工','相关核糖体合成多肽，分泌蛋白进入内质网相关加工路线。并非所有蛋白都走这条路线。'),step('装入囊泡，向高尔基体运输','货物被装入运输结构，随着囊泡到达高尔基体。看清货物与包围它的囊泡膜不是同一对象。'),step('高尔基体：进一步加工与分拣','货物继续接受加工，再进入面向相应目的地的囊泡。这里示意运往细胞外的一条路径。'),step('胞吐：释放到细胞外','囊泡膜与细胞膜融合，内容物向细胞外释放。蛋白质并不是直接穿过脂质双层挤出去。')]},
 {id:'atp',title:'质子回流怎样帮助合成 ATP',focus:{cell:'mitochondria',molecules:'metabolite'},legend:['小圆点：H⁺','蓝灰通道：ATP 合酶'],note:'线粒体内膜局部示意；电子传递链及分子数量均简化。',steps:[step('建立跨内膜的质子梯度','电子传递链相关过程在内膜两侧建立电化学梯度。图上方代表膜间隙，下方代表基质。'),step('质子经 ATP 合酶回流','质子从膜间隙一侧经 ATP 合酶回到基质。观察流动路径与膜的位置。'),step('回流与 ATP 合成相耦联','ATP 合酶利用这一过程，将 ADP 与无机磷酸合成为 ATP。质子没有变成整个 ATP 分子。'),step('ATP 参与后续细胞工作','生成的 ATP 可用于细胞内许多能量耦联反应。内膜与梯度需要持续维持，过程才能继续。')]},
 {id:'replication',title:'DNA 复制：一条旧链，一条新链',focus:{molecules:'dna',expression:'replication'},legend:['紫灰：旧模板链','蓝灰：新合成链'],note:'半保留复制示意；省略复制叉、引物与冈崎片段。短序列仅用于教学。',steps:[step('双链 DNA，互补且反向平行','两条旧链配对存在。图中上链为 3′→5′，下链为 5′→3′。先观察对应位置的 A—T 和 C—G。'),step('分开两条旧链，分别作模板','每条旧链都可指导一条新链的合成。拆开的是配对关系，旧链并没有被当作新链的原料消耗。'),step('按互补规则延长新链','蓝灰色表示新链，均以 5′→3′ 方向合成。因此在这张图中，两条新链的延长方向相反。'),step('得到两个子代双链','每个子代 DNA 各含一条旧链、一条新链。这就是“半保留”的含义，而不是一个子代全旧、另一个全新。')]},
 {id:'transcription',title:'转录：让 DNA 信息成为 RNA',focus:{cell:'nucleus',molecules:'rna',expression:'transcription'},legend:['紫灰：模板 DNA','蓝灰：新生 RNA','椭圆：RNA 聚合酶'],note:'方向与互补配对示意；省略另一条 DNA 链及转录因子。',steps:[step('识别模板与方向','模板 DNA 以 3′-TAC GGA CTT-5′ 表示。RNA 聚合酶沿模板读取，合成方向与模板读取方向相反。'),step('RNA 聚合酶开始延长 RNA','新 RNA 从 5′ 端向 3′ 端延长。模板中的 T 对应 RNA 的 A，而模板中的 A 对应 RNA 的 U。'),step('新生 RNA 逐步增长','合成结果为 5′-AUG CCU GAA-3′。DNA 模板仍然保留；RNA 是用核糖核苷酸合成的新分子。'),step('释放 RNA，进入后续过程','转录得到 RNA；若为真核前体 mRNA，通常还要加工。转录本身不会直接产生多肽。')]},
 {id:'splicing',title:'剪接：整理前体 mRNA',focus:{molecules:'rna',expression:'rna-processing'},legend:['蓝灰：外显子','浅褐：内含子'],note:'展示一次典型剪接；加帽、加尾、可变剪接与剪接体细节未展开。',steps:[step('前体 mRNA 含不同片段','图中三个蓝灰片段示意外显子，两个浅褐片段示意内含子。此时正在观察 RNA，而不是 DNA。'),step('识别需要移除的内含子','剪接相关分子识别位点，组织切除与连接。图中将这些步骤放慢，突出片段关系。'),step('移除内含子，连接外显子','浅褐片段离开原来的排列，蓝灰片段连接起来。对应 DNA 的序列不会因此从染色体上被删除。'),step('形成连接后的 RNA','成熟 RNA 保留连接后的外显子。外显子也可包含非翻译区域，不等于所有片段都一定编码蛋白质。')]},
 {id:'translation',title:'翻译：逐个密码子合成多肽',focus:{cell:'ribosome',molecules:'protein',expression:'translation'},legend:['三字母组：mRNA 密码子','圆点链：氨基酸','大轮廓：核糖体'],note:'教学序列 AUG—GCU—UUU—UAA；省略完整核糖体循环与能量消耗细节。',steps:[step('起始：在 AUG 建立阅读框','AUG 编码甲硫氨酸（Met）。核糖体及相关因子在正确位置组织翻译，接下来按三个碱基一组读取。'),step('延长：GCU 对应丙氨酸','匹配的 tRNA 带来丙氨酸（Ala）。它加入多肽链，核糖体继续沿 mRNA 移动。'),step('继续延长：UUU 对应苯丙氨酸','相应 tRNA 带来苯丙氨酸（Phe）。图中的链现在含三个氨基酸，顺序由 mRNA 信息决定。'),step('UAA：终止并释放','释放因子参与终止，释放多肽。UAA 不编码普通氨基酸，因此链不会再增加一个“终止氨基酸”。')]},
 {id:'enzyme',title:'酶催化：结合、转化、释放',focus:{molecules:'enzyme'},legend:['大形状：酶','双圆点：底物','分开的圆点：产物'],note:'以一个底物分解为两个产物的抽象反应为例，不代表特定酶结构。',steps:[step('底物靠近活性位点','底物与酶接近，并通过适合的分子相互作用结合。不是所有分子都能以同样方式被这个酶催化。'),step('形成酶—底物复合物','底物被定位，相关相互作用帮助反应跨越能垒。真实分子可能同时发生构象变化。'),step('发生转化，形成产物','这里示意底物分解为两个产物。酶降低活化能，加快反应，并不任意改写反应平衡。'),step('产物释放，酶可继续使用','产物离开，酶通常可以参与下一轮催化。它没有在本次反应中被当成产物全部消耗。')]},
 {id:'signaling',title:'信号：从识别到细胞响应',focus:{expression:'signaling'},legend:['紫灰圆点：配体','蓝灰轮廓：受体与传递分子'],note:'细胞表面受体通路示意；不同通路的分子与调控方式不同。',steps:[step('信号分子接近受体','细胞外配体接近合适的受体。能否响应，首先取决于是否有能识别该信号的系统。'),step('受体识别并改变状态','配体结合受体，引起构象或相关分子状态变化。配体本身不一定进入细胞。'),step('细胞内分子接力','受体状态影响下游分子，信号在细胞内传递。图中连接线表示过程关系，不是实体管道。'),step('产生响应，并需要调控终止','已有蛋白活性、膜运输或基因表达等可能变化。响应依赖具体细胞背景，之后还需要反馈与终止。')]}
];
export const animationById=Object.fromEntries(animations.map(a=>[a.id,a]));
const clamp=(v)=>Math.max(0,Math.min(1,v));
const ease=(v)=>{v=clamp(v);return v*v*(3-2*v);};
const lerp=(a,b,t)=>a+(b-a)*t;
const color={old:'#a597b1',fresh:'#8fa7bb',rna:'#97afbc',soft:'#dbe3eb',text:'#566a83',light:'#f8fafc',cargo:'#b09ba9',membrane:'#b4bdb4'};
const text=(x,y,str,size=15,fill=color.text,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}" font-family="system-ui,Microsoft YaHei,sans-serif">${str}</text>`;
const circle=(x,y,r,fill,stroke='none')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const rect=(x,y,w,h,fill,rx=10,stroke='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const line=(x,y,x2,y2,stroke=color.soft,width=3)=>`<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round"/>`;
const bases=(seq,y,fill,dir,count=seq.length,x=125,dx=48)=>seq.slice(0,count).split('').map((b,i)=>rect(x+i*dx-16,y-17,32,34,fill,7)+text(x+i*dx,y+5,b,17,'#fff')).join('')+text(x-42,y+5,dir[0],13)+text(x+(seq.length-1)*dx+42,y+5,dir[1],13);
const envelope=(body,title)=>`<svg viewBox="0 0 700 330" role="img" aria-label="${title}" xmlns="http://www.w3.org/2000/svg"><title>${title}</title>${body}</svg>`;

export function diagram(id,p){
 const phase=Math.min(3,Math.floor(p*4)),f=clamp(p*4-phase);let b='';
 if(id==='transport'){
  b+=text(165,32,'细胞外')+text(535,32,'细胞内')+rect(331,52,38,225,'#d3dcd5',12)+rect(320,135,60,60,'#95aab6',16)+rect(320,153,60,23,'#f7fafb',7);
  const moves=6*ease(Math.min(1,p/.75));for(let i=0;i<16;i++){const initial=i<14?105+(i%4)*50:495+(i%2)*50,y=85+(i%5)*37;let x=initial,py=y;if(i>=8&&i<14){const a=clamp(moves-(i-8));const dest=465+((i-8)%3)*51,dy=85+((i-8)%5)*37;if(a<.3){x=lerp(initial,300,a/.3);py=lerp(y,165,a/.3);}else if(a<.7){x=lerp(300,400,(a-.3)/.4);py=165;}else{x=lerp(400,dest,(a-.7)/.3);py=lerp(165,dy,(a-.7)/.3);}}if(phase===3&&(i===0||i===14)){const t=ease(f),end=i===0?495:105;x=lerp(initial,end,t);py=165+(i===0?-6:6);}b+=circle(x+Math.sin(p*31+i)*3,py+Math.cos(p*29+i)*3,9,color.fresh);}
  const moved=Math.floor(moves);b+=text(165,303,`约 ${14-moved} 个`)+text(535,303,`约 ${2+moved} 个`)+text(350,226,'开放通道',13)+text(350,284,phase===3?'双向运动，净流量趋近于零':'净移动趋势：较多一侧 → 较少一侧',13);
 }else if(id==='secretion'){
  b+=rect(560,45,16,240,'#b6c1b6',6)+text(626,35,'细胞外')+text(483,35,'细胞内');
  for(let i=0;i<5;i++)b+=`<path d="M75 ${90+i*28}q55 -20 100 0" stroke="#a2b0c2" stroke-width="14" fill="none" stroke-linecap="round"/>`;
  for(let i=0;i<5;i++)b+=`<path d="M300 ${95+i*24}q45 22 85 0" stroke="#bdae97" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  b+=text(125,278,'内质网')+text(343,278,'高尔基体')+text(567,307,'细胞膜',13);
  const x=phase===0?lerp(103,169,ease(f)):phase===1?lerp(190,332,ease(f)):phase===2?lerp(350,526,ease(f)):lerp(533,645,ease(f));
  if(phase>0&&phase<3)b+=circle(x,173,26,'#ffffff88','#a7b9c5');
  if(phase===3&&f<.58)b+=`<path d="M560 140Q${lerp(490,560,ease(f/.58))} 173 560 206" fill="none" stroke="#a7b9c5" stroke-width="4"/>`;
  b+=circle(x-7,167,7,color.cargo)+circle(x+6,173,7,color.cargo)+circle(x-4,181,7,color.cargo);
  b+=text(350,320,phase===3?'囊泡膜融合，货物释放':'同一份蛋白货物在不同工作区之间运输',12);
 }else if(id==='atp'){
  b+=text(130,37,'膜间隙：较多 H⁺')+text(140,303,'线粒体基质')+rect(55,145,590,28,'#c7cfc4',8)+rect(420,119,58,90,'#91a5b5',22)+circle(449,229,39,'#a7b7c5')+text(449,234,'ATP 合酶',12,'#fff');
  for(let i=0;i<18;i++)b+=circle(75+(i%9)*66,68+Math.floor(i/9)*43,6,'#b3a7bd');
  for(let i=0;i<4;i++)b+=circle(90+i*64,245,6,'#b3a7bd');
  const travel=clamp((p-.2)/.5);b+=circle(449,lerp(95,276,ease(travel)),8,color.old)+text(484,106,'H⁺',12);
  b+=text(585,235,phase>=2?'ADP + Pi → ATP':'ADP + Pi',13);if(phase>=2)b+=circle(lerp(495,602,ease((p-.5)*2)),278,18,'#b4bd9f')+text(lerp(495,602,ease((p-.5)*2)),283,'ATP',11,'#fff');
 }else if(id==='replication'){
  const separate=ease((p-.18)/.32),topY=lerp(137,80,separate),bottomY=lerp(185,251,separate),seq='TACGGTACGT',comp='ATGCCATGCA',grown=Math.round(clamp((p-.45)/.45)*10);
  b+=text(350,26,'两条旧链分别作为模板',15)+bases(seq,topY,color.old,['3′','5′'])+bases(comp,bottomY,color.old,['5′','3′']);
  if(separate<.8)for(let i=0;i<10;i++)b+=line(125+i*48,topY+18,125+i*48,bottomY-18,'#bdc4d1',1);
  if(p>.42){b+=bases(comp,topY+45,color.fresh,['5′','3′'],grown);for(let i=10-grown;i<10;i++)b+=rect(125+i*48-16,bottomY-62,32,34,color.fresh,7)+text(125+i*48,bottomY-40,seq[i],17,'#fff');b+=text(83,bottomY-40,'3′',13)+text(599,bottomY-40,'5′',13);}
  b+=text(350,317,phase===3?'子代 1：旧 + 新　　子代 2：新 + 旧':'新链始终以 5′ → 3′ 方向延长',13);
 }else if(id==='transcription'){
  const seq='TACGGACTT',rna='AUGCCUGAA',grown=Math.round(clamp((p-.18)/.64)*9),x=125+Math.min(8,grown)*48,release=ease((p-.8)/.2);
  b+=text(350,33,'模板 DNA → 新生 RNA')+bases(seq,110,color.old,['3′','5′'])+text(60,115,'DNA',12,'#7f8da2');
  b+=bases(rna,207+release*40,color.rna,['5′','3′'],grown)+text(60,212+release*40,'RNA',12,'#7f8da2');
  if(p<.92)b+=`<ellipse cx="${x}" cy="153" rx="35" ry="62" fill="#d2c5b044" stroke="#b6a88f" stroke-width="3"/>`+text(x,48,'RNA 聚合酶',12);
  b+=text(350,305,phase===3?'DNA 保留；RNA 是新合成的分子':'注意：RNA 使用 U，不使用 T',13);
 }else if(id==='splicing'){
  const separation=ease((p-.3)/.35),join=ease((p-.52)/.38);const exons=[{x:85,to:183,name:'外显子 1'},{x:295,to:295,name:'外显子 2'},{x:505,to:407,name:'外显子 3'}];
  b+=text(350,34,'前体 mRNA → 连接后的 RNA')+line(75,160,625,160,'#c4ceda',3);
  for(const e of exons){const x=lerp(e.x,e.to,join);b+=rect(x,133,110,54,'#9aaec0',9)+text(x+55,165,e.name,13,'#fff');}
  for(let i=0;i<2;i++){const x=200+i*210,y=133-separation*66;b+=`<g opacity="${1-separation*.74}">${rect(x,y,90,54,'#c4b39c',9)+text(x+45,y+32,`内含子 ${i+1}`,13,'#fff')}</g>`;}
  b+=text(350,260,phase>=2?'移除内含子，连接外显子':'图中处理的是 RNA，DNA 不被剪掉',14)+text(350,300,'片段长度与真实序列无关，仅展示连接关系。',12,'#93a1b3');
 }else if(id==='translation'){
  const codons=['AUG','GCU','UUU','UAA'],names=['Met','Ala','Phe'],positions=[140,280,420,560];
  b+=text(350,28,'mRNA → 多肽链')+line(75,210,625,210,'#9aaebf',4)+text(60,216,'5′',12)+text(648,216,'3′',12);
  const rx=phase<3?lerp(positions[phase],positions[Math.min(3,phase+1)],ease(Math.max(0,f-.65)/.35)):560;
  b+=`<ellipse cx="${rx}" cy="185" rx="67" ry="74" fill="#a6b7c62b" stroke="#a4b5c5" stroke-width="3"/>`;
  codons.forEach((c,i)=>{b+=rect(positions[i]-43,190,86,42,i===3?'#c2b29b':'#a69bb5',8)+text(positions[i],217,c,18,'#fff');});
  const count=Math.min(3,phase+1),release=phase===3?ease(f):0;for(let i=0;i<count;i++){const x=rx-45+i*35-release*170,y=99-release*35;if(i)b+=line(x-20,y,x-15,y,'#a89d90',4);b+=circle(x,y,15,['#b8a793','#a0b6a8','#9ba9c0'][i])+text(x,y+4,names[i],9,'#fff');}
  if(phase<3){const tx=positions[phase]+30*Math.sin(f*Math.PI);b+=line(tx,133,tx,164,'#a3afa6',4)+text(tx+25,154,'tRNA',11);}else b+=text(560,137,'释放因子',12);
  b+=text(350,297,phase===3?'UAA 是终止信号：不再加入新氨基酸':'每三个碱基构成一个密码子',13);
 }else if(id==='enzyme'){
  const x=phase===0?lerp(120,310,ease(f)):phase===1?310:phase===2?lerp(310,345,ease(f)):lerp(345,565,ease(f));
  b+=text(350,30,'一次催化循环')+`<path d="M300 240C230 240 205 115 287 94L303 142Q326 164 349 142L368 94C448 105 440 240 370 248Z" fill="#a7b7c5" stroke="#8fa2b5" stroke-width="3"/>`+text(333,214,'酶',20,'#fff');
  const split=phase>=2?ease((p-.5)*2)*24:0,y=phase===3?135:phase===0?lerp(150,129,ease(f)):129;
  if(phase<2)b+=line(x,y,x+27,y,'#c2aa9d',5);b+=circle(x-split,y,14,'#b5a0b5')+circle(x+27+split,y,14,'#c1b098');
  b+=text(phase<2?145:575,90,phase<2?'底物':'产物',15)+text(350,294,phase===3?'产物离开，酶保留，可进入下一轮':'活性位点帮助定位底物与降低反应能垒',13);
 }else{
  b+=text(110,38,'细胞外')+text(550,38,'细胞内')+rect(240,62,24,227,'#bec9be',7)+`<path d="M223 135q-30 28 0 55m0-27h64" fill="none" stroke="#8fa6b7" stroke-width="13" stroke-linecap="round"/>`;
  const x=phase===0?lerp(90,204,ease(f)):204;b+=circle(x,163,14,color.old)+text(112,126,'配体',13)+text(252,251,'受体',13);
  const centers=[[345,163],[455,163],[573,163]];centers.forEach(([cx,cy],i)=>{if(i===0)b+=line(290,cy,cx-23,cy,'#c4d1dc',3);else b+=line(centers[i-1][0]+23,cy,cx-23,cy,'#c4d1dc',3);const activated=phase>i; b+=circle(cx,cy,23,activated?'#94aabc':'#dbe3ea')+text(cx,cy+5,i===2?'响应':String(i+1),14,activated?'#fff':'#8c9bab');});
  if(phase>=1&&phase<3)b+=circle(lerp(290,573,clamp((p-.25)/.5)),163,5,'#b89bad');b+=text(440,285,phase===3?'响应可包括已有蛋白活性或基因表达变化':'信号传递关系，不是实体管道',12);
 }
 return envelope(b,animationById[id].title);
}

export class AnimationPlayer{
 constructor(root,{courseId,preferred,onSelect}){
  this.root=root;this.list=animations.filter(a=>a.focus[courseId]);this.courseId=courseId;this.onSelect=onSelect;this.current=this.list.find(a=>a.id===preferred)||this.list[0];this.progress=0;this.playing=false;this.speed=1;this.frame=null;this.last=0;this.destroyed=false;this.activeStep=-1;
  root.innerHTML=`<div class="animation-player"><div class="animation-header"><label for="animation-select">过程动画</label><select id="animation-select">${this.list.map(a=>`<option value="${a.id}" ${a===this.current?'selected':''}>${a.title}</option>`).join('')}</select></div><div class="animation-legend"></div><div class="process-canvas"></div><div class="animation-caption" aria-live="polite"><span class="animation-step"></span><h3></h3><p></p></div><div class="animation-timeline"><label for="animation-seek">动画进度 <output>0%</output></label><input id="animation-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="动画时间轴"></div><div class="animation-controls"><button data-anim="prev" aria-label="上一步">← 上一步</button><button class="play-animation" data-anim="play">播放动画</button><button data-anim="next" aria-label="下一步">下一步 →</button><button data-anim="reset">重播</button><label>速度 <select id="animation-speed" aria-label="动画速度"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option></select></label></div><p class="animation-note"></p></div>`;
  this.abort=new AbortController();const opts={signal:this.abort.signal};
  root.querySelector('#animation-select').addEventListener('change',e=>{this.pause();this.current=animationById[e.target.value];this.progress=0;this.activeStep=-1;this.draw();this.onSelect?.(this.current.focus[this.courseId],this.current.id);},opts);
  root.querySelector('#animation-seek').addEventListener('input',e=>{this.pause();this.progress=Number(e.target.value)/1000;this.draw();},opts);
  root.querySelector('#animation-speed').addEventListener('change',e=>{this.speed=Number(e.target.value);},opts);
  root.addEventListener('click',e=>{const b=e.target.closest('[data-anim]');if(!b)return;const action=b.dataset.anim;if(action==='play'){this.playing?this.pause():this.play();}else{this.pause();if(action==='reset')this.progress=0;else{const i=Math.min(3,Math.floor(this.progress*4));this.progress=Math.max(0,Math.min(3,i+(action==='next'?1:-1)))/4+.001;}this.draw();}},opts);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)this.pause();},opts);
  this.draw();
 }
 draw(){if(this.destroyed)return;const a=this.current,index=Math.min(3,Math.floor(this.progress*4)),s=a.steps[index];this.root.querySelector('.process-canvas').innerHTML=diagram(a.id,this.progress);this.root.querySelector('#animation-seek').value=Math.round(this.progress*1000);this.root.querySelector('output').textContent=Math.round(this.progress*100)+'%';if(index!==this.activeStep){this.root.querySelector('.animation-step').textContent=`步骤 ${index+1} / 4`;this.root.querySelector('.animation-caption h3').textContent=s.title;this.root.querySelector('.animation-caption p').textContent=s.text;this.activeStep=index;}this.root.querySelector('.animation-legend').textContent=a.legend.join('  ·  ');this.root.querySelector('.animation-note').textContent=a.note;this.root.querySelector('[data-anim="prev"]').disabled=this.progress<.25;this.root.querySelector('[data-anim="next"]').disabled=this.progress>=.75;this.updateButton();}
 updateButton(){const b=this.root.querySelector('[data-anim="play"]');if(b){b.textContent=this.playing?'暂停':'播放动画';b.setAttribute('aria-pressed',String(this.playing));}}
 play(){if(this.progress>=1)this.progress=0;this.playing=true;this.last=performance.now();this.updateButton();this.frame=requestAnimationFrame(t=>this.tick(t));}
 tick(t){if(!this.playing||this.destroyed)return;const dt=Math.min(100,t-this.last);if(dt>=30){this.progress=Math.min(1,this.progress+dt*this.speed/20000);this.last=t;this.draw();}if(this.progress>=1){this.pause();return;}this.frame=requestAnimationFrame(t=>this.tick(t));}
 pause(){this.playing=false;cancelAnimationFrame(this.frame);this.frame=null;this.updateButton();}
 destroy(){this.pause();this.abort.abort();this.destroyed=true;}
 getState(){return{id:this.current.id,progress:this.progress,playing:this.playing,speed:this.speed};}
}
