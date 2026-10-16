// Every visible movement is evaluated from the player's clock, including diffusion.
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
const mix=(a,b,t)=>a+(b-a)*t;
const after=(t,start,d=1)=>ease((t-start)/d);
const S=(title,text,look)=>({title,text,look});
export const cellLessons={
 transport:{duration:48000,title:'跨膜运输：追踪通道中的双向运动',legend:['青色 K⁺：可通过的离子','橙色 Na⁺：对照离子','蓝色：钾通道','浅绿：膜'],source:'https://www.ncbi.nlm.nih.gov/books/NBK26910/',sourceLabel:'Molecular Biology of the Cell · Ion Channels',note:'钾通道易化扩散示意；两侧等体积，假设膜电位被外部固定为 0，仅突出浓度差。真实离子平衡取决于电化学梯度，浓度不必相等。粒子轨迹、通道开关和数量为教学构造。',steps:[
 S('观察：分子在两侧持续运动','离子在溶液中不断运动，脂质双层却阻碍带电离子直接通过。这个受控示例中左侧 K⁺ 较多，右侧较少；两侧并没有让分子单向排列的指挥者。','先看青色离子的移动，再看中央完整的膜。通道关闭时，没有离子直接穿过脂质区域。'),
 S('开放：通道提供一条亲水通路','钾通道打开后，适合的离子可以经孔道通过。通道本次运输不逐个水解 ATP；离子的净移动由电化学梯度驱动。这里将膜电位固定为零以单独观察浓度差。','看蓝色通道中央的门打开，一枚 K⁺ 先接近入口，再沿孔道穿过膜。'),
 S('选择：与滤器相互作用后通过','选择性滤器对不同离子的脱水代价和相互作用提供不同的能量条件。钾通道通常强烈偏好 K⁺；并不是孔足够大就允许所有更小的离子通过。','比较两种轨迹：青色 K⁺ 进入孔道，橙色 Na⁺ 靠近后返回。橙色粒子不计入 K⁺ 数量。'),
 S('净流动：双向都有，数量不同','开放通道允许离子双向运动。左侧较多时，这个示例中左向右通过的数量总体多于反向，因此产生向右的净通量。','跟随反向穿过的一枚 K⁺；看到它并不意味着整体净流动方向发生了反转。'),
 S('趋近：两侧差异逐步减小','随着 K⁺ 重新分布，两侧差异缩小。在本例等体积且膜电位保持零的条件下，平均净通量趋于零；通道内暂时经过的离子单独计数。','对照画面下方左侧、孔道和右侧三个计数，它们的总和始终是 16。'),
 S('动态平衡：仍在交换，净变化为零','平衡不等于每个分子停止运动。这里用一对同时反向经过的粒子说明双向交换可以相抵；真实微观通量会波动，统计平均的净通量为零。','看最后两枚 K⁺ 反向交换位置，通道保持开放。实际细胞有膜电位时，离子浓度可以在不相等时达到电化学平衡。') ]},
 secretion:{duration:56000,title:'蛋白分泌：追踪一份囊泡中的货物',legend:['紫色小链：同一份蛋白','蓝色轮廓：细胞器 / 囊泡膜','金色：包被 / 加工标记','绿色短线：对接分子'],source:'https://www.ncbi.nlm.nih.gov/books/NBK9889/',sourceLabel:'The Cell · The Endoplasmic Reticulum',note:'典型可溶性分泌蛋白的经典路线；省略 SRP、质量控制、逆向运输及高尔基体内部转运。金色加工标记示意一类糖蛋白加工，不代表所有货物。膜形变和分子数量非等比例。',steps:[
 S('进入：新生蛋白进入内质网腔','带有相应信号的分泌蛋白由核糖体合成，并经内质网转位通道进入内质网腔。在腔内折叠、接受加工和质量控制后，合格货物进入后续运输。','跟随紫色新生链从核糖体附近进入内质网腔，再折叠成货物；注意它在腔内，不是在细胞质中自由漂浮。'),
 S('装载与出芽：膜包住货物','货物在内质网出口处被选择性装载，包被蛋白在膜的胞质侧帮助形成芽。膜弯曲包围货物，形成由细颈连接的运输结构。','看紫色货物进入膜芽，金色包被在外侧出现；膜芽与内质网在这一阶段仍相连。'),
 S('脱离与运输：囊泡离开内质网','膜颈断开后形成封闭的运输囊泡，包被随后脱落。囊泡沿运输路线移动，与高尔基体一侧的识别、系留及对接装置接触。','看膜颈先断开，金色包被再离开；蓝色膜始终包着紫色货物一起移动。'),
 S('融合与加工：货物进入高尔基体腔','囊泡膜与目标膜融合，腔内空间连通，货物进入高尔基体。货物随后被进一步加工与分拣；本图用金色小标记示意一次加工。','看目标膜先出现连通口，紫色货物才进入腔内。囊泡膜融入目标膜，不是货物穿透一堵完整的膜。'),
 S('再装载：形成分泌运输囊泡','完成分拣的货物进入面向细胞表面的运输结构。膜再次包住货物并分离，货物仍然位于囊泡内部。','看带金色标记的同一份紫色蛋白进入右侧膜芽，蓝色膜收拢后形成新的封闭囊泡。'),
 S('对接：囊泡与细胞膜靠近','运输囊泡到达细胞表面。系留因子与 SNARE 等分子协作，使正确的膜靠近并准备融合；对接本身还不等于内容物已经释放。','看绿色对接分子接近、结合，囊泡停在细胞膜内侧；紫色货物此时仍在囊泡中。'),
 S('胞吐：形成融合孔并释放货物','囊泡膜与细胞膜融合并形成融合孔。腔内货物经连通口释放到细胞外，囊泡膜成为细胞膜的一部分，后续膜回收在此未展开。','先看细胞膜与囊泡形成连通的开口，再看紫色货物向外扩散；它没有穿过完整的脂质双层。') ]},
 atp:{duration:48000,title:'ATP 合成：质子流动与催化循环',legend:['紫色 H⁺：质子','蓝色：ATP 合酶','金色转子 / 轴：旋转部分','青色：ADP、Pi 与 ATP'],source:'https://www.ncbi.nlm.nih.gov/books/NBK26894/',sourceLabel:'Molecular Biology of the Cell · The Mitochondrion',note:'线粒体 ATP 合酶的分区示意；仅跟踪一个 F₁ 催化位点，另外两个位点的底物未画出。旋转角、质子数和时间分段不表示化学计量。半通道、c 环和构象均简化；省略呼吸链与 ADP/Pi 转运。',steps:[
 S('先看梯度：膜两侧储存可利用的势能','呼吸链在内膜两侧建立质子电化学梯度，包含浓度差和膜电位。膜间隙一侧的质子回到基质具有驱动力；梯度由其他过程持续维持。','找到膜间隙、内膜和基质三个区域。紫色 H⁺ 与下方的 ADP、Pi 是不同的物质。'),
 S('回流与旋转：H⁺ 经 Fₒ 运动','质子通过膜内 Fₒ 部分相关的两条半通道和 c 环位点，沿电化学梯度回流。质子结合、转运与释放耦联转子的旋转，带动中央轴。','跟随亮色 H⁺ 从上方进入膜内，再从另一侧出口进入基质；看金色转子和轴的指示线转动。'),
 S('底物结合：ADP 与 Pi 进入 F₁ 位点','朝向基质的 F₁ 催化头包含三个交替工作的催化位点。本图只跟踪右下方一个位点，看 ADP 与无机磷酸 Pi 从基质接近并结合。','看 ADP 和 Pi 两个对象进入同一个蓝色位点。H⁺ 从膜内回流，没有变成 ADP 或整个 ATP。'),
 S('构象改变：结合的底物形成 ATP','旋转轴改变催化位点的构象与结合性质，使 ADP、Pi 与 ATP 之间的转化和结合状态沿催化循环推进。能量来自质子动力势与旋转的耦联。','看右下方位点收紧，ADP 与 Pi 靠拢形成标为 ATP 的产物；其余催化位点也会在真实酶中交替工作。'),
 S('开放与释放：ATP 离开催化位点','位点进一步改变构象，降低对 ATP 的亲和力，使 ATP 释放到基质。释放是循环的重要环节；不能把 ATP 合酶理解成只把两个底物挤在一起的静态夹子。','看位点由收紧变为开放，完整的 ATP 随后向外移动；蓝色催化头本身保留。'),
 S('进入下一轮：酶保留，循环继续','空出的位点可再次结合 ADP 与 Pi。只要质子动力势和底物条件支持，酶就能继续工作；条件改变时 ATP 合酶也可能反向水解 ATP。','看上一枚 ATP 留在外侧，新的 ADP 与 Pi 靠近空位。图中的一次示范不等于一枚质子固定生成一枚 ATP。') ]},
 enzyme:{duration:48000,title:'酶催化：看清结合、转化与释放',legend:['蓝色：酶','紫金相连：底物 S','分开的两部分：产物 P₁、P₂','细虚线：结合相互作用'],source:'https://www.ncbi.nlm.nih.gov/books/NBK9921/',sourceLabel:'The Cell · The Central Role of Enzymes as Biological Catalysts',note:'抽象反应 S → P₁ + P₂ 的教学示意，不对应特定酶或真实原子结构；省略可能参与的水、辅因子和质子转移。诱导契合不是所有酶都以同一幅度发生的机械夹紧。',steps:[
 S('接近：底物通过运动遇到酶','底物（substrate）在环境中运动并遇到酶。酶的活性位点提供特定的化学环境；适合的分子可以通过相互作用被定位。','跟随紫金相连的底物向蓝色酶靠近；此时还没有断键，也没有释放产物。'),
 S('结合：形成酶–底物复合物','底物进入活性位点，多个非共价相互作用帮助它停留和定位。结合不是永久固定，是否能被催化还取决于正确的化学基团与构象。','看底物落入凹槽后出现细虚线，表示结合相互作用；紫色与金色部分仍然连接。'),
 S('诱导契合：酶与底物调整构象','底物结合可伴随酶和底物的构象调整，使参与反应的基团更合适地排列。这里将形状变化放大，帮助识别结合前后的差别。','看凹槽两侧向底物靠近，底物仍停留在位点中；形状变化本身不等于反应已完成。'),
 S('催化：降低能垒，完成转化','酶通过稳定过渡态、定位反应基团等方式降低活化能，加快反应。本例示意一个底物转为两个产物；酶不改变反应本身的平衡常数。','看紫色与金色部分之间的连接断开，形成 P₁ 和 P₂；产物暂时仍与活性位点接触。'),
 S('释放：产物离开活性位点','反应后的产物与位点的结合性质发生变化，随后离开。酶与产物分离，空出的位点可以参与下一轮催化。','看结合虚线逐渐消失，P₁ 和 P₂ 沿不同轨迹离开；蓝色酶没有随产物被消耗。'),
 S('再利用：酶恢复可结合状态','酶完成一个周转后可继续接纳底物。实际反应速率还受底物浓度、温度、pH、抑制剂及酶量等因素影响。','看同一份蓝色酶保留在原位，下一份完整底物靠近；已经释放的两份产物仍在外侧。') ]}
};
export function cellState(id,p){const t=clamp(p)*cellLessons[id].steps.length,phase=Math.min(cellLessons[id].steps.length-1,Math.floor(t)),f=clamp(t-phase);
 if(id==='transport')return {phase,f,t,gate:after(t,1,.4)};
 if(id==='secretion')return {phase,f,enter:after(t,0),bud:after(t,1),uncoat:after(t,2,.35),travel:after(t,2,.8),fuseGolgi:after(t,3,.65),modify:after(t,3.7,.3),bud2:after(t,4),travel2:after(t,5,.65),dock:after(t,5.65,.35),fusion:after(t,6,.45),release:after(t,6.45,.55)};
 if(id==='atp')return {phase,f,t,turn:after(t,1)+after(t,3)+after(t,4),bind:after(t,2),tight:after(t,3),open:after(t,4,.4),release:after(t,4.4,.6),next:after(t,5)};
 return {phase,f,approach:after(t,0),bind:after(t,1),fit:after(t,2),reaction:after(t,3),open:after(t,4,.35),release:after(t,4.35,.65),next:after(t,5)};
}
const C={blue:'#73a6c9',green:'#60a995',purple:'#a17ac1',gold:'#d0a15e',ink:'#405b72',muted:'#7e93a6',membrane:'#c6d7cb'};
const tx=(x,y,s,size=14,color=C.ink)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" fill="${color}">${s}</text>`;
const path=(d,c,w=3,extra='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const circle=(x,y,r,c,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" ${extra}/>`;
const group=(x,y,b,extra='')=>`<g transform="translate(${x} ${y})" ${extra}>${b}</g>`;
const pill=(x,y,w,h,label,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${c}"/>`+tx(x+w/2,y+h/2+5,label,13,'white');
const route=(a,b,u)=>{u=ease(u);const points=[a,[330,230],[490,230],b],q=u*3,k=Math.min(2,Math.floor(q)),v=q-k;return [mix(points[k][0],points[k+1][0],v),mix(points[k][1],points[k+1][1],v)];};
const origins=Array.from({length:16},(_,i)=>i<12?[120+i%4*55,130+Math.floor(i/4)*90]:[560+(i%2)*75,145+Math.floor((i-12)/2)*125]);
const events=[{id:0,start:1.45,end:2.3,to:[540,105]},{id:1,start:2.25,end:3.1,to:[610,200]},{id:2,start:2.85,end:3.7,to:[705,320]},{id:12,start:3.0,end:3.85,to:[130,130],reverse:true},{id:3,start:3.45,end:4.3,to:[550,315]},{id:4,start:3.95,end:4.8,to:[700,150]},{id:5,start:5,end:6,to:origins[13]},{id:13,start:5,end:6,to:origins[5],reverse:true}];
export function transportParticles(p){const t=clamp(p)*6;return origins.map((o,id)=>{const event=events.find(e=>e.id===id);let pos=o,u=0;if(event){u=clamp((t-event.start)/(event.end-event.start));if(u===1)pos=event.to;else if(u>0){if(event.reverse){const reversed=route(event.to,o,1-u);pos=reversed;}else pos=route(o,event.to,u);}}
 const x=pos[0]+Math.sin(t*4+id)*5,y=pos[1]+Math.cos(t*3+id)*5;return{id,x,y,side:x<350?'left':x>470?'right':'pore'};});}
function transport(s,p){let b=tx(410,30,'有选择的通路 · 持续的双向运动',18)+tx(410,54,'受控示例：两侧等体积，膜电位固定为 0',13,C.muted);
 b+=`<rect x="350" y="90" width="120" height="270" rx="17" fill="${C.membrane}"/>`;
 for(let y=103;y<355;y+=20){b+=circle(358,y,6,'#a5c0b0')+circle(462,y,6,'#a5c0b0')+path(`M367 ${y}H390M430 ${y}H453`,'#b0c5b8',3);}
 b+=`<rect x="336" y="190" width="148" height="80" rx="25" fill="${C.blue}"/><rect x="330" y="213" width="160" height="34" rx="10" fill="#f6fbfd"/>`+path(`M410 214V${mix(245,216,s.gate)}`,C.gold,8);
 b+=tx(410,179,'K⁺ 选择性通道',13)+tx(410,295,s.gate===0?'门关闭':s.gate<1?'门正在打开':'门开放',12);
 const particles=transportParticles(p),counts={left:0,pore:0,right:0};for(const ion of particles){counts[ion.side]++;b+=group(ion.x,ion.y,circle(0,0,11,C.green)+tx(0,4,'K⁺',10,'white'),`data-ion="${ion.id}"`);}
 if(s.t>=2){const a=Math.sin(Math.PI*clamp((s.t-2)/1));b+=group(260+70*a,330-90*a,circle(0,0,12,C.gold)+tx(0,4,'Na⁺',9,'white'),'data-molecule="sodium"');}
 b+=tx(200,92,'左侧')+tx(625,92,'右侧')+tx(190,390,`K⁺：${counts.left}`)+tx(410,390,`孔道中：${counts.pore}`)+tx(635,390,`K⁺：${counts.right}`)+tx(410,430,'总数 16 · 位置连续变化，计数由当前画面计算',13,C.muted);return b;}
const cargo=(x,y,mark=0,opacity=1)=>group(x,y,path('M-10 -5L10 0L-3 11',C.purple,5)+circle(-10,-5,7,C.purple)+circle(10,0,7,C.purple)+circle(-3,11,7,C.purple)+circle(13,-11,5,C.gold,`opacity="${mark}"`),`opacity="${opacity}" data-molecule="cargo"`);
const vesicle=(x,y,coat=0)=>group(x,y,`<circle r="29" fill="#ffffff60" stroke="${C.blue}" stroke-width="4"/>`+Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return circle(37*Math.cos(a),37*Math.sin(a),4,C.gold,`opacity="${coat}"`);}).join(''),'data-molecule="vesicle"');
function secretion(s){const {phase,f,enter,bud,uncoat,travel,fuseGolgi,modify,bud2,travel2,dock,fusion,release}=s;let b=tx(410,30,'同一份货物 · 始终区分腔内与胞质',18)+tx(410,54,'内质网 → 高尔基体 → 细胞表面',14,C.muted);
 const erBud=phase===1,goBud=phase===4,goFuse=phase===3&&f<.8,surface=phase===6;
 b+=path('M80 150H200V195M200 255V300H80V150',C.blue,5)+tx(135,330,'内质网腔',14);
 if(erBud){const r=29*bud;b+=path(`M200 195C${200+r*2.8} 195 ${200+r*2.8} 255 200 255`,C.blue,5);for(let i=0;i<7;i++){const a=(i/6-.5)*Math.PI;b+=circle(200+r+(r+8)*Math.cos(a),225+(r+8)*Math.sin(a),4,C.gold,`opacity="${bud}"`);}}else b+=path('M200 195V255',C.blue,5);
 b+=path('M365 205V185H460V205M365 245V265H460V245',C.blue,5)+tx(412,330,'高尔基体腔',14);
 b+=path('M350 166Q410 150 475 166M350 284Q410 300 475 284',C.blue,7);
 if(goFuse){const extension=29*(1-fuseGolgi);b+=path(`M365 205C${365-extension*2.7} 190 ${365-extension*2.7} 260 365 245`,C.blue,5);}else b+=path('M365 205V245',C.blue,5);
 if(goBud){const r=29*bud2;b+=path(`M460 205C${460+r*2.8} 190 ${460+r*2.8} 260 460 245`,C.blue,5);}else b+=path('M460 205V245',C.blue,5);
 b+=path('M675 88V195M675 255V380',C.membrane,10)+tx(675,410,'细胞膜',13)+tx(739,110,'细胞外',13)+tx(567,110,'胞质',13);
 if(surface){const depth=58*(1-fusion),gap=20*fusion;b+=path(`M675 195C${675-depth*1.4} 170 ${675-depth*1.4} ${225-gap} ${675-depth} ${225-gap}M${675-depth} ${225+gap}C${675-depth*1.4} ${225+gap} ${675-depth*1.4} 280 675 255`,C.blue,5)+path('M675 195V255',C.membrane,10,`opacity="${1-fusion}"`);}else b+=path('M675 195V255',C.membrane,10);
 let x=160,y=225;
 if(phase===0){x=mix(115,160,enter);y=mix(158,225,enter);b+=pill(87,100,62,27,'核糖体',C.purple)+path('M115 127V150',C.purple,4)+path(`M115 150Q125 190 ${x} ${y}`,C.purple,3,`opacity="${1-enter}"`)+pill(104,141,22,18,'',C.green);}
 else if(phase===1)x=mix(160,229,bud);
 else if(phase===2){x=mix(229,336,travel);b+=vesicle(x,y,1-uncoat);}
 else if(phase===3)x=mix(336,410,fuseGolgi);
 else if(phase===4)x=mix(410,489,bud2);
 else if(phase===5){x=mix(489,646,travel2);b+=vesicle(x,y);}
 else{x=mix(646,746,release);}
 b+=cargo(x,y,modify);
 if(phase===5){b+=path(`M${x+29} 216h${dock*15}M674 216h${-dock*15}`,C.green,4)+tx(585,173,'对接 / SNARE',12,C.green);}
 b+=tx(410,370,phase<3?'膜芽包住货物，封闭后才离开内质网':phase<5?'融合后腔内空间连通，货物继续加工与分拣':'先对接，再融合，最后释放腔内货物',14)+tx(410,440,'紫色货物的身份保持一致；蓝色边界表示膜，不是运动轨迹',12,C.muted);return b;}
function atp(s){const {phase,f,t,turn,bind,tight,open,release,next}=s;let b=tx(410,30,'质子动力势 → 旋转 → 催化构象循环',18)+tx(410,56,'只跟踪右下方一个催化位点，其余位点底物省略',13,C.muted);
 b+=`<rect x="65" y="171" width="690" height="35" rx="12" fill="${C.membrane}"/>`+tx(145,157,'膜间隙',14)+tx(145,233,'基质',14)+tx(710,192,'内膜',13);
 for(let i=0;i<12;i++)b+=circle(100+i*54,100+(i%2)*19,5,C.purple);
 for(let i=0;i<3;i++)b+=circle(100+i*50,275,5,C.purple);
 b+=`<rect x="368" y="151" width="84" height="77" rx="24" fill="#d6e8f1" stroke="${C.blue}" stroke-width="3"/>`+tx(492,192,'Fₒ：膜内转子',13);
 b+=path('M375 139V173L396 185M426 198L445 215V244',C.purple,3,'stroke-dasharray="4 5"');
 b+=group(410,190,`<g transform="rotate(${turn*120})"><circle r="25" fill="#fbf1dd" stroke="${C.gold}" stroke-width="4"/>${path('M0 0L21 0',C.gold,5)}</g>`,'data-molecule="rotor"');
 b+=path('M410 218V313',C.gold,7)+tx(350,248,'中央轴',12);
 for(let i=0;i<5;i++){const u=clamp((t-1-i*.57)/1.4);if(u>0){let x,y;if(u<.3){x=375;y=mix(110,173,u/.3);}else if(u<.7){x=mix(375,445,(u-.3)/.4);y=mix(173,215,(u-.3)/.4);}else{x=mix(445,490+i*22,(u-.7)/.3);y=mix(215,245+(i%2)*20,(u-.7)/.3);}b+=circle(x,y,7,C.purple);}}
 for(const [i,x,y] of [[0,410,282],[1,365,345],[2,455,345]]){const radius=i===2?40-7*tight*(1-open):40;b+=`<circle cx="${x}" cy="${y}" r="${radius}" fill="${i===2?'#d7eee7':'#edf4f8'}" stroke="${C.blue}" stroke-width="3"/>`;if(i<2)b+=tx(x,y+4,'位点 '+(i+1),12,C.muted);}
 b+=group(410,315,`<g transform="rotate(${turn*120})">${path('M-18 8L0 -20L18 8Z',C.gold,4)}</g>`)+tx(383,416,'F₁：朝向基质的催化头',13);
 const ax=mix(625,443,bind),ay=mix(290,345,bind),px=mix(670,478,bind),py=mix(380,345,bind);
 if(tight<1){b+=group(mix(ax,455,tight),ay,pill(-23,-11,46,22,'ADP',C.green),`opacity="${1-tight}"`)+group(mix(px,455,tight),py,circle(0,0,13,C.gold)+tx(0,4,'Pi',11,'white'),`opacity="${1-tight}"`);}
 if(tight>0)b+=group(mix(455,660,release),mix(345,321,release),pill(-23,-12,46,24,'ATP',C.green),`opacity="${tight}" data-molecule="ATP"`);
 if(next>0)b+=group(mix(680,510,next),375,pill(-23,-11,46,22,'ADP',C.green)+circle(43,0,12,C.gold)+tx(43,4,'Pi',10,'white'),`opacity="${next}"`);
 b+=tx(410,448,phase<2?'质子沿梯度回流；不同颜色表示不同物质':'ADP + Pi ⇌ ATP · 反应方向与质子动力势及底物条件有关',12,C.muted);return b;}
function enzyme(s){const {phase,approach,bind,fit,reaction,open,release,next}=s;let b=tx(410,30,'酶保留在原位 · 底物变成产物后离开',18)+tx(410,56,'S → P₁ + P₂　｜　形状变化、反应与释放分开观察',13,C.muted);
 const close=fit*(1-open),left=330+close*18,right=490-close*18;
 b+=`<path d="M${left} 174C270 150 250 333 340 353Q410 381 480 353C570 333 550 150 ${right} 174L${right-13} 225Q410 ${270-close*16} ${left+13} 225Z" fill="#b8d8e8" stroke="${C.blue}" stroke-width="3" data-molecule="enzyme"/>`+tx(410,328,'酶 E',20)+tx(576,196,'活性位点',13)+path('M533 202L477 216',C.muted,1.5,'stroke-dasharray="3 4"');
 const sx=mix(mix(130,300,approach),410,bind),sy=mix(mix(120,155,approach),220,bind),gap=24+reaction*8;
 const x1=mix(sx-gap,590,release),y1=mix(sy,130,release),x2=mix(sx+gap,650,release),y2=mix(sy,270,release);
 if(reaction<1)b+=path(`M${x1} ${y1}L${x2} ${y2}`,C.gold,6,`opacity="${1-reaction}"`);
 b+=circle(x1,y1,17,C.purple)+circle(x2,y2,17,C.gold);
 if(bind>0&&release<1){b+=path(`M${left+12} 235L${x1} ${y1+14}M${right-12} 235L${x2} ${y2+14}`,C.green,2,`stroke-dasharray="4 5" opacity="${bind*(1-open)}"`);}
 b+=tx(x1,y1-28,reaction>.95?'P₁':'',14,C.purple)+tx(x2,y2-28,reaction>.95?'P₂':'',14,C.gold);
 if(phase<3)b+=tx(sx,sy-36,'底物 S',14);
 if(next>0){const x=mix(130,295,next),y=mix(315,140,next);b+=group(x,y,path('M-24 0H24',C.gold,5)+circle(-24,0,17,C.purple)+circle(24,0,17,C.gold)+tx(0,-29,'下一份 S',13),`opacity="${next}"`);}
 b+=tx(410,434,phase===3?'降低活化能，加快反应；不改变反应平衡常数':phase>=4?'产物释放，酶可再次参与催化':'非共价相互作用帮助定位；蓝色形状示意构象变化',13,C.muted);return b;}
export function cellDiagram(id,p){const s=cellState(id,p),a=cellLessons[id];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 465" role="img" aria-label="${a.title}：${a.steps[s.phase].title}" font-family="system-ui,Microsoft YaHei,sans-serif"><title>${a.steps[s.phase].title}</title>${({transport,secretion,atp,enzyme})[id](s,p)}</svg>`;}
