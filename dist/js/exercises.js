import {paperQuestions} from './papers-data.js';
import {readingQuestions} from './reading-data.js';
import {topics,courses} from './content.js';
import {extraQuestions} from './foundations.js';
import {integrationQuestions} from './integration-data.js';

export const questionBank=topics.flatMap(t=>{
 const courseId=courses.find(c=>c.topics.includes(t.id)).id;
 const common={topicId:t.id,courseId,name:t.name,en:t.en};
 const intro={...common,id:`${t.id}:intro`,question:t.question,options:t.options,answer:t.answer,explanation:t.explanation,level:'认识',hint:'先回看本知识点的三个要点，再区分题目中的对象和过程。'};
 return [intro,...(paperQuestions[t.id]||readingQuestions[t.id]||integrationQuestions[t.id]||extraQuestions[t.id]||[]).map(q=>({...common,...q,id:`${t.id}:${q.id}`,question:q.prompt,explanation:q.reasons[q.answer]}))];
});
export const questionById=Object.fromEntries(questionBank.map(q=>[q.id,q]));
export const questionsFor=id=>questionBank.filter(q=>q.topicId===id);

export function restoreAnswers(stored){
 const result={};
 for(const [topicId,value] of Object.entries(stored.answers||{})){
  const q=questionById[`${topicId}:intro`];
  if(q&&Number.isInteger(value)&&value>=0&&value<q.options.length)result[q.id]=value;
 }
 for(const [id,value] of Object.entries(stored.exerciseAnswers||{})){
  const q=questionById[id];
  if(q&&Number.isInteger(value)&&value>=0&&value<q.options.length)result[id]=value;
 }
 return result;
}
export function exerciseStats(answers,list=questionBank){
 const answered=list.filter(q=>answers[q.id]!==undefined);
 return {total:list.length,answered:answered.length,correct:answered.filter(q=>answers[q.id]===q.answer).length,wrong:answered.filter(q=>answers[q.id]!==q.answer).length};
}
export function answerFeedback(q,index){return `${index===q.answer?'✓ 回答正确。':'再想一想。'} ${q.reasons?.[index]||q.explanation}`;}
