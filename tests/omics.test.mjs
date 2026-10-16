
import assert from 'node:assert/strict';
import {omicsEntries,omicsGroups,omicsReferences} from '../dist/js/omics-data.js';
import {byId,courses} from '../dist/js/content.js';
import {restoreAnswers,questionById} from '../dist/js/exercises.js';
assert.equal(omicsEntries.length,46);assert.equal(omicsGroups.length,6);
assert.equal(courses.find(c=>c.id==='omics').topics.length,46);
const models=new Set(),assays=new Set();
for(const o of omicsEntries){assert.ok(omicsGroups.some(g=>g[0]===o.group));models.add(o.model);assays.add(o.assay);assert.equal(o.research.length,3);assert.ok(o.summary.length>30);assert.ok(o.example.length>20);assert.ok(o.techniques.length>=2);for(const t of o.techniques)for(const key of ['name','principle','output','best','tradeoff'])assert.ok(t[key]?.length>3,o.id+' '+key);o.refs.forEach(id=>assert.ok(omicsReferences[id]?.url.startsWith('https://')));assert.ok(byId[o.id].omics);assert.ok(questionById[o.id+':intro']);}
assert.equal(models.size,46);assert.equal(assays.size,8);
const legacy=restoreAnswers({answers:{genomics:0,epigenomics:0,transcriptomics:0,proteomics:0,metabolomics:0}});
for(const [id,a] of Object.entries(legacy))assert.equal(a,questionById[id].answer,'Legacy correct answer changed');
console.log('PASS: 46 directions, 6 groups, 46 models, 8 simulations; technique schema and legacy quiz semantics verified');
