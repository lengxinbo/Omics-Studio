
import assert from 'node:assert/strict';
import {topics,courses,sources,byId} from '../dist/js/content.js';
import {lessons} from '../dist/js/foundations.js';
import {questionBank,restoreAnswers,exerciseStats} from '../dist/js/exercises.js';
import {animations,diagram} from '../dist/js/animations.js';
assert.equal(topics.length,85);assert.equal(Object.keys(lessons).length,22);assert.equal(questionBank.length,272);
assert.equal(new Set(topics.map(t=>t.id)).size,topics.length);
assert.equal(new Set(questionBank.map(q=>q.id)).size,questionBank.length);
for(const t of topics){assert.ok(sources[t.source],t.id);assert.equal(courses.filter(c=>c.topics.includes(t.id)).length,1);t.links.forEach(id=>assert.ok(byId[id],id));}
for(const q of questionBank){assert.ok(q.options[q.answer],q.id);if(q.reasons)assert.equal(q.reasons.length,q.options.length);}
const migrated=restoreAnswers({answers:{nucleus:1,invalid:0,dna:100},exerciseAnswers:{'nucleus:intro':0,'dna:intro':0,'bad':1}});
assert.equal(migrated['nucleus:intro'],0);assert.equal(migrated['dna:intro'],0);assert.equal(Object.keys(migrated).length,2);
assert.equal(exerciseStats({}).answered,0);
for(const a of animations){assert.equal(a.steps.length,({transcription:6,translation:8,replication:7,splicing:6,signaling:7,transport:6,secretion:7,atp:6,enzyme:6})[a.id]||4);for(const [course,topic] of Object.entries(a.focus))assert.ok(courses.find(c=>c.id===course).topics.includes(topic));for(const p of [0,.125,.25,.5,.75,.999,1]){const svg=diagram(a.id,p);assert.ok(svg.startsWith('<svg'));assert.ok(!/NaN|undefined/.test(svg),a.id);}}
console.log('PASS: 85 concepts, 22 foundation lessons, 272 questions, 9 animations, legacy migration and content integrity');
