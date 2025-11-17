import React from "react";

/** PUBLIC_INTERFACE
 * QuizQuestion renders MCQ with 4 options.
 * @param {{question: {id:string, question:string, options:string[]}, name:string, value?:number, onChange:(idx:number)=>void}} props
 */
export default function QuizQuestion({ question, name, value, onChange }) {
  return (
    <div className="card mb16">
      <div className="card-body">
        <div style={{fontWeight:700, marginBottom:8}}>{question.question}</div>
        <div role="radiogroup" aria-label={question.question}>
          {question.options.map((opt, idx)=>(
            <label key={idx} className="row" style={{gap:10, marginBottom:8, alignItems:"flex-start"}}>
              <input
                type="radio"
                name={name}
                value={idx}
                checked={value===idx}
                onChange={()=>onChange(idx)}
                aria-label={opt}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
