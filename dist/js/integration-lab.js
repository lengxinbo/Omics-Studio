export function correlation(x,y){const mx=x.reduce((a,b)=>a+b,0)/x.length,my=y.reduce((a,b)=>a+b,0)/y.length;const dx=x.map(v=>v-mx),dy=y.map(v=>v-my);const denom=Math.sqrt(dx.reduce((s,v)=>s+v*v,0)*dy.reduce((s,v)=>s+v*v,0));return denom?dx.reduce((s,v,i)=>s+v*dy[i],0)/denom:null;}
export function pairedRows(aligned=true){const values=[1,2,3,4,5,6],order=aligned?[0,1,2,3,4,5]:[4,0,5,1,3,2];return values.map((v,i)=>({id:String.fromCharCode(65+i),other:String.fromCharCode(65+order[i]),x:v,y:values[order[i]]}));}
export function timeValues(time,lag){return {rna:1+3*(1-Math.exp(-time/3)),protein:1+3*(1-Math.exp(-Math.max(0,time-lag)/7))};}
export function regulationRows(within=false){return [0,1].flatMap(g=>[1,2,3,4].map((v,i)=>({id:`${g?'B':'A'}${i+1}`,group:g,x:v+g*6,y:[2,4,1,3][i]+g*6}))).filter(r=>!within||r.group===0);}
export const immuneCells=[{id:'C1',rna:.9,protein:.85},{id:'C2',rna:.2,protein:.9},{id:'C3',rna:.75,protein:.2},{id:'C4',rna:.15,protein:.1}];
export const immuneScore=(cell,w)=>cell.rna*w+cell.protein*(1-w);
export const composition=b=>({a:20,b,total:20+b,percent:20/(20+b)*100});
export function validationRows(grouped){return ['A','B','C','D'].flatMap((donor,i)=>[1,2].map(t=>({donor,time:t,split:grouped?(i<2?'训练':'测试'):(t===1?'训练':'测试')})));}
export const overlapCount=rows=>[...new Set(rows.map(r=>r.donor))].filter(d=>rows.some(r=>r.donor===d&&r.split==='训练')&&rows.some(r=>r.donor===d&&r.split==='测试')).length;
export const batchEffects=(balanced,batch)=>({observed:balanced?2:2+batch,biological:2,batch,identifiable:balanced});
