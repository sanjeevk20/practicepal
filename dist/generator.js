// Worksheet formats. All inserted text is escaped by the preview renderer.
function shuffled(values){return values.map(value=>({value,order:Math.random()})).sort((a,b)=>a.order-b.order).map(x=>x.value)}
function mathFact(w,i){
 const g=w.grade,level=$('createLevel').value,offset=level==='Challenge'?12:level==='Medium'?6:0;
 const a=(i%10)+1,b=Math.floor(i/10)+1;
 if(g<=2){const x=a+(g===2?10:0)+offset,y=b;return {q:`${x} + ${y} = ____`,a:String(x+y),numeric:x+y,expression:`${x} + ${y}`}}
 if(g===3){const x=a+1+offset,y=b+1;return {q:`${x} × ${y} = ____`,a:String(x*y),numeric:x*y,expression:`${x} × ${y}`}}
 if(g===4){const n=i+12+offset;return {q:`List all the factors of ${n}.`,a:Array.from({length:n},(_,j)=>j+1).filter(k=>n%k===0).join(', ')}}
 if(g===5){const d=i+4+offset,n=i+2;return {q:`Add: ${n}/${d} + 1/${d} = ____`,a:`${n+1}/${d}`}}
 if(g===6){const x=i+3+offset,y=2*i+1;return {q:`Calculate: −${x} + ${y} = ____`,a:String(y-x),numeric:y-x,expression:`−${x} + ${y}`}}
 const coefficient=g===7?2+(i%4):3+(i%6),x=i+2+offset,k=i%9+1;
 return {q:`Solve for x: ${coefficient}x + ${k} = ${coefficient*x+k}.`,a:`x = ${x}`,numeric:x,expression:`${coefficient}x + ${k} = ${coefficient*x+k}`};
}
function optionsFor(fact,pool){
 let wrong=shuffled([...new Set(pool.map(x=>x.a))].filter(x=>x!==fact.a)).slice(0,3);
 if(Number.isFinite(fact.numeric))wrong=[fact.numeric+1,fact.numeric-1,fact.numeric+2].map(n=>fact.a.startsWith('x =')?`x = ${n}`:String(n));
 // Short source banks always contain at least four distinct answers.
 const opts=shuffled([fact.a,...wrong]);return {options:opts.map((s,i)=>`${String.fromCharCode(65+i)}. ${s}`),answer:`${String.fromCharCode(65+opts.indexOf(fact.a))}. ${fact.a}`};
}
function generateQuestions(w,count,format){
 const pool=w.subject==='Mathematics'?Array.from({length:count+4},(_,i)=>mathFact(w,i)):shuffled(w.items);
 const formats=['objective','blank','matching','critical'];
 return Array.from({length:count},(_,i)=>{
  const fact=pool[i%pool.length],kind=format==='mixed'?formats[i%4]:format;
  if(kind==='objective'){const o=optionsFor(fact,pool);return {q:`Choose the correct answer. ${fact.q}`,options:o.options,a:o.answer}}
  if(kind==='blank')return {q:fact.q.includes('____')?fact.q:`${fact.q}\nAnswer: ____________________`,a:fact.a};
  if(kind==='matching'){
   const chosen=[fact,...shuffled(pool.filter(x=>x.q!==fact.q))].slice(0,3),answers=shuffled(chosen.map((x,j)=>({text:x.a,index:j})));
   return {q:'Match each item in Column A to its answer in Column B. Write the matching letters.',options:['COLUMN A',...chosen.map((x,j)=>`${j+1}) ${x.q}`),'COLUMN B',...answers.map((x,j)=>`${String.fromCharCode(65+j)}) ${x.text}`)],a:chosen.map((x,j)=>`${j+1}–${String.fromCharCode(65+answers.findIndex(y=>y.index===j))}`).join(', ')};
  }
  const distractor=optionsFor(fact,pool).options.map(x=>x.slice(3)).find(x=>x!==fact.a);
  const prompts=[`A learner gives this answer: “${distractor}”. Decide whether it is correct and explain your reasoning.`,`Explain your answer using a reason${w.grade<=2?' or a drawing':''}.`,`Give your answer, then describe how you could check it.`,`Write an answer and explain why one different answer would be incorrect.`];
  return {q:`${fact.q}\n${prompts[Math.floor(i/pool.length)%prompts.length]}`,a:`Suggested answer: ${fact.a}. ${w.subject==='Mathematics'?'Check calculations or factors and show the steps.':'Explain using the meaning, rule or relevant fact.'} ${w.grade<=2?'A suitable drawing or oral explanation is acceptable.':''}`};
 });
}
