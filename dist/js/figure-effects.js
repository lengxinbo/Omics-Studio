// Presentation effects never change the data, scales, radii or computed results.
const NS='http://www.w3.org/2000/svg';
let serial=0,quiet=false,media;
const shapeSelector='circle,ellipse,rect,path,line,polygon,polyline';
const activeAnimations=new Set();
const reduce=()=>quiet||media?.matches;
function cancelMotion(){for(const a of activeAnimations)a.cancel();activeAnimations.clear();}
function animate(el,frames,options){if(reduce())return;const a=el.animate(frames,options);activeAnimations.add(a);a.finished.catch(()=>{}).finally(()=>activeAnimations.delete(a));}
function bbox(el){try{const b=el.getBBox();return{x:b.x,y:b.y,w:b.width,h:b.height,d:el.getAttribute('d'),fill:el.getAttribute('fill')};}catch{return null;}}
function key(el,i){return el.dataset.readingPick?el.tagName+':'+el.dataset.readingPick:el.tagName+':'+i;}
function reveal(svg,previous=new Map()){
 const shapes=[...svg.querySelectorAll(shapeSelector)].filter(e=>!e.closest('defs'));
 shapes.forEach((el,i)=>{const b=bbox(el),old=previous.get(key(el,i));if(!b)return;
  if(old&&['circle','ellipse','rect'].includes(el.tagName)&&b.w>0&&b.h>0){const dx=old.x-b.x,dy=old.y-b.y,sx=old.w/b.w,sy=old.h/b.h;if(Math.abs(dx)+Math.abs(dy)+Math.abs(sx-1)+Math.abs(sy-1)>.01){el.style.transformOrigin=b.x+'px '+b.y+'px';animate(el,[{transform:'translate('+dx+'px,'+dy+'px) scale('+sx+','+sy+')'},{transform:'translate(0,0) scale(1,1)'}],{duration:330,easing:'cubic-bezier(.2,.8,.2,1)'});}}
  else if(old&&el.tagName==='path'&&old.d&&el.getAttribute('d')&&old.d!==el.getAttribute('d')&&old.d.match(/[MLCQSTHVZA]/gi)?.join('')===el.getAttribute('d').match(/[MLCQSTHVZA]/gi)?.join('')){animate(el,[{d:'path("'+old.d+'")'},{d:'path("'+el.getAttribute('d')+'")'}],{duration:330,easing:'ease-out'});}
  else if(old&&old.fill!==el.getAttribute('fill')){animate(el,[{opacity:.55},{opacity:el.getAttribute('opacity')||1}],{duration:280});}
  else if(!old){animate(el,[{opacity:0},{opacity:el.getAttribute('opacity')||1}],{duration:430,delay:Math.min(i*7,150),fill:'backwards',easing:'ease-out'});}
 });
}
export function mountFigure(host,html,{continuous=false}={}){
 const oldComposition=host.querySelector('.composition-bar>span')?.style.width;const previous=new Map();if(!continuous)host.querySelectorAll('svg '+shapeSelector.split(',').join(',svg ')).forEach((el,i)=>{if(!el.closest('defs'))previous.set(key(el,i),bbox(el));});
 host.innerHTML=html;const composition=host.querySelector('.composition-bar>span');if(composition&&oldComposition)animate(composition,[{width:oldComposition},{width:composition.style.width}],{duration:350,easing:'ease-out'});
 host.querySelectorAll('svg').forEach(svg=>{
  svg.classList.add('living-figure');svg.dataset.figureId=String(++serial);
  svg.querySelectorAll('text[fill]').forEach(el=>el.style.fill=el.getAttribute('fill'));const defs=document.createElementNS(NS,'defs');svg.prepend(defs);const colors=new Map();
  svg.querySelectorAll('circle,ellipse,rect').forEach(el=>{const fill=el.getAttribute('fill');if(!fill||!/^#[0-9a-f]{6}$/i.test(fill)||el.hasAttribute('data-reading-pick')&&el.tagName==='rect')return;
   // Keep continuous heatmap colors and bubble areas untouched. Categorical marks get a gentle material finish.
   const rgb=[1,3,5].map(i=>parseInt(fill.slice(i,i+2),16));if(Math.max(...rgb)-Math.min(...rgb)<20||Math.min(...rgb)>220)return;
   if(!colors.has(fill)){const id='figure-'+serial+'-'+colors.size,g=document.createElementNS(NS,'linearGradient');g.id=id;g.setAttribute('x2','0');g.setAttribute('y2','1');for(const [offset,c] of [['0%',rgb.map(v=>Math.round(v+(255-v)*.16))],['100%',rgb]]){const stop=document.createElementNS(NS,'stop');stop.setAttribute('offset',offset);stop.setAttribute('stop-color','rgb('+c.join(',')+')');g.append(stop);}defs.append(g);colors.set(fill,id);}el.dataset.figureColor=fill;el.setAttribute('fill','url(#'+colors.get(fill)+')');
  });
  svg.querySelectorAll(shapeSelector).forEach(el=>{if(el.closest('defs'))return;const title=el.querySelector('title')?.textContent||el.getAttribute('aria-label');if(title){el.dataset.figureTip=title;el.classList.add('figure-mark');}});
  if(!continuous){const shell=document.createElement('div');shell.className='figure-shell';svg.before(shell);shell.append(svg);const bar=document.createElement('div');bar.className='figure-tools';bar.innerHTML='<span><i></i>观察 · 比较 · 发现</span><div><button data-figure-replay '+(reduce()?'disabled':'')+' aria-label="重播图表过渡">↻ 重播过渡</button><button data-figure-motion aria-pressed="'+!reduce()+'">动效 '+(reduce()?'关':'开')+'</button></div>';shell.prepend(bar);reveal(svg,previous);}
 });
}
if(typeof document!=='undefined'){
 media=matchMedia('(prefers-reduced-motion: reduce)');try{quiet=localStorage.getItem('omics-quiet-figures')==='true';}catch{}
 const sync=()=>{document.documentElement.dataset.quietFigures=String(!!reduce());document.querySelectorAll('[data-figure-motion]').forEach(b=>{b.textContent='动效 '+(reduce()?'关':'开');b.setAttribute('aria-pressed',String(!reduce()));});document.querySelectorAll('[data-figure-replay]').forEach(b=>b.disabled=!!reduce());if(reduce())cancelMotion();};media.addEventListener('change',sync);sync();
 const tip=document.createElement('div');tip.className='figure-tooltip';tip.setAttribute('role','tooltip');tip.hidden=true;document.body.append(tip);
 function hide(){tip.hidden=true;}
 function show(e){const target=e.target.closest?.('[data-figure-tip]');if(!target){hide();return;}tip.textContent=target.dataset.figureTip;tip.hidden=false;const r=target.getBoundingClientRect(),x=e.clientX||r.x+r.width/2,y=e.clientY||r.y;tip.style.left=Math.max(8,Math.min(innerWidth-tip.offsetWidth-8,x+14))+'px';tip.style.top=Math.max(8,Math.min(innerHeight-tip.offsetHeight-8,y+16))+'px';}
 document.addEventListener('pointerover',show);document.addEventListener('pointermove',e=>{if(!tip.hidden)show(e);});document.addEventListener('focusin',show);document.addEventListener('focusout',hide);document.addEventListener('scroll',hide,true);document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();});
 document.addEventListener('click',e=>{if(e.target.closest?.('[data-figure-motion]')){quiet=!reduce();try{localStorage.setItem('omics-quiet-figures',String(quiet));}catch{}sync();}if(e.target.closest?.('[data-figure-replay]'))reveal(e.target.closest('.figure-shell').querySelector('svg'));if(e.pointerType==='touch')show(e);});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelMotion();hide();}});
}
