import {processLessons,processState,processDiagram} from './process-motion.js';
// Positions, binding and release all share one seekable clock. No independent loops.
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
const mix=(a,b,t)=>a+(b-a)*t;
const S=(title,text,look)=>({title,text,look});
export const molecularLessons={
 ...processLessons,
 transcription:{duration:42000,title:'转录：跟随一条 RNA 的诞生',legend:['紫色双链：DNA','青色链：RNA','金色外形：RNA 聚合酶'],note:'教学短序列，非等比例；聚合酶与辅助因子简化。终止画面只展示共同结果，未展开不同生物的终止机制。',source:'https://www.ncbi.nlm.nih.gov/books/NBK26887/',steps:[
 S('就位：聚合酶靠近 DNA','RNA 聚合酶在启动区域与相关因子协作，建立转录起始复合物。DNA 是模板，游离核糖核苷三磷酸（NTP）是合成 RNA 的原料。','看金色聚合酶沿虚线靠近紫色 DNA；此时尚未产生 RNA。'),
 S('打开：形成局部转录泡','聚合酶附近的一小段 DNA 解开配对，露出模板链。模板链按 3′→5′ 方向被读取；另一条链仍属于 DNA。','看两条 DNA 只在聚合酶附近分开，两端仍然配对。'),
 S('起始：原料接入 RNA 的 3′ 端','互补的 NTP 进入活性中心。模板 T 对应 RNA 的 A，模板 A 对应 U，模板 C 对应 G。新 RNA 从 5′→3′ 方向延长。','跟随青色原料移动到链末端；每接入一个，RNA 才增加一个单位。'),
 S('延长：前方打开，后方复合','聚合酶向前移动，继续在 RNA 的 3′ 端添加核苷酸。新 RNA 逐渐离开 DNA，聚合酶后方的两条 DNA 重新配对。','看 3′ 端始终靠近聚合酶，较早形成的 5′ 端从下方伸出。'),
 S('终止：RNA 与聚合酶离开','到达相应终止条件后，转录结束。RNA 与 DNA 模板分离，聚合酶也会离开，DNA 双链恢复。','看青色 RNA 向下离开，金色聚合酶向上离开；DNA 保留原位。'),
 S('去向：RNA 进入下一段旅程','示例产物为 5′-AUG CCU GAA-3′。若产物是真核前体 mRNA，还要经历加帽、剪接、加尾等加工；其中一些加工可在转录期间发生。','对照 DNA 模板 TAC GGA CTT 与 RNA AUG CCU GAA，注意 RNA 使用 U。') ]},
 translation:{duration:56000,title:'翻译：走进核糖体的分子接力',legend:['紫色带：mRNA','绿色轮廓：tRNA','蓝色外形：核糖体','橙色 RF：释放因子'],note:'教学序列 AUG—GCU—UUU—UAA；图中反密码子从左至右为 3′→5′。省略起始/延长辅助因子与 GTP 水解，位点和形状为示意。tRNA 到来前已装载相应氨基酸。',source:'https://www.ncbi.nlm.nih.gov/books/NBK26829/',steps:[
 S('起始：Met-tRNA 占据 P 位','起始 tRNA 携带甲硫氨酸（Met），在 P 位与 AUG 配对。核糖体两亚基完成装配，建立阅读框。起始 tRNA 直接占据 P 位。','看蓝色亚基合拢；标记 P 的位置已有 tRNA，右边 A 位等待下一位来客。'),
 S('进入：Ala-tRNA 在 A 位配对','携带丙氨酸（Ala）的 tRNA 靠近 A 位。其反密码子与 GCU 密码子配对后，被定位在核糖体内。','跟随绿色 tRNA 从右上方进入；底部三枚碱基对准 GCU，顶部带着 Ala。'),
 S('成键：把 Met 转移到 Ala 上','核糖体催化肽键形成，将 P 位 tRNA 上的 Met 转移到 A 位 tRNA 携带的 Ala 上。两肽链现在连接在 A 位 tRNA 上，P 位 tRNA 已空载。','看橙色 Met 接近绿色 Ala 并连接；不要把肽链转移误认为 tRNA 互换位置。'),
 S('移位：核糖体前进一个密码子','核糖体沿 mRNA 的 5′→3′ 方向前进三个核苷酸。携带二肽的 tRNA 从 A 位进入 P 位，空 tRNA 从 P 位经过 E 位离开。','mRNA 的位置固定，蓝色核糖体向右移动；同一条 tRNA 相对位点的位置因此改变。'),
 S('再进入：Phe-tRNA 识别 UUU','新的 A 位露出 UUU 密码子。携带苯丙氨酸（Phe）的 tRNA 配对进入；P 位继续握着已有的 Met–Ala 二肽。','比较两条 tRNA：P 位顶部有两个氨基酸，A 位刚带来一个 Phe。'),
 S('再成键：整条肽链转移到 Phe','已有的 Met–Ala 肽链整体转移到 A 位的 Phe 上，形成 Met–Ala–Phe。多肽由 N 端向 C 端延长。','看两个相连的小球一起移动到 Phe 一侧，形成三个相连的小球。'),
 S('再移位：让终止密码子进入 A 位','核糖体再次前进一个密码子。携带三肽的 tRNA 进入 P 位，空载 Ala-tRNA 经 E 位离开，UAA 进入 A 位。','看 A 位下方出现 UAA；它是终止信号，不对应一个普通氨基酸。'),
 S('释放：RF 识别 UAA，肽链离开','释放因子（RF）识别 A 位的终止密码子，促使肽链与 tRNA 之间的连接水解。肽链释放后，翻译复合物解离并被回收。','先看橙色 RF 进入，再看完整肽链离开，最后看蓝色亚基分开；不会出现“终止 tRNA”。') ]}
};
export function molecularState(id,p){
 if(processLessons[id])return processState(id,p);
 const n=molecularLessons[id].steps.length,t=clamp(p)*n,phase=Math.min(n-1,Math.floor(t)),f=clamp(t-phase);
 if(id==='transcription'){
  const growth=phase<2?0:phase===2?3*f:phase===3?3+6*f:9;
  const x=phase===0?mix(92,170,ease(f)):170+60*Math.max(0,growth-1);
  return {phase,f,growth,x,opening:phase===0?0:phase===1?ease(f):phase<4?1:phase===4?1-ease(f):0,release:phase<4?0:phase===4?ease(f):1};
 }
 const shift=phase<3?0:phase===3?ease(f):phase<6?1:phase===6?1+ease(f):2;
 return {phase,f,shift,pSite:235+110*shift,release:phase===7?ease((f-.32)/.36):0,disassemble:phase===7?ease((f-.72)/.28):0};
}
const C={dna:'#9976be',rna:'#439fa8',enzyme:'#d8a15d',ribo:'#72a8ca',trna:'#63a987',ink:'#40546b',muted:'#7f91a4',met:'#d6a05b',ala:'#65ac8b',phe:'#6a91ca'};
const tx=(x,y,s,size=15,fill=C.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}">${s}</text>`;
const path=(d,c,w=3,extra='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const dot=(x,y,r,c)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const bead=(x,y,s,c,r=14)=>dot(x,y,r,c)+tx(x,y+5,s,13,'white');
const group=(x,y,b,extra='')=>`<g transform="translate(${x} ${y})" ${extra}>${b}</g>`;
function trna(x,y,anti,opacity=1){return group(x,y,path('M0 -66V-52Q-25 -61 -29 -43Q-32 -25 -13 -29L-14 -10Q0 1 14 -10L13 -29Q32 -25 29 -43Q25 -61 0 -52',C.trna,7)+path('M-14 -10L-14 0L14 0L14 -10',C.trna,4)+anti.split('').map((c,i)=>bead((i-1)*13,1,c,C.trna,8)).join(''),`opacity="${opacity}" data-molecule="tRNA"`);}
function peptide(x,y,n,opacity=1){return group(x,y,Array.from({length:n},(_,i)=>{const dx=(i-n+1)*37;return (i?path(`M${dx-22} 0H${dx-15}`,'#8ca3b2',4):'')+bead(dx,0,['Met','Ala','Phe'][i],[C.met,C.ala,C.phe][i],17);}).join(''),`opacity="${opacity}" data-molecule="peptide"`);}
function transcription(s){
 const {phase,f,growth,x,opening,release}=s;let b='';
 b+=tx(410,32,'DNA 保留原位 · RNA 逐个延长',17)+tx(410,55,'模板读取 3′ → 5′　｜　RNA 合成 5′ → 3′',13,C.muted);
 const template='TACGGACTT',coding='ATGCCTGAA',rna='AUGCCUGAA';
 const yy=(bx,upper)=> (upper?155:207)+(upper?-1:1)*opening*38*Math.exp(-Math.pow((bx-x)/100,2));
 for(let k=0;k<2;k++)b+=path(Array.from({length:65},(_,i)=>{const bx=100+i*10;return `${i?'L':'M'}${bx} ${yy(bx,k===0)}`;}).join(' '),C.dna,4);
 for(let i=0;i<9;i++){const bx=170+i*60,y1=yy(bx,true),y2=yy(bx,false);b+=path(`M${bx} ${y1+14}V${y2-14}`,C.dna,1.5,`opacity="${1-opening*Math.exp(-Math.pow((bx-x)/100,2))}"`)+bead(bx,y1,coding[i],C.dna)+bead(bx,y2,template[i],C.dna);}
 b+=tx(77,160,'5′')+tx(77,212,'3′')+tx(765,160,'3′')+tx(765,212,'5′')+tx(410,91,'上：非模板链　下：模板链',13,C.muted);
 const py=phase===0?mix(92,180,ease(f)):180-release*79,px=x+release*40;
 b+=group(px,py,`<ellipse rx="61" ry="70" fill="${C.enzyme}" fill-opacity=".18" stroke="${C.enzyme}" stroke-width="3"/>`+tx(0,-20,'RNA',13)+tx(0,-2,'聚合酶',14),`data-molecule="polymerase" opacity="${1-release}"`);
 if(phase===0)b+=path('M92 92Q140 90 170 180',C.enzyme,2,'stroke-dasharray="5 7"');
 const count=Math.floor(growth+1e-8),tailY=270+release*67,tipX=x-10-release*60;
 const coords=i=>[tipX-(growth-1-i)*30,tailY+Math.min(20,(growth-1-i)*4)];
 if(count){let d='';for(let i=0;i<count;i++){const [bx,by]=coords(i);d+=`${i?'L':'M'}${bx} ${by} `;}b+=path(d,C.rna,4);for(let i=0;i<count;i++){const [bx,by]=coords(i);b+=bead(bx,by,rna[i],C.rna,12);}const [fx,fy]=coords(0);b+=tx(fx-25,fy+5,'5′',12)+tx(tipX+30,tailY+5,'3′',12);if(release<1)b+=path(`M${tipX} ${tailY-14}Q${x+20} 242 ${x} 221`,C.rna,2,`opacity="${1-release}"`);}
 if((phase===2||phase===3)&&growth<9){const fraction=growth-count,a=ease(fraction),nx=mix(x+50,tipX,a),ny=mix(355,tailY,a);b+=path(`M${x+50} 355Q${x+60} 290 ${tipX} ${tailY}`,C.rna,1.5,'stroke-dasharray="4 6"')+bead(nx,ny,rna[count],C.rna,12)+tx(x+55,388,'NTP 接入 3′ 端',13);}
 b+=tx(410,420,phase<2?'先就位，再局部打开 DNA':phase<4?`已接入 ${count} / 9 个核苷酸 · 青色小球是新生 RNA`:phase===4?'RNA 与 DNA 分离，DNA 重新形成双链':'产物：5′—AUG CCU GAA—3′',15);
 return b;
}
function translation(s){
 const {phase,f,pSite,release,disassemble}=s;let b='';
 b+=tx(410,30,'tRNA 带来氨基酸 · 核糖体组织接力',17)+tx(410,54,'E：离开　P：握住肽链　A：接纳新 tRNA',14,C.muted);
 const assembly=phase===0?1-ease(f):0,open=assembly+disassemble;
 b+=group(pSite,0,`<rect x="-157" y="${164-open*48}" width="314" height="148" rx="66" fill="${C.ribo}" fill-opacity=".13" stroke="${C.ribo}" stroke-width="2.5"/><rect x="-155" y="${342+open*35}" width="310" height="29" rx="14" fill="${C.ribo}" fill-opacity=".25" stroke="${C.ribo}" stroke-width="2"/>`, 'data-molecule="ribosome"');
 [-110,0,110].forEach((dx,i)=>{b+=dot(pSite+dx,188-open*48,15,['#bbc9d3','#8bb6ce','#7bb9a0'][i])+tx(pSite+dx,193-open*48,['E','P','A'][i],14,'white');});
 b+=path('M100 330H705',C.dna,4)+tx(77,335,'5′')+tx(734,335,'3′');
 ['AUG','GCU','UUU','UAA'].forEach((codon,i)=>{const x=235+i*110;b+=`<rect x="${x-38}" y="314" width="76" height="32" rx="10" fill="${i===3?'#c99863':C.dna}"/>`+tx(x,336,codon,18,'white');});
 b+=tx(410,409,'mRNA：5′—AUG—GCU—UUU—UAA—3′',14,C.muted);
 // Each tRNA stays paired to its codon while the ribosome changes position.
 if(phase<=3){const exit=phase===3?ease((f-.55)/.45):0;b+=trna(235-exit*103,300-exit*72,'UAC',1-exit);}
 if(phase>=1&&phase<=6){const enter=phase===1?1-ease(f):0,exit=phase===6?ease((f-.55)/.45):0;b+=trna(345+enter*130-exit*110,300-enter*170-exit*72,'CGA',1-exit);}
 if(phase>=4){const enter=phase===4?1-ease(f):0;b+=trna(455+enter*130+disassemble*50,300-enter*170+disassemble*48,'AAA',1-disassemble*.65);}
 if(phase<2)b+=peptide(235,234,1);
 if(phase===1)b+=bead(345+(1-ease(f))*130,234-(1-ease(f))*170,'Ala',C.ala,17);
 if(phase===2){const a=ease(f);b+=bead(345,234,'Ala',C.ala,17)+bead(mix(235,308,a),234-Math.sin(a*Math.PI)*35,'Met',C.met,17);if(f>.85)b+=path('M325 234H328','#8ca3b2',4);}
 if(phase===3||phase===4)b+=peptide(345,234,2);
 if(phase===4)b+=bead(455+(1-ease(f))*130,234-(1-ease(f))*170,'Phe',C.phe,17);
 if(phase===5){const a=ease(f);b+=bead(455,234,'Phe',C.phe,17)+peptide(mix(345,418,a),234-Math.sin(a*Math.PI)*35,2);if(f>.85)b+=path('M435 234H438','#8ca3b2',4);}
 if(phase>=6)b+=peptide(455-release*80,234-release*115,3);
 if(phase===7){const a=ease(f/.3);b+=group(mix(685,565,a),mix(99,265,a)-disassemble*80,`<path d="M-23 -27Q0 -45 23 -27L17 19Q0 34 -17 19Z" fill="#d7a162"/>`+tx(0,0,'RF',16,'white'),'data-molecule="release-factor"');}
 if(phase===1||phase===4){const x=phase===1?345:455;b+=path(`M${x+130} 130Q${x+160} 240 ${x} 300`,C.trna,1.5,'stroke-dasharray="5 7"');if(f>.8)b+=`<rect x="${x-39}" y="286" width="78" height="62" rx="13" fill="none" stroke="${C.trna}" stroke-width="2"/>`;}
 if(phase===3||phase===6)b+=path(`M${pSite-50} 386H${pSite+50}l-8 -5m8 5l-8 5`,C.ribo,2);
 return b;
}
export function molecularDiagram(id,p){if(processLessons[id])return processDiagram(id,p);const s=molecularState(id,p);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 445" role="img" aria-label="${molecularLessons[id].title}：${molecularLessons[id].steps[s.phase].title}" font-family="system-ui,Microsoft YaHei,sans-serif"><title>${molecularLessons[id].steps[s.phase].title}</title>${id==='transcription'?transcription(s):translation(s)}</svg>`;}
