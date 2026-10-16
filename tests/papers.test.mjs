import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {papers,paperLessons,paperQuestions,paperTopics} from '../dist/js/papers-data.js';
import {questionsFor,restoreAnswers} from '../dist/js/exercises.js';
const manifest=JSON.parse(await fs.readFile(new URL('../dist/assets/papers/manifest.json',import.meta.url),'utf8'));
assert.equal(Object.keys(papers).length,2);assert.equal(paperLessons.length,6);assert.equal(manifest.length,6);
for(const l of paperLessons){
 assert.ok(papers[l.paperId]);assert.equal(l.steps.length,4);assert.equal(questionsFor(l.id).length,4);assert.equal(paperQuestions[l.id].length,3);
 const asset=manifest.find(x=>x.path===l.asset);assert.ok(asset);assert.equal(asset.figure,l.figure);assert.equal(asset.paper,l.paperId);assert.equal(asset.license,'CC BY 4.0');
 const data=await fs.readFile(new URL('../dist/'+asset.path,import.meta.url));assert.equal(createHash('sha256').update(data).digest('hex'),asset.sha256);assert.equal(data.length,asset.bytes);
 assert.match(asset.url,/^https:\/\/media\.springernature\.com\//);assert.equal(asset.articleUrl,papers[l.paperId].url);assert.equal(asset.authors,papers[l.paperId].authors);
 for(const s of l.steps){const [x,y,w,h]=s.focus;assert.ok(x>=0&&y>=0&&w>0&&h>0&&x+w<=1.001&&y+h<=1.001);assert.ok(s.panel.startsWith(String(l.figure)));assert.ok(s.body.length>75);}
 for(const q of questionsFor(l.id)){assert.ok(q.options[q.answer]);if(q.reasons)assert.equal(q.reasons.length,q.options.length);}
}
assert.equal(new Set(paperTopics.map(x=>x.id)).size,6);
const restored=restoreAnswers({answers:{singlecell:0,spatial:0},exerciseAnswers:{'paper-space:replicate':0}});assert.deepEqual(restored,{'singlecell:intro':0,'spatial:intro':0,'paper-space:replicate':0});
console.log('PASS: two sourced papers, six original image hashes/licenses, 24 exercises, guide bounds and legacy record compatibility');
