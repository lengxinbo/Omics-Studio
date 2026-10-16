// One continuous timeline drives every molecule, bond and teaching stage.
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
const mix=(a,b,t)=>a+(b-a)*t;
const S=(title,text,look)=>({title,text,look});
export const processLessons={
 replication:{duration:56000,title:'DNA 复制：复制叉上的分工',legend:['紫：旧 DNA','青：新 DNA','橙：RNA 引物','蓝：DNA 聚合酶','金环：解旋酶'],source:'https://www.ncbi.nlm.nih.gov/books/NBK26850/',sourceLabel:'Molecular Biology of the Cell · DNA Replication Mechanisms',note:'一个向右移动的复制叉局部；为看清先后关系，将同步发生的工作分步展示。省略复制起点、拓扑异构酶、滑动夹、校对及具体生物的酶亚型；窗口外 DNA 未展开。',steps:[
 S('就位：解旋酶靠近双链','两条旧 DNA 链反向平行。复制装置在复制起点建立后，解旋酶（helicase）在复制叉处参与解开双链；这里从一个复制叉的局部开始观察。','先认方向：上方旧链从左到右是 3′→5′，下方相反。跟随金色环靠近 DNA。'),
 S('解链：复制叉向前打开','解旋酶利用能量推动双链分离，单链结合蛋白帮助稳定暴露的模板。解开的是两条链之间的配对，旧链的骨架仍连续。','看金环后方分出上下两条紫色模板；前方仍是双链，灰色小蛋白贴住单链。'),
 S('引发：先做一小段 RNA 引物','引物酶（primase）合成 RNA 引物，提供可延伸的 3′-OH。DNA 聚合酶不能从零开始，必须接在已有的 3′ 端继续加脱氧核苷酸。','看橙色短链先出现，蓝色聚合酶随后靠近末端；上方引物向右，下方引物向左。'),
 S('延长：两条新链都按 5′→3′ 合成','上方前导链随复制叉连续延长；下方后随链的一个冈崎片段从引物向左延长。左右移动方向不同，化学合成方向都是 5′→3′。','看两个蓝色聚合酶沿相反方向移动，绿色新链从橙色引物的 3′ 端长出。'),
 S('再引发：后随链分段追上复制叉','复制叉继续前进，暴露更多模板。后随链需在靠近复制叉处再做引物，再向远离复制叉的方向延长，形成下一个冈崎片段。','先看右侧模板打开，再看第二段橙色引物出现，最后看它向左长成第二个片段。'),
 S('修补：去引物、补 DNA、封切口','RNA 引物被移除，缺口由 DNA 合成补齐。DNA 连接酶（ligase）最后封闭相邻 DNA 之间的骨架切口，使片段成为连续的链。','先看橙色引物离开、青色 DNA 补入，再看连接酶靠近两片段接缝；连接酶不负责填入缺失的核苷酸。'),
 S('结果：每一份都是旧链加新链','已复制区域形成两份双链 DNA，每份保留一条旧链并配上一条新链，这称为半保留复制。复制叉还可继续处理图外区域。','比较上下两份双链：都是紫色旧链 + 青色新链；没有一份全部由新链组成。') ]},
 splicing:{duration:48000,title:'RNA 剪接：从识别位点到释放套索',legend:['蓝块：外显子','橙线：内含子','A：分支点腺苷','U 小颗粒：snRNP'],source:'https://www.ncbi.nlm.nih.gov/books/NBK9864/',sourceLabel:'The Cell · RNA Processing and Turnover',note:'典型 U2 型剪接体移除一个内含子的示意；形状、长度和 snRNP 亚基简化。两次化学反应为转酯反应，组装和重排还需要 ATP；未展开加帽、加尾与可变剪接。',steps:[
 S('识别：先找到剪接的三个位置','前体 mRNA 含外显子和内含子。U1 snRNP 参与识别 5′ 剪接位点，U2 snRNP 与分支点区域配对，使分支点腺苷 A 准备参与反应；3′ 剪接位点也需被准确识别。','跟随 U1 和 U2 颗粒靠近 RNA，找到 5′ 位点、分支点 A 和 3′ 位点三个标记。'),
 S('组装：更多 snRNP 加入剪接体','U4/U6 与 U5 等组分加入，形成更大的剪接复合物。snRNP 是小核 RNA 与蛋白质的组合；剪接体通过配对与构象变化组织反应。','看新的颗粒沿虚线靠近，两侧外显子仍通过橙色内含子连接；此时还没有切除内含子。'),
 S('激活：重排，让反应位置靠近','U1 和 U4 等组分在激活过程中离开，U2/U6 等形成催化核心，U5 帮助定位外显子。RNA 弯曲，使参与反应的位置更接近。','看 U1、U4 向外移动，橙色 RNA 弯成弧线；这只是重排，还不是已经释放的套索。'),
 S('第一反应：切开 5′ 位点，形成套索','分支点 A 的 2′-OH 进攻 5′ 剪接位点。内含子的 5′ 端接到 A 上形成特殊的 2′–5′ 键，上游外显子得到游离的 3′-OH。此时内含子仍连着下游外显子。','看左侧蓝块与橙线分开，橙线首端移到 A 处形成环；右侧连接仍保留。'),
 S('第二反应：外显子连接，内含子脱离','上游外显子的 3′-OH 进攻 3′ 剪接位点。两个外显子形成连续的 RNA，内含子以套索形式被切除；画面把位置移动放慢以便观察。','先确认右侧橙蓝连接断开，再看两个蓝块靠近并连接；被连接的是 RNA 外显子。'),
 S('释放与回收：RNA 与剪接体分离','连接后的 RNA 离开剪接体，剪接组分被回收。内含子套索通常随后去分支并降解。染色体上的 DNA 不会因这次 RNA 剪接被删除。','看连接后的蓝色 RNA 向下离开，橙色套索向上离开，snRNP 分散；这三类对象各有去向。') ]},
 signaling:{duration:56000,title:'细胞信号：跟随 GPCR–Gs–cAMP 接力',legend:['紫：胞外配体','蓝：GPCR / AC','绿：Gs 的 α 亚基','金点：cAMP','P：磷酸基'],source:'https://www.ncbi.nlm.nih.gov/books/NBK9870/',sourceLabel:'The Cell · Pathways of Intracellular Signal Transduction',note:'以刺激型 GPCR–Gs–腺苷酸环化酶（AC）–cAMP–PKA 为例，不代表所有受体通路。PKA 用一组调节/催化单元示意，真实复合物计量、受体脱敏等未展开。',steps:[
 S('接收：配体在细胞外结合 GPCR','配体（ligand）接近膜上的 G 蛋白偶联受体（GPCR），结合后稳定受体的活化构象。配体留在细胞外，受体的胞内部分传递状态变化。','看紫色配体落入受体外侧位置；膜保持完整，配体没有穿过膜进入细胞。'),
 S('换开关：Gα 释放 GDP，结合 GTP','活化受体促进 Gs 的 α 亚基释放 GDP，然后结合游离 GTP。这里发生的是核苷酸交换，不能理解为 GDP 在原位被加一个磷酸变成 GTP。','先跟随 GDP 向外离开，再看另一枚 GTP 靠近 Gα；βγ 仍在旁边。'),
 S('传递：Gα–GTP 与 AC 结合','Gα–GTP 改变与 βγ 的相互作用，在这个示意中分离并移动到膜上的腺苷酸环化酶（AC），结合后促进 AC 活性。','看绿色 Gα 带着 GTP 沿膜内侧移动；灰色 βγ 留下，蓝色 AC 被结合后激活。'),
 S('放大：AC 将 ATP 转为 cAMP','活化 AC 可催化多个 ATP 形成 cAMP。cAMP 是胞内第二信使，可扩散到下游靶点；它不是从细胞外穿膜而来的配体。','看 ATP 接近 AC，再看多个金色 cAMP 从 AC 附近产生并向胞内分散。数量仅用于示意放大。'),
 S('解锁：cAMP 结合 PKA 调节部分','cAMP 结合蛋白激酶 A（PKA）的调节亚基，使催化亚基获得活性并释放。调节亚基与催化亚基是不同对象。','看金色 cAMP 靠近标记 R 的调节部分，标记 C 的催化部分随后离开并接近靶蛋白。'),
 S('响应：PKA 磷酸化靶蛋白','活化 PKA 将 ATP 的磷酸基转移到靶蛋白，改变靶蛋白的活性或相互作用。本例展示已有蛋白的状态改变，不把所有响应都画成新基因表达。','看 P 标记从 ATP 一侧移到靶蛋白；蛋白获得 P 后改变颜色，PKA 本身仍可继续催化。'),
 S('关停：多个开关逐步复位','Gα 将 GTP 水解为 GDP，失去对 AC 的持续刺激并与 βγ 重组。PDE 将 cAMP 降解为 AMP；磷酸酶移除靶蛋白的磷酸基。这里同时示意配体离开与系统复位。','看 Gα 回到 βγ、金色 cAMP 变为 AMP、靶蛋白的 P 离开。信号关闭包含多项反应，不是整幅画突然熄灭。') ]}
};
const after=(t,start,length=1)=>ease((t-start)/length);
export function processState(id,p){
 const n=processLessons[id].steps.length,t=clamp(p)*n,phase=Math.min(n-1,Math.floor(t)),f=clamp(t-phase);
 if(id==='replication')return {phase,f,bind:after(t,0),open:after(t,1),fork:300+130*after(t,1)+150*after(t,3)+140*after(t,4,.35),primer:after(t,2,.5),leading:170+310*after(t,3)+140*after(t,4),lag1:310-170*after(t,3),primer2:after(t,4.35,.25),lag2:590-250*after(t,4.6,.4),remove:after(t,5,.3),fill:after(t,5.3,.3),seal:after(t,5.65,.35),exit:after(t,6)};
 if(id==='splicing')return {phase,f,bind:after(t,0),assemble:after(t,1),fold:after(t,2),first:after(t,3),second:after(t,4,.3),join:after(t,4.3,.7),release:after(t,5)};
 return {phase,f,bind:after(t,0),gdpOut:after(t,1,.4),gtpIn:after(t,1.5,.5),travel:after(t,2),make:after(t,3),campBind:after(t,4,.5),catRelease:after(t,4.5,.5),phosphorylate:after(t,5,.75),off:after(t,6),hydrolyse:after(t,6,.25),returnG:after(t,6.25,.5),clear:after(t,6.25,.5),dephosphorylate:after(t,6.6,.4)};
}
const c={old:'#9a78bf',fresh:'#429f9d',gold:'#d2a052',blue:'#76a6c7',green:'#68aa8d',muted:'#7e94a7',ink:'#425b73',orange:'#d3a16b'};
const tx=(x,y,s,size=14,fill=c.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${fill}">${s}</text>`;
const line=(d,color,w=3,extra='')=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const dot=(x,y,r,color,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${extra}/>`;
const group=(x,y,body,extra='')=>`<g transform="translate(${x} ${y})" ${extra}>${body}</g>`;
const pill=(x,y,w,h,label,color)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${color}"/>`+tx(x+w/2,y+h/2+5,label,13,'white');
const enzyme=(x,y,label,color,opacity=1)=>group(x,y,`<ellipse rx="34" ry="24" fill="${color}" fill-opacity=".22" stroke="${color}" stroke-width="2"/>`+tx(0,['Pol','Ligase'].includes(label)?40:5,label,12),`opacity="${opacity}" data-molecule="${label}"`);
const arrow=(x,y,x2,color)=>line(`M${x} ${y}H${x2}l${x2>x?-7:7} -5m${x2>x?7:-7} 5l${x2>x?-7:7} 5`,color,2);
function replication(s){
 const {phase,f,bind,open,fork,primer,leading,lag1,primer2,lag2,remove,fill,seal,exit}=s;let b=tx(410,30,'同一个复制叉 · 两种延长方式',18)+tx(410,55,'旧模板反向平行，新 DNA 均按 5′ → 3′ 延长',14,c.muted);
 const yy=(x,k)=>(k?245:210)+(k?70:-70)*open*clamp((fork-x)/90);
 for(let k=0;k<2;k++)b+=line(Array.from({length:65},(_,i)=>`${i?'L':'M'}${100+i*10} ${yy(100+i*10,k)}`).join(' '),c.old,5);
 for(let x=120;x<=740;x+=24){const sep=open*clamp((fork-x)/90);b+=line(`M${x} ${yy(x,0)+3}V${yy(x,1)-3}`,c.old,2,`opacity="${clamp(1-sep*10)}"`);if(sep>.8&&phase<3)b+=dot(x,yy(x,1)+10,5,'#a6b7c4');}
 b+=tx(77,yy(100,0)+5,'3′')+tx(77,yy(100,1)+5,'5′')+tx(772,215,'5′')+tx(772,250,'3′');
 const hx=mix(195,fork,bind),hy=mix(102,227,bind)-exit*65;
 b+=group(hx,hy,`<circle r="27" fill="#fff8ea" stroke="${c.gold}" stroke-width="8"/>`+tx(0,5,'解旋',12),`opacity="${1-exit}" data-molecule="helicase"`);
 if(phase<2)b+=arrow(560,95,660,c.gold)+tx(610,83,'复制叉方向',12);
 // Primer removal, DNA filling, and nick sealing occupy separate time windows.
 const primerSegment=(x1,x2,y,a)=>line(`M${x1} ${y}H${mix(x1,x2,a)}`,c.orange,8,`opacity="${1-remove}"`)+line(`M${x1} ${y}H${mix(x1,x2,fill*a)}`,c.fresh,8,`opacity="${fill}"`)+group(0,-remove*55,line(`M${x1} ${y}H${mix(x1,x2,a)}`,c.orange,6),`opacity="${remove*(1-fill)}"`);
 if(primer>0){b+=primerSegment(140,170,168,primer)+primerSegment(340,310,287,primer)+tx(123,174,'5′',12)+group(0,0,tx(355,292,'5′',12),`opacity="${1-seal}"`);}
 if(phase>=2&&phase<=4){const arrive=phase===2?after(f,.5,.5):1;b+=enzyme(mix(100,leading,arrive),mix(96,168,arrive),'Pol',c.blue);const lx=phase===4?mix(140,590,after(f,0,.35)):lag1;b+=enzyme(phase===4&&f>.6?lag2:lx,287,'Pol',c.blue,phase===2?arrive:1);}
 if(phase>=3){b+=line(`M170 168H${leading}`,c.fresh,7)+line(`M310 287H${lag1}`,c.fresh,7)+tx(leading+17,173,'3′',12)+tx(lag1-17,292,'3′',12);for(let x=180;x<leading;x+=24)b+=line(`M${x} 144V164`,c.fresh,1.5);for(let x=150;x<310;x+=24)if(x>lag1)b+=line(`M${x} 292V311`,c.fresh,1.5);}
 if(primer2>0){b+=primerSegment(620,590,287,primer2)+tx(638,292,'5′',12);if(phase>=4){b+=line(`M590 287H${lag2}`,c.fresh,7)+group(0,0,tx(lag2-15,278,'3′',12),`opacity="${1-seal}"`);for(let x=350;x<590;x+=24)if(x>lag2)b+=line(`M${x} 292V311`,c.fresh,1.5);}}
 if(phase>=3&&phase<5){const target=phase===3?leading:(f<.6?leading:lag2),y=phase===4&&f>=.6?287:168,a=ease((f*4)%1);b+=dot(mix(target-45,target,a),mix(y+(y===168?45:-45),y,a),6,c.fresh);}
 if(phase>=4)b+=line('M340 283V291','#fff',5,`opacity="${1-seal}"`);
 if(phase>=5){b+=line('M336 287H344',c.fresh,7,`opacity="${seal}"`);if(phase===5){const leave=after(f,0,.25);b+=enzyme(620+leave*40,168-leave*55,'Pol',c.blue,1-leave)+enzyme(340-leave*45,287+leave*55,'Pol',c.blue,1-leave)+enzyme(mix(420,340,after(f,.55,.2)),mix(370,287,after(f,.55,.2)),'Ligase',c.gold,after(f,.5,.15));}else b+=enzyme(340-exit*60,287+exit*60,'Ligase',c.gold,1-exit);}
 if(phase>=2&&phase<=4)b+=enzyme(phase===4?mix(170,620,after(f,0,.35)):mix(100,170,primer),phase===4?245:104,'Primase',c.orange,phase===2?1:phase===4?1-after(f,.6,.4):0);
 b+=tx(305,119,'前导链：连续合成 →',14,c.fresh)+tx(300,349,'后随链：← 分段合成',14,c.fresh);
 if(phase>=4)b+=tx(233,378,'冈崎片段 1',12)+tx(486,378,'冈崎片段 2',12);
 b+=tx(410,414,phase===5?'先移除 RNA → 再补入 DNA → 最后封闭骨架切口':phase===6?'已复制区域：两份双链，各含一条旧链和一条新链':'颜色标记分子身份；箭头表示合成或移动方向',14,c.muted);
 return b;
}
function splicing(s){
 const {phase,f,bind,assemble,fold,first,second,join,release}=s;let b=tx(410,30,'一个内含子 · 两次化学反应',18)+tx(410,55,'识别 → 组装 → 重排 → 套索 → 外显子连接',14,c.muted);
 const ex1=140+120*join,ex2=540-140*join,ey=240+40*join+70*release,sy=240-40*release,start=280+190*first,ax=470;
 const active=assemble*(1-release);
 b+=`<ellipse cx="420" cy="225" rx="215" ry="110" fill="${c.blue}" fill-opacity="${active*.08}" stroke="${c.blue}" stroke-dasharray="5 7" opacity="${active}"/>`;
 b+=pill(ex1,ey-16,140,32,'外显子 1',c.blue)+pill(ex2,ey-16,140,32,'外显子 2',c.blue)+tx(ex1-20,ey+5,'5′')+tx(ex2+160,ey+5,'3′');
 b+=line(`M${start} ${sy}C${mix(345,280,fold)} ${sy-140*fold} ${mix(410,470,fold)} ${sy-140*fold} ${ax} ${sy}L540 ${sy}`,c.orange,6);
 b+=dot(ax,sy,10,c.gold)+tx(ax,sy+5,'A',12,'white');
 if(phase<4)b+=tx(280,278,'5′ 剪接位点',12)+tx(577,278,'3′ 剪接位点',12);
 if(second>0&&second<1)b+=line(`M540 ${sy}V${sy-18*second}`,c.orange,2);
 if(join>.95)b+=line(`M${ex1+138} ${ey}H${ex2+2}`,c.blue,5,`opacity="${ease((join-.95)/.05)}"`);
 const particle=(label,x,y,color,opacity=1)=>group(x,y,dot(0,0,19,color)+tx(0,5,label,12,'white'),`opacity="${opacity}" data-molecule="${label}"`);
 b+=particle('U1',mix(160,280,bind)-fold*100,mix(110,211,bind)-fold*110,c.old,1-fold);
 b+=particle('U2',mix(660,470,bind)-100*join+release*120,mix(360,278,bind)-70*join-release*40,c.green,1-release*.6);
 b+=particle('U4',mix(540,390,assemble)-fold*70,mix(100,170,assemble)-fold*70,c.old,assemble*(1-fold));
 b+=particle('U6',mix(575,420,assemble)+release*90,mix(100,165,assemble)-release*70,c.fresh,assemble*(1-release*.6));
 b+=particle('U5',mix(700,535,assemble)+release*100,mix(345,205,assemble)-release*20,c.blue,assemble*(1-release*.6));
 if(phase===0)b+=line('M160 110Q250 115 280 211',c.old,1.5,'stroke-dasharray="5 7"');
 if(phase===1)b+=line('M575 100Q480 90 420 165',c.fresh,1.5,'stroke-dasharray="5 7"');
 if(phase===3)b+=tx(410,351,'第一反应：左侧切开，右侧仍相连',14);
 if(phase===4)b+=tx(410,364,'第二反应：外显子连接，套索脱离',14);
 b+=tx(410,422,phase===5?'RNA 产物释放 · 剪接组分回收 · 套索随后去分支降解':'处理对象是前体 mRNA，不是染色体 DNA',14,c.muted);
 return b;
}
function signaling(s){
 const {phase,f,bind,gdpOut,gtpIn,travel,make,campBind,catRelease,phosphorylate,off,hydrolyse,returnG,clear,dephosphorylate}=s;let b=tx(410,28,'GPCR → Gs → AC → cAMP → PKA',18)+tx(410,51,'一种具体的胞外信号转为胞内响应的路线',14,c.muted);
 b+=`<rect x="60" y="151" width="700" height="29" rx="12" fill="#cddbd2"/>`+tx(100,117,'细胞外',13)+tx(100,208,'细胞内',13);
 const ligX=mix(100,190,bind)-off*75,ligY=mix(82,122,bind)-off*36;
 b+=group(ligX,ligY,dot(0,0,13,c.old)+tx(0,-22,'配体',12), 'data-molecule="ligand"');
 b+=line('M172 130Q190 151 208 130M174 145V185M190 151V197M206 145V185',bind*(1-off)>.5?c.fresh:c.blue,10)+tx(261,135,'GPCR',13);
 b+=pill(396,133,49,62,'AC',travel*(1-hydrolyse)>.8?c.fresh:c.blue);
 const gx=mix(190,390,travel*(1-returnG)),gy=225;
 b+=group(gx,gy,dot(0,0,28,c.green)+tx(0,-7,'Gα',13,'white'), 'data-molecule="Galpha"');
 b+=pill(231,232,48,27,'βγ','#9faebd');
 b+=line(`M${gx+24} 237L235 243`,c.green,3,`opacity="${1-travel*(1-returnG)}"`)+line('M395 201L414 191',c.green,3,`opacity="${travel*(1-returnG)}"`);
 if(gdpOut<1)b+=group(-gdpOut*48,gdpOut*63,pill(gx-19,gy+3,38,19,'GDP','#a392b3'),`opacity="${1-gdpOut}"`);
 if(gtpIn>0)b+=group(mix(320,gx,gtpIn),mix(303,gy+14,gtpIn),pill(-19,-11,38,19,hydrolyse>.5?'GDP':'GTP',hydrolyse>.5?'#a392b3':'#438a6f'));
 if(phase===1)b+=arrow(300,300,240,c.green)+tx(330,329,'游离 GTP',12,c.green);
 if(phase===2)b+=arrow(285,211,350,c.green);
 const spots=[[458,258],[485,278],[450,303],[480,330]],sites=[[523,284],[553,284],[523,315],[553,315]];
 for(let i=0;i<4;i++){
  const birth=ease((make*4-i)),sx=mix(420,spots[i][0],birth),sy=mix(223,spots[i][1],birth),x=mix(sx,sites[i][0],campBind)+clear*(90+(i-1.5)*16),y=mix(sy,sites[i][1],campBind)+clear*60;
  if(birth>0)b+=group(x,y,dot(0,0,9,clear>.5?'#adbcc7':c.gold),`opacity="${birth}" data-molecule="messenger"`);
 }
 if(make>0)b+=tx(clear>.5?674:mix(479,538,campBind),clear>.5?393:252,clear>.5?'AMP':'cAMP',12,c.gold);
 if(phase===3){const a=ease((f*4)%1);b+=pill(mix(330,400,a),mix(285,215,a),40,22,'ATP',c.gold)+tx(350,322,'ATP → cAMP',12);}
 b+=enzyme(538,300,'R',c.old)+tx(538,355,'PKA 调节部分',12);
 const cx=580+60*catRelease*(1-clear),cy=300+15*catRelease*(1-clear);
 b+=enzyme(cx,cy,'C',c.blue)+tx(640,270,'PKA 催化部分',12);
 if(catRelease<1)b+=line('M559 300H560',c.muted,3,`opacity="${1-catRelease}"`);
 const phosphorylated=phosphorylate*(1-dephosphorylate);
 b+=pill(675,299,82,43,'靶蛋白',phosphorylated>.9?c.fresh:'#a8b9c8');
 if(phosphorylate>0)b+=group(mix(606,731,phosphorylate)+dephosphorylate*25,mix(375,295,phosphorylate)+dephosphorylate*70,dot(0,0,10,c.gold)+tx(0,4,'P',11,'white'),'data-molecule="phosphate"');
 if(phase===5)b+=tx(597,398,phosphorylate<.9?'ATP 提供磷酸基':'ATP → ADP',12);
 if(phase===6){b+=enzyme(mix(425,580,clear),mix(394,363,clear),'PDE',c.gold)+enzyme(716,390,'磷酸酶',c.gold,dephosphorylate)+tx(303,275,hydrolyse>.5?'GTP → GDP + Pi':'',12);}
 b+=tx(410,438,phase===6?'GTP 水解 · cAMP 降解 · 靶蛋白去磷酸化':phase>=3?'胞外配体留在膜外；胞内第二信使来自 ATP':'先结合，再改变分子状态；虚线或箭头不代表实体管道',13,c.muted);
 return b;
}
export function processDiagram(id,p){const s=processState(id,p),lesson=processLessons[id],render={replication,splicing,signaling}[id];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 455" role="img" aria-label="${lesson.title}：${lesson.steps[s.phase].title}" font-family="system-ui,Microsoft YaHei,sans-serif"><title>${lesson.steps[s.phase].title}</title>${render(s)}</svg>`;}
