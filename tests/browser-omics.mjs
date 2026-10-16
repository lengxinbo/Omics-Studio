
import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {omicsEntries} from '../dist/js/omics-data.js';
const require=createRequire(process.env.PLAYWRIGHT_MODULE_ROOT||'C:/Users/lxb1214/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1050}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>window.__omics);
 await page.locator('[data-course="omics"]').click();
 await page.screenshot({path:'tests/omics-atlas-overview.png'});assert.equal(await page.locator('.atlas-groups button').count(),6);assert.equal(await page.locator('#topic-list [data-topic]').count(),46);
 assert.ok(await page.locator('.omics-canvas canvas').count());assert.equal(await page.evaluate(()=>__omics.getState().omics.model.type),'genomics');
 await page.locator('[data-part="2"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.model.part),2);
 const old=await page.evaluate(()=>__omics.getState().omics.model.position);await page.locator('[data-om="plus"]').click();assert.notDeepEqual(await page.evaluate(()=>__omics.getState().omics.model.position),old);
 const box=await page.locator('.omics-canvas').boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+100,box.y+box.height/2+20,{steps:6});await page.mouse.up();await page.locator('[data-om="reset"]').click();
 await page.locator('.omics-canvas').scrollIntoViewIfNeeded();await page.waitForTimeout(400);const beforePick=await page.evaluate(()=>__omics.getState().omics.model.part);const pick=await page.evaluate(()=>__omics.projectOmicsPart(0));const pickBox=await page.locator('.omics-canvas').boundingBox();await page.mouse.click(pickBox.x+pick.x,pickBox.y+pick.y);const afterPick=await page.evaluate(()=>__omics.getState().omics.model.part);assert.notEqual(afterPick,beforePick,'Direct mesh picking must update the explanation');
 await page.locator('#stage').scrollIntoViewIfNeeded();await page.screenshot({path:'tests/omics-desktop.png'});
 await page.locator('#compare-topic').selectOption('proteomics');assert.match(await page.locator('#comparison-result').textContent(),/DDA/);
 await page.locator('#compare-b').selectOption('1');assert.match(await page.locator('#comparison-result').textContent(),/DIA/);
 await page.locator('#omics-comparison').screenshot({path:'tests/omics-comparison.png'});
 await page.locator('[data-lab-tech="1"]').click();assert.equal(await page.locator('#omics-technique').inputValue(),'1');
 await page.locator('[data-lab="play"]').click();await page.waitForFunction(()=>__omics.getState().omics.progress>2);await page.locator('[data-lab="play"]').click();const paused=await page.evaluate(()=>__omics.getState().omics.progress);await page.waitForTimeout(150);assert.equal(await page.evaluate(()=>__omics.getState().omics.progress),paused);
 for(const id of ['sequence','chromatin','mass','community','single','spatial','contact','flux']){await page.locator('#omics-demo').selectOption(id);await page.locator('#omics-seek').fill('100');const first=await page.locator('.omics-demo-canvas').innerHTML();await page.locator('#omics-strategy').selectOption('1');assert.notEqual(await page.locator('.omics-demo-canvas').innerHTML(),first,id);assert.ok(!/NaN|undefined/.test(await page.locator('.omics-demo-canvas').innerHTML()));}
 await page.locator('#omics-demo').selectOption('mass');await page.locator('#omics-strategy').selectOption('1');await page.locator('#omics-seek').fill('60');await page.locator('#stage').screenshot({path:'tests/omics-lab.png'});
 for(const o of omicsEntries){await page.locator('#topic-list [data-topic="'+o.id+'"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics.model?.type),o.model,o.id);assert.equal(await page.locator('.technique-cards article').count(),o.techniques.length);assert.ok((await page.locator('#lesson-reader h2').textContent()).includes(o.name));}
 await page.locator('#topic-list [data-topic="glycomics"]').click();await page.locator('#stage').screenshot({path:'tests/omics-glycan-model.png'});await page.locator('.topnav [data-view="notes"]').click();assert.equal(await page.evaluate(()=>__omics.getState().omics),null);
 await page.locator('.topnav [data-view="explore"]').click();await page.locator('[data-course="cell"]').click();assert.ok(await page.locator('#canvas-host canvas').isVisible());assert.equal(await page.evaluate(()=>__omics.getState().omics),null);
 await page.locator('#search').fill('DIA');assert.ok(await page.locator('#search-results [data-jump="proteomics"]').count());await page.locator('#search-results [data-jump="proteomics"]').click();assert.match(await page.locator('#lesson-title').textContent(),/组学/);
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto('http://127.0.0.1:4173');await mobile.waitForFunction(()=>window.__omics);await mobile.locator('[data-course="omics"]').click();
 assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'Mobile atlas overflow');await mobile.locator('#stage').scrollIntoViewIfNeeded();await mobile.screenshot({path:'tests/omics-mobile.png'});
 await mobile.locator('.mode-tabs [data-mode="process"]').click();await mobile.locator('#omics-seek').fill('80');assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'Mobile lab overflow');
 await mobile.locator('#compare-topic').selectOption('spatial-omics');assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'Mobile comparison overflow');
 assert.deepEqual(errors,[]);await fs.writeFile('tests/omics-verification.json',JSON.stringify({date:new Date().toISOString(),status:'passed',directions:46,modelTypes:46,principleDemos:8,checks:['all 46 topics render model and techniques','3D zoom drag mesh picking','technique workflow and cross-topic comparison','8 simulations strategy differences','play pause seek','search and chapter navigation','390px mobile atlas lab comparison','no uncaught browser errors']},null,2));
 console.log('PASS: omics atlas, models, simulations, comparisons, navigation and mobile');
}finally{await browser.close();}
