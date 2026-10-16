import assert from 'node:assert/strict';
import {cellLessons,cellState,cellDiagram,transportParticles} from '../dist/js/cell-motion.js';
for(const [id,n] of [['transport',6],['secretion',7],['atp',6],['enzyme',6]]){
 assert.equal(cellLessons[id].steps.length,n);
 for(let i=0;i<=1000;i++){
  const p=i/1000,s=cellState(id,p);assert.ok(!/NaN|undefined|Infinity/.test(cellDiagram(id,p)));
  if(id==='transport'){
   const ions=transportParticles(p);assert.equal(ions.length,16);assert.equal(new Set(ions.map(a=>a.id)).size,16);
   for(const a of ions)if(a.side==='pore'){assert.equal(s.gate,1);assert.ok(a.y>=224&&a.y<=236,'crossing must stay in pore');}
  }else if(id==='secretion'){
   if(s.travel>0)assert.equal(s.bud,1);
   if(s.fuseGolgi>0)assert.equal(s.travel,1);
   if(s.modify>0)assert.equal(s.fuseGolgi,1);
   if(s.travel2>0)assert.equal(s.bud2,1);
   if(s.release>0){assert.equal(s.dock,1);assert.equal(s.fusion,1);}
  }else if(id==='atp'){
   if(s.tight>0)assert.equal(s.bind,1);
   if(s.release>0){assert.equal(s.tight,1);assert.equal(s.open,1);}
   if(s.next>0)assert.equal(s.release,1);
  }else{
   if(s.fit>0)assert.equal(s.bind,1);
   if(s.reaction>0)assert.equal(s.fit,1);
   if(s.release>0){assert.equal(s.reaction,1);assert.equal(s.open,1);}
   if(s.next>0)assert.equal(s.release,1);
  }
 }
}
for(const [p,left,right] of [[0,12,4],[.82,8,8],[1,8,8]]){const a=transportParticles(p);assert.equal(a.filter(x=>x.side==='left').length,left);assert.equal(a.filter(x=>x.side==='right').length,right);}
for(let i=1;i<6000;i++){const a=transportParticles((i-1)/6000),b=transportParticles(i/6000);for(let j=0;j<16;j++)assert.ok(Math.hypot(a[j].x-b[j].x,a[j].y-b[j].y)<4,'no particle teleport');}
assert.notDeepEqual(transportParticles(.84),transportParticles(.99),'equilibrium remains dynamic');
assert.equal((cellDiagram('enzyme',1).match(/data-molecule="enzyme"/g)||[]).length,1);
console.log('PASS: conserved 16 ions, pore-only continuous transport, vesicle fusion before release, ATP binding cycle and reusable enzyme');
