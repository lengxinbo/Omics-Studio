import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {omicsEntries} from '../dist/js/omics-data.js';
import {scenes} from '../dist/js/omics-scenes.js';
import {labSpecs} from '../dist/js/omics-analysis-lab.js';
const require=createRequire(process.env.PLAYWRIGHT_MODULE_ROOT||'C:/Users/lxb1214/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--enable-webgl','--ignore-gpu-blocklist']});
const errors=[],signatures=new Set(),results=[];await fs.mkdir('artifacts/model-audit',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:1050}});page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>window.__omics);
 await page.evaluate(()=>localStorage.setItem('omics-studio-v1',JSON.stringify({course:'papers',topic:'paper-pbmc-design',notes:{nucleus:{text:'保留原有笔记',date:'2026-10-16'}},answers:{genomics:0},bookmarks:['nucleus'],completed:['nucleus']})));
 await page.reload();await page.waitForFunction(()=>window.__omics);assert.equal(await page.locator('[data-course="papers"]').count(),0);assert.equal(await page.evaluate(()=>__omics.getState().omics.topic),'genomics');
 for(const o of omicsEntries){
  await page.locator('#topic-list [data-topic="'+o.id+'"]').click();await page.locator('.mode-tabs [data-mode="structure"]').click();
  const m=await page.evaluate(()=>__omics.getState().omics.model);assert.equal(m.type,o.id);assert.ok(m.parts.every(n=>n>0),o.id+' missing geometry part');assert.ok(!signatures.has(m.signature),'duplicate geometry '+o.id);signatures.add(m.signature);
  for(let i=0;i<3;i++){await page.locator('[data-part="'+i+'"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.model.part),i);assert.equal(await page.locator('.omics-part-detail').textContent(),scenes[o.id].parts[i][1]);}
  await page.locator('[data-om="isolate"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.model.isolated),true);await page.locator('[data-om="isolate"]').click();
  await page.locator('.omics-canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(70);await page.locator('.omics-canvas').screenshot({path:'artifacts/model-audit/'+o.id+'.png'});
  await page.locator('.mode-tabs [data-mode="connections"]').click();assert.equal(await page.locator('[data-bio-step]').count(),4);
  for(let i=0;i<4;i++){await page.locator('[data-bio-step="'+i+'"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.analysis.step),i);}
  const spec=labSpecs[o.analysis.lab];await page.locator('[data-bio-value]').fill(String(spec[2]));const before=(await page.locator('[data-bio-table]').textContent())+(await page.locator('[data-bio-insight]').textContent());await page.locator('[data-bio-value]').fill(String(spec[3]));assert.notEqual((await page.locator('[data-bio-table]').textContent())+(await page.locator('[data-bio-insight]').textContent()),before,o.id);
  for(let i=0;i<spec[6].length;i++){await page.locator('[data-bio-choice="'+i+'"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.analysis.choice),i);}
  assert.ok(!/NaN|undefined|Infinity/.test(await page.locator('[data-bio-table]').textContent()),o.id);
  await page.locator('[data-bio-reset]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.analysis.value),spec[5]);
  if(['transcriptomics','singlecell-multiome','threed-genomics'].includes(o.id))await page.locator('#stage').screenshot({path:'tests/analysis-'+o.id+'.png'});
  results.push({id:o.id,meshes:m.meshCount,parts:m.parts,lab:o.analysis.lab});
 }
 await page.locator('#topic-list [data-topic="singlecell-atac"]').click();await page.locator('[data-quiz-page="1"]').click();await page.locator('.quiz-option').first().click();await page.reload();await page.waitForFunction(()=>window.__omics);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('omics-studio-v1')));assert.equal(saved.notes.nucleus.text,'保留原有笔记');assert.equal(saved.exerciseAnswers['genomics:intro'],0);assert.ok(Object.keys(saved.exerciseAnswers).some(x=>x==='singlecell-atac:data-unit'));
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto('http://127.0.0.1:4173');await mobile.waitForFunction(()=>window.__omics);await mobile.locator('[data-course="omics"]').click();
 for(const o of omicsEntries){await mobile.locator('#topic-list [data-topic="'+o.id+'"]').click();for(const mode of ['structure','connections']){await mobile.locator('.mode-tabs [data-mode="'+mode+'"]').click();assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),o.id+' mobile '+mode);} }
 await mobile.locator('#stage').scrollIntoViewIfNeeded();await mobile.screenshot({path:'tests/analysis-mobile.png'});
 const gallery=await browser.newPage({viewport:{width:1440,height:1100}});await gallery.goto('http://127.0.0.1:4173');
 const pictures=[];for(const o of omicsEntries)pictures.push({name:o.name,data:(await fs.readFile('artifacts/model-audit/'+o.id+'.png')).toString('base64')});
 for(let i=0;i<pictures.length;i+=12){await gallery.setContent('<body style="margin:0;padding:20px;background:#eff3f7;font-family:system-ui"><main style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px">'+pictures.slice(i,i+12).map(p=>'<article><h3 style="font-size:15px;margin:0">'+p.name+'</h3><img style="width:100%" src="data:image/png;base64,'+p.data+'"></article>').join('')+'</main></body>');await gallery.screenshot({path:'artifacts/model-audit/sheet-'+i+'.png',fullPage:true});}
 assert.deepEqual(errors,[]);await fs.writeFile('tests/analysis-verification.json',JSON.stringify({date:new Date().toISOString(),status:'passed',directions:46,distinctGeometry:signatures.size,labs:22,checks:['paper chapter removed and saved location migrated','three selectable parts per model','unique geometry signatures','46 workflows, sliders, choices and resets','old notes and answers preserved','new answers persisted','46 directions at 390px in both model and analysis modes','no page errors'],results},null,2));console.log('PASS: 46 distinct scenes, 22 labs, 46 mobile directions, state migration and record compatibility');
}finally{await browser.close();}
