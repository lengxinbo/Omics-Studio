import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const require=createRequire(process.env.PLAYWRIGHT_MODULE_ROOT||'C:/Users/lxb1214/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>window.__omics);
 await page.locator('[data-course="cell"]').click();await page.locator('[data-mode="process"]').click();
 for(const [id,n] of [['transport',6],['secretion',7],['atp',6],['enzyme',6]]){
  await page.locator('[data-course="'+(id==='enzyme'?'molecules':'cell')+'"]').click();await page.locator('[data-mode="process"]').click();await page.locator('#animation-select').selectOption(id);assert.equal(await page.locator('[data-chapter]').count(),n);
  for(let i=0;i<n;i++){await page.locator(`[data-chapter="${i}"]`).click();assert.equal(await page.locator('.animation-step').textContent(),`步骤 ${i+1} / ${n}`);assert.ok((await page.locator('.animation-look').textContent()).length>20);}
  await page.locator('[data-chapter="1"]').click();await page.locator('#animation-speed').selectOption('1.5');
  await page.locator('[data-anim="step"]').click();await page.waitForFunction(()=>!__omics.getState().animation.playing,{},{timeout:10000});
  const a=await page.evaluate(()=>__omics.getState().animation);assert.equal(a.step,2);assert.ok(a.progress>1/n&&a.progress<2/n);
  const frozen=await page.locator('.process-canvas').innerHTML();await page.waitForTimeout(250);assert.equal(await page.locator('.process-canvas').innerHTML(),frozen);
  await page.locator('[data-anim="play"]').click();await page.waitForFunction(()=>__omics.getState().animation.step===3);
  await page.locator('[data-anim="play"]').click();const pause=await page.evaluate(()=>__omics.getState().animation.progress);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>__omics.getState().animation.progress),pause);
  await page.locator('#animation-seek').fill('550');await page.locator('#stage').screenshot({path:`tests/cell-${id}-desktop.png`});
  await page.locator('#animation-seek').fill('1000');assert.ok(await page.locator('[data-anim="next"]').isDisabled());
  await page.locator('[data-anim="reset"]').click();assert.equal(await page.evaluate(()=>__omics.getState().animation.progress),0);
 }
 // Inspect every phase at an intermediate time and retain one sheet per process.
 const sheet=await browser.newPage({viewport:{width:1640,height:1100}});
 for(const id of ['transport','secretion','atp','enzyme']){
  await sheet.goto('http://127.0.0.1:4173');
  await sheet.evaluate(async id=>{const {cellLessons,cellDiagram}=await import('./js/cell-motion.js');const a=cellLessons[id];document.body.innerHTML='<main style="background:#eef4f8;padding:20px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px">'+a.steps.map((s,i)=>`<article style="padding:15px;background:white;border-radius:14px"><h2 style="font-size:18px">${i+1} · ${s.title}</h2>${cellDiagram(id,(i+.75)/a.steps.length)}</article>`).join('')+'</main>';},id);
  await sheet.screenshot({path:`tests/cell-${id}-storyboard.png`,fullPage:true});
 }
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto('http://127.0.0.1:4173');await mobile.waitForFunction(()=>window.__omics);
 await mobile.locator('[data-course="cell"]').click();await mobile.locator('[data-mode="process"]').click();await mobile.locator('#animation-select').selectOption('atp');
 await mobile.locator('[data-chapter="4"]').click();await mobile.locator('#animation-seek').fill('620');
 for(const zoom of [true,false]){await mobile.locator('[data-anim="zoom"]').click();assert.equal(await mobile.locator('[data-anim="zoom"]').getAttribute('aria-pressed'),String(zoom));assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'mobile document overflow');}
 for(const id of ['transport','secretion','atp','enzyme']){await mobile.locator('[data-course="'+(id==='enzyme'?'molecules':'cell')+'"]').click();await mobile.locator('[data-mode="process"]').click();await mobile.locator('#animation-select').selectOption(id);await mobile.locator('#animation-seek').fill('680');assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),id+' mobile overflow');await mobile.locator('#stage').screenshot({path:`tests/cell-${id}-mobile.png`});}
 await mobile.locator('#stage').screenshot({path:'tests/cell-motion-mobile.png'});
 await mobile.locator('[data-chapter="5"]').focus();await mobile.keyboard.press('Enter');assert.match(await mobile.locator('.animation-step').textContent(),/6 \/ 6/);
 assert.deepEqual(errors,[]);
 await fs.writeFile('tests/cell-motion-verification.json',JSON.stringify({date:new Date().toISOString(),status:'passed',transportSteps:6,secretionSteps:7,atpSteps:6,enzymeSteps:6,checks:['all 25 phase captions','play current step and stop before next','continuous play resumes','pause freezes actual SVG','timeline and replay','keyboard chapter selection','390px layout and detail zoom','reduced motion manual playback','no page errors']},null,2));
 console.log('PASS: transport, secretion, ATP and enzyme step playback, scrubbing, freeze, keyboard, zoom and mobile');
}finally{await browser.close();}
