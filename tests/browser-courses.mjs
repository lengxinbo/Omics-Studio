
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const require=createRequire(process.env.PLAYWRIGHT_MODULE_ROOT||'C:/Users/lxb1214/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/');
const {chromium}=require('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',args:['--enable-webgl','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:4173');await page.waitForFunction(()=>window.__omics);
 assert.match(await page.locator('#lesson-reader h2').textContent(),/细胞是什么/);
 await page.evaluate(()=>localStorage.setItem('omics-studio-v1',JSON.stringify({course:'cell',topic:'nucleus',answers:{nucleus:0},notes:{nucleus:{text:'我的旧笔记',date:'2026-10-15'}},completed:['nucleus'],bookmarks:['nucleus']})));
 await page.reload();await page.waitForFunction(()=>window.__omics);
 assert.match(await page.locator('.quiz-feedback').textContent(),/回答正确/);
 await page.locator('[data-quiz-page="1"]').click();assert.equal(await page.locator('.quiz-option').count(),3);
 await page.locator('.quiz-option').last().click();await page.locator('.quiz-hint summary').click();
 var saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('omics-studio-v1')));
 assert.equal(saved.notes.nucleus.text,'我的旧笔记');assert.ok(saved.completed.includes('nucleus'));assert.equal(saved.exerciseAnswers['nucleus:intro'],0);
 await page.locator('[data-mode="process"]').click();assert.ok(await page.locator('.process-canvas svg').count());
 await page.locator('[data-anim="play"]').click();await page.waitForFunction(()=>__omics.getState().animation.progress>.03);
 await page.locator('[data-anim="play"]').click();var paused=await page.evaluate(()=>__omics.getState().animation.progress);
 await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>__omics.getState().animation.progress),paused);
 await page.locator('#animation-seek').fill('800');assert.match(await page.locator('.animation-step').textContent(),/4/);
 await page.locator('[data-anim="reset"]').click();assert.equal(await page.evaluate(()=>__omics.getState().animation.progress),0);
 await page.locator('#animation-speed').selectOption('1.5');assert.equal(await page.evaluate(()=>__omics.getState().animation.speed),1.5);
 await page.locator('#animation-select').selectOption('secretion');assert.equal(await page.locator('#detail-panel h2').textContent(),'高尔基体');
 await page.screenshot({path:'tests/course-animations-desktop.png'});
 await page.locator('[data-mode="structure"]').click();assert.equal(await page.evaluate(()=>__omics.getState().animation),null);
 var before=await page.evaluate(()=>__omics.getState().viewer);await page.locator('#zoom-in').click();await page.waitForTimeout(300);var after=await page.evaluate(()=>__omics.getState().viewer);assert.notDeepEqual(before,after);
 await page.locator('#toggle-labels').click();var point=await page.evaluate(()=>__omics.projectTopic('nucleus'));var box=await page.locator('#canvas-host').boundingBox();await page.mouse.click(box.x+point.x,box.y+point.y);assert.equal(await page.locator('#detail-panel h2').textContent(),'细胞核');
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);var rotation=await page.evaluate(()=>__omics.getState().viewer);await page.mouse.down();await page.mouse.move(box.x+box.width/2+90,box.y+box.height/2+30,{steps:8});await page.mouse.up();await page.waitForTimeout(200);assert.notDeepEqual(await page.evaluate(()=>__omics.getState().viewer),rotation);
 await page.locator('[data-course="expression"]').click();await page.locator('[data-mode="process"]').click();
 for(const id of ['replication','transcription','splicing','translation','signaling']){await page.locator('#animation-select').selectOption(id);await page.locator('#animation-seek').fill('780');assert.match(await page.locator('.animation-step').textContent(),/4/);}
 await page.locator('#animation-select').selectOption('translation');await page.locator('#animation-seek').fill('610');await page.screenshot({path:'tests/translation-desktop.png'});
 await page.locator('.topnav [data-view="review"]').click();assert.equal(await page.locator('.review-card').count(),272);
 await page.locator('#review-course').selectOption('cell');assert.equal(await page.locator('.review-card').count(),27);
 await page.locator('[data-filter="wrong"]').click();assert.ok(await page.locator('.review-card').count()>=1);
 await page.locator('[data-filter="all"]').click();await page.locator('.topnav [data-view="explore"]').click();
 await page.locator('[data-mode="structure"]').click();await page.locator('#lesson-reader').screenshot({path:'tests/lesson-reader-desktop.png'});
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});mobile.on('pageerror',e=>errors.push(e.message));
 await mobile.goto('http://127.0.0.1:4173');await mobile.waitForFunction(()=>window.__omics);
 for(const view of ['structure','process']){await mobile.locator('[data-mode="'+view+'"]').click();assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'mobile overflow '+view);}
 await mobile.locator('#stage').scrollIntoViewIfNeeded();await mobile.screenshot({path:'tests/course-animations-mobile.png'});
 await mobile.locator('.topnav [data-view="review"]').click();assert.ok(await mobile.evaluate(()=>document.documentElement.scrollWidth<=390),'review mobile overflow');
 
 await page.locator('[data-course="molecules"]').click();await page.locator('[data-mode="process"]').click();
 for(const id of ['atp','enzyme']){await page.locator('#animation-select').selectOption(id);await page.locator('[data-anim="next"]').click();assert.match(await page.locator('.animation-step').textContent(),/2/);await page.locator('[data-anim="prev"]').click();assert.match(await page.locator('.animation-step').textContent(),/1/);}
 const sheet=await browser.newPage({viewport:{width:1500,height:1500}});
 await sheet.goto('http://127.0.0.1:4173');await sheet.waitForFunction(()=>window.__omics);
 await sheet.evaluate(async()=>{const {animations,diagram}=await import('./js/animations.js');document.body.innerHTML='<main style="padding:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">'+animations.map(a=>'<article style="background:white;padding:16px;border-radius:12px"><h2 style="font-size:18px">'+a.title+'</h2>'+diagram(a.id,.65)+'</article>').join('')+'</main>';});
 await sheet.screenshot({path:'tests/process-overview.png'});
 assert.deepEqual(errors,[]);

 await fs.writeFile('tests/course-verification.json',JSON.stringify({date:new Date().toISOString(),status:'passed',concepts:85,detailedLessons:22,questions:272,animations:9,checks:['legacy records preserved','question paging and feedback','review chapter filtering','animation play pause seek speed reset','animation topic alignment','3D mesh picking rotation zoom','390px mobile overflow','no browser errors']},null,2));
 console.log('PASS: browser course interactions, migration, animations, 3D regression and mobile layout');
} finally {await browser.close();}
