import {mountFigure} from './figure-effects.js';
import {molecularLessons,molecularDiagram} from './molecular-motion.js';
// Stable course/topic IDs preserve lesson links and browser learning records.
const routes=[
 ['transport',{cell:'membrane'}],['secretion',{cell:'golgi'}],
 ['atp',{cell:'mitochondria',molecules:'metabolite'}],
 ['replication',{molecules:'dna',expression:'replication'}],
 ['transcription',{cell:'nucleus',molecules:'rna',expression:'transcription'}],
 ['splicing',{molecules:'rna',expression:'rna-processing'}],
 ['translation',{cell:'ribosome',molecules:'protein',expression:'translation'}],
 ['enzyme',{molecules:'enzyme'}],['signaling',{expression:'signaling'}]
];
export const animations=routes.map(([id,focus])=>({id,focus,...molecularLessons[id]}));
export const animationById=Object.fromEntries(animations.map(a=>[a.id,a]));
export const diagram=molecularDiagram;

export class AnimationPlayer{
 constructor(root,{courseId,preferred,onSelect}){
  this.root=root;this.list=animations.filter(a=>a.focus[courseId]);this.courseId=courseId;this.onSelect=onSelect;this.current=this.list.find(a=>a.id===preferred)||this.list[0];this.progress=0;this.playing=false;this.speed=1;this.frame=null;this.last=0;this.destroyed=false;this.activeStep=-1;this.stopAt=1;this.zoom=false;
  root.innerHTML=`<div class="animation-player"><div class="animation-header"><label for="animation-select">过程动画</label><select id="animation-select">${this.list.map(a=>`<option value="${a.id}" ${a===this.current?'selected':''}>${a.title}</option>`).join('')}</select></div><div class="animation-legend"></div><div class="molecular-toolbar"><span>跟着分子走，一次看懂一个动作</span><button data-anim="zoom" aria-pressed="false">放大细节</button></div><div class="process-canvas" tabindex="0" aria-label="过程动画画面；放大后可横向滚动"></div><div class="animation-chapters" aria-label="选择动画步骤"></div><div class="animation-caption" aria-live="polite"><span class="animation-step"></span><h3></h3><p></p><div class="animation-look"></div></div><div class="animation-timeline"><label for="animation-seek">动画进度 <output>0%</output></label><input id="animation-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="动画时间轴"></div><div class="animation-controls"><button data-anim="prev" aria-label="上一步">← 上一步</button><button class="play-animation" data-anim="play">连续播放</button><button data-anim="step">播放本步</button><button data-anim="next" aria-label="下一步">下一步 →</button><button data-anim="reset">重播</button><label>速度 <select id="animation-speed" aria-label="动画速度"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="1.5">1.5×</option></select></label></div><p class="animation-note"></p><a class="animation-source" target="_blank" rel="noopener">参考：Molecular Biology of the Cell · NCBI Bookshelf ↗</a></div>`;
  this.abort=new AbortController();const opts={signal:this.abort.signal};
  root.querySelector('#animation-select').addEventListener('change',e=>{this.pause();this.current=animationById[e.target.value];this.progress=0;this.activeStep=-1;this.draw();this.onSelect?.(this.current.focus[this.courseId],this.current.id);},opts);
  root.querySelector('#animation-seek').addEventListener('input',e=>{this.pause();this.progress=Number(e.target.value)/1000;this.draw();},opts);
  root.querySelector('#animation-speed').addEventListener('change',e=>{this.speed=Number(e.target.value);},opts);
  root.addEventListener('click',e=>{
   const chapter=e.target.closest('[data-chapter]');if(chapter){this.pause();this.progress=Number(chapter.dataset.chapter)/this.current.steps.length;this.draw();return;}
   const b=e.target.closest('[data-anim]');if(!b)return;const action=b.dataset.anim;
   if(action==='zoom'){this.zoom=!this.zoom;const canvas=this.root.querySelector('.process-canvas');canvas.classList.toggle('zoomed',this.zoom);canvas.scrollLeft=0;this.root.querySelector('.molecular-toolbar span').textContent=this.zoom?'左右滑动画面，查看分子细节':'跟着分子走，一次看懂一个动作';b.textContent=this.zoom?'还原全景':'放大细节';b.setAttribute('aria-pressed',String(this.zoom));return;}
   if(action==='play'){this.playing?this.pause():this.play();return;}
   this.pause();const n=this.current.steps.length,i=this.index();
   if(action==='step'){this.progress=i/n;this.stopAt=Math.min(1,(i+1)/n-0.000001);this.play(true);return;}
   this.progress=action==='reset'?0:Math.max(0,Math.min(n-1,i+(action==='next'?1:-1)))/n;this.draw();
  },opts);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)this.pause();},opts);
  this.draw();
 }
 index(){return Math.min(this.current.steps.length-1,Math.floor(this.progress*this.current.steps.length+1e-10));}
 draw(){
  if(this.destroyed)return;const a=this.current,index=this.index(),s=a.steps[index],n=a.steps.length;
  mountFigure(this.root.querySelector('.process-canvas'),diagram(a.id,this.progress),{continuous:true});
  this.root.querySelector('#animation-seek').value=Math.round(this.progress*1000);this.root.querySelector('output').textContent=Math.round(this.progress*100)+'%';
  if(index!==this.activeStep){
   this.root.querySelector('.animation-step').textContent=`步骤 ${index+1} / ${n}`;this.root.querySelector('.animation-caption h3').textContent=s.title;this.root.querySelector('.animation-caption p').textContent=s.text;
   this.root.querySelector('.animation-look').textContent=s.look?'观察提示 · '+s.look:'';
   const chapters=this.root.querySelector('.animation-chapters');
   if(chapters.dataset.id!==a.id){chapters.innerHTML=a.steps.map((v,i)=>`<button data-chapter="${i}" aria-label="第 ${i+1} 步：${v.title}"><b>${String(i+1).padStart(2,'0')}</b><span>${v.title.split('：')[0]}</span></button>`).join('');chapters.dataset.id=a.id;}
   chapters.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-current',i===index?'step':'false');});
   this.activeStep=index;
  }
  this.root.querySelector('.animation-legend').textContent=a.legend.join('  ·  ');this.root.querySelector('.animation-note').textContent=a.note;
  const source=this.root.querySelector('.animation-source');source.hidden=!a.source;if(a.source){source.href=a.source;source.textContent='参考：'+(a.sourceLabel||'Molecular Biology of the Cell · NCBI Bookshelf')+' ↗';}
  this.root.querySelector('[data-anim="prev"]').disabled=index===0;this.root.querySelector('[data-anim="next"]').disabled=index===n-1;this.updateButton();
 }
 updateButton(){const b=this.root.querySelector('[data-anim="play"]');if(b){b.textContent=this.playing?'暂停':'连续播放';b.setAttribute('aria-pressed',String(this.playing));}}
 play(single=false){if(this.playing)this.pause();if(!single)this.stopAt=1;if(this.progress>=1)this.progress=0;this.playing=true;this.last=performance.now();this.updateButton();this.frame=requestAnimationFrame(t=>this.tick(t));}
 tick(t){if(!this.playing||this.destroyed)return;const dt=Math.min(100,t-this.last);if(dt>=30){this.progress=Math.min(this.stopAt,this.progress+dt*this.speed/(this.current.duration||20000));this.last=t;this.draw();}if(this.progress>=this.stopAt){this.pause();return;}this.frame=requestAnimationFrame(t=>this.tick(t));}
 pause(){this.playing=false;cancelAnimationFrame(this.frame);this.frame=null;this.updateButton();}
 destroy(){this.pause();this.abort.abort();this.destroyed=true;}
 getState(){return{id:this.current.id,progress:this.progress,playing:this.playing,speed:this.speed,step:this.index()+1,stepCount:this.current.steps.length};}
}
