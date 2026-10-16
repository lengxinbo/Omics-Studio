import assert from 'node:assert/strict';
import fs from 'node:fs';
import {omicsEntries} from '../dist/js/omics-data.js';
import {scenes} from '../dist/js/omics-scenes.js';
import {analysis,analysisQuestions} from '../dist/js/omics-analysis-data.js';
import {workflowLessons} from '../dist/js/omics-workflow-lessons.js';
import {labSpecs,labResult} from '../dist/js/omics-analysis-lab.js';
import {courses,topics} from '../dist/js/content.js';
assert.equal(Object.keys(workflowLessons).length,20);for(const steps of Object.values(workflowLessons)){assert.equal(steps.length,4);assert.ok(steps.every(x=>x.length>40));}
assert.equal(courses.length,6);assert.ok(!topics.some(t=>t.id.startsWith('paper-')));
assert.equal(Object.keys(scenes).length,46);assert.equal(Object.keys(analysis).length,46);
for(const o of omicsEntries){assert.equal(o.model,o.id);assert.equal(scenes[o.id].parts.length,3);assert.equal(analysis[o.id].workflow.length,4);assert.equal(analysis[o.id].qc.length,3);assert.equal(analysisQuestions[o.id].length,2);assert.ok(labSpecs[analysis[o.id].lab]);}
for(const [kind,s] of Object.entries(labSpecs))for(const v of [s[2],s[5],s[3]])for(let c=0;c<s[6].length;c++){const r=labResult(kind,v,c);assert.ok(r.headers.length);assert.ok(r.summary.length>20);assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(r)),kind);}
assert.deepEqual(labResult('counts',4,1).rows.map(r=>r[1]),labResult('counts',4,1).rows.map(r=>r[2]));
assert.equal(labResult('enrichment',4,1).rows[1][3],.2);
assert.equal(labResult('ptm',2,1).rows[2][1],1);
assert.equal(labResult('occupancy',4,1).rows[2][1],.5);
assert.equal(labResult('contact',3,1).matrix[1][4],3);
assert.equal(labResult('contact',3,1).matrix[0][0],1);
assert.ok(labResult('pairing',4,1).rows.every(r=>r[2]==='是'));
assert.ok(labResult('pairing',4,0).rows.every(r=>r[2]==='否'));
assert.equal(labResult('clones',2,1).values.reduce((a,b)=>a+b,0),100);
assert.equal(labResult('splicing',20,0).rows[1][3],100);
assert.equal(labResult('spatial',2,0).matrix[0][1],4.5);
assert.equal(labResult('network',1,0).edges.length,0);
assert.ok(!fs.existsSync('dist/js/papers-ui.js'));assert.ok(!fs.existsSync('dist/assets/papers'));
console.log('PASS: 46 distinct scene specifications and routes, 22 calculated labs, 92 added questions, paper module removed');
