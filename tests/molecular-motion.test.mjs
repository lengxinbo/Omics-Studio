import assert from 'node:assert/strict';
import {molecularLessons,molecularState,molecularDiagram} from '../dist/js/molecular-motion.js';
for(const [id,lesson] of Object.entries(molecularLessons)){
 for(let i=0;i<=1000;i++){const p=i/1000,svg=molecularDiagram(id,p);assert.ok(!/NaN|undefined|Infinity/.test(svg),`${id} ${p}`);assert.ok(svg.includes('<title>'));}
 for(let i=1;i<lesson.steps.length;i++){
  const left=molecularState(id,i/lesson.steps.length-1e-8),right=molecularState(id,i/lesson.steps.length);
  for(const k of Object.keys(left).filter(k=>!['phase','f'].includes(k)))assert.ok(Math.abs(left[k]-right[k])<.001,`${id} boundary ${i} ${k}`);
 }
}
assert.equal(molecularState('transcription',1/3).growth,0);
assert.equal(molecularState('transcription',.5).growth,3);
assert.equal(molecularState('transcription',2/3).growth,9);
assert.equal(molecularState('transcription',1).opening,0);
assert.match(molecularDiagram('transcription',1),/AUG CCU GAA/);
// Exactly one codon per translocation, and no translocation during peptide transfer.
assert.equal(molecularState('translation',3/8).pSite,235);
assert.equal(molecularState('translation',4/8).pSite,345);
assert.equal(molecularState('translation',6/8).pSite,345);
assert.equal(molecularState('translation',7/8).pSite,455);
for(const phase of [2,5])assert.equal(molecularState('translation',(phase+.1)/8).pSite,molecularState('translation',(phase+.9)/8).pSite);
const stop=molecularDiagram('translation',.98);
assert.equal((stop.match(/data-molecule="tRNA"/g)||[]).length,1);
assert.equal((stop.match(/data-molecule="release-factor"/g)||[]).length,1);
for(const aa of ['Met','Ala','Phe'])assert.equal((stop.match(new RegExp('>'+aa+'<','g'))||[]).length,1);
const release=molecularState('translation',(7+.7)/8);assert.equal(release.release,1);assert.equal(release.disassemble,0);
console.log('PASS: continuous phase boundaries, template direction, codon translocation and release before recycling');
