import assert from 'node:assert/strict';
import {readingLessons,readingSources} from '../dist/js/reading-data.js';
import {mean,boxStats,distributions,sampleRows,volcanoGenes,volcanoPass,heatRows,zscore,pcaData,cells,markerStats,spatialBins,enrichment} from '../dist/js/reading-lab.js';
import {questionBank,restoreAnswers} from '../dist/js/exercises.js';
import {byId,courses} from '../dist/js/content.js';
assert.equal(readingLessons.length,9);assert.equal(questionBank.filter(q=>q.courseId==='data').length,36);
for(const l of readingLessons){assert.ok(readingSources[l.source]);assert.equal(l.steps.length,4);assert.ok(byId[l.id].reading);assert.ok(courses.find(c=>c.id==='data').topics.includes(l.id));}
assert.equal(sampleRows(false).length,12);assert.equal(sampleRows(true).length,6);assert.equal(new Set(sampleRows(false).map(r=>r.donor)).size,6);
assert.equal(mean(distributions[0]),3);assert.equal(mean(distributions[1]),3);assert.equal(boxStats(distributions[1]).q1,0);assert.equal(boxStats(distributions[1]).q3,6);
assert.equal(volcanoGenes.filter(g=>volcanoPass(g,1,.05)).length,5);assert.ok(!volcanoPass(volcanoGenes[1],2,.05));
assert.ok(Math.abs(mean(zscore(heatRows[0])))<1e-10);assert.deepEqual(zscore(heatRows[3]),[0,0,0,0,0,0]);
for(const batch of [0,2,8]){const p=pcaData(batch);assert.ok(Math.abs(p.variance[0]+p.variance[1]-100)<1e-10);assert.ok(Math.abs(mean(p.rows.map(r=>r.x)))<1e-10);assert.ok(Math.abs(mean(p.rows.map(r=>r.x*r.y)))<1e-10);assert.ok(Math.abs(p.loading.reduce((s,v)=>s+v*v,0)-1)<1e-10);}
assert.equal(cells.length,36);assert.equal(markerStats(7).filter(r=>r.percent!==0).length,0);assert.deepEqual(markerStats(0).map(r=>r.avg),markerStats(5).map(r=>r.avg));
assert.equal(spatialBins().length,48);assert.equal(spatialBins(true).length,12);for(const gene of [0,1])assert.ok(Math.abs(mean(spatialBins(false,gene).map(r=>r.value))-mean(spatialBins(true,gene).map(r=>r.value)))<1e-10);
assert.ok(enrichment(0).es>0);assert.ok(enrichment(2).es<0);assert.ok(Math.abs(enrichment(1).es)<Math.abs(enrichment(0).es));for(const mode of [0,1,2])assert.ok(Math.abs(enrichment(mode).points.at(-1))<1e-10);
const restored=restoreAnswers({answers:{replicates:0,volcano:0,singlecell:0,spatial:0}});assert.equal(Object.keys(restored).length,4);for(const id of ['replicates','volcano','singlecell','spatial'])assert.equal(byId[id].answer,0);
console.log('PASS: 9 reading lessons, 36 exercises, sample units, thresholds, quartiles, Z scores, PCA, dot areas, spatial aggregation, ES and legacy compatibility');
