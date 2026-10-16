import assert from 'node:assert/strict';
import {processState,processDiagram,processLessons} from '../dist/js/process-motion.js';
for(const [id,n] of [['replication',7],['splicing',6],['signaling',7]]){
 assert.equal(processLessons[id].steps.length,n);
 for(let i=0;i<=1000;i++){
  const s=processState(id,i/1000);assert.ok(!/NaN|undefined|Infinity/.test(processDiagram(id,i/1000)));
  if(id==='replication'){
   if(s.leading>170)assert.equal(s.primer,1);
   if(s.lag2<590)assert.equal(s.primer2,1);
   if(s.fill>0)assert.equal(s.remove,1);
   if(s.seal>0)assert.equal(s.fill,1);
  }else if(id==='splicing'){
   if(s.first>0)assert.equal(s.fold,1);
   if(s.second>0)assert.equal(s.first,1);
   if(s.join>0)assert.equal(s.second,1);
   if(s.release>0)assert.equal(s.join,1);
  }else{
   if(s.gtpIn>0)assert.equal(s.gdpOut,1);
   if(s.travel>0)assert.equal(s.gtpIn,1);
   if(s.make>0)assert.equal(s.travel,1);
   if(s.catRelease>0)assert.equal(s.campBind,1);
   if(s.phosphorylate>0)assert.equal(s.catRelease,1);
   if(s.returnG>0)assert.equal(s.hydrolyse,1);
  }
 }
}
const early=processState('replication',3.1/7),late=processState('replication',3.9/7);
assert.ok(late.leading>early.leading);assert.ok(late.lag1<early.lag1);
assert.equal(processState('replication',1).seal,1);
assert.equal(processState('splicing',4/6).join,0);
assert.equal(processState('splicing',4/6).first,1);
assert.equal(processState('signaling',1).clear,1);
assert.equal(processState('signaling',1).dephosphorylate,1);
console.log('PASS: primer before synthesis, removal before fill before ligation, ordered splice reactions, nucleotide exchange and signal shutdown');
