import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import ScoreSummary from "../components/ScoreSummary";
import Card from "../components/Card";
import { getQuizHistory } from "../js/storage";
import { useLocation } from "react-router-dom";
import { getCourseById } from "../js/courseService";

/** PUBLIC_INTERFACE
 * ResultsPage - latest attempt details and history list
 */
export default function ResultsPage(){
  const location = useLocation();
  const latest = location.state?.latest || null;
  const history = getQuizHistory().slice().reverse(); // newest first
  const [expanded, setExpanded] = useState(null);

  const recent = useMemo(()=> latest || history[0] || null, [latest, history]);
  const courseName = recent ? (getCourseById(recent.courseId)?.title || recent.courseId) : null;

  return (
    <Layout title="Results" subtitle="Review your quiz performance">
      {recent ? (
        <>
          <ScoreSummary score={recent.score} total={recent.total}/>
          <Card title={`Latest Attempt - ${courseName}`} subtitle={new Date(recent.dateISO).toLocaleString()} className="mt16">
            <ol className="m0">
              {recent.answers.map((a, idx)=>{
                const correct = a.selectedIndex === a.correctIndex;
                return (
                  <li key={idx} className="mb12">
                    <div style={{fontWeight:700}}>{a.question}</div>
                    <div className="small">
                      Your answer: {a.options[a.selectedIndex]} {correct ? "✓" : "✗"}
                    </div>
                    {!correct && <div className="small" style={{color:"var(--color-primary)"}}>Correct: {a.options[a.correctIndex]}</div>}
                  </li>
                );
              })}
            </ol>
          </Card>
        </>
      ) : (
        <Card><div>No attempts yet. Take a quiz to see results.</div></Card>
      )}

      <h2 className="heading mt24">History</h2>
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Course</th><th>Score</th><th>Date</th><th>Action</th></tr>
          </thead>
          <tbody>
            {history.map((h, idx)=>{
              const cname = getCourseById(h.courseId)?.title || h.courseId;
              return (
                <tr key={idx}>
                  <td>{cname}</td>
                  <td>{h.score} / {h.total}</td>
                  <td>{new Date(h.dateISO).toLocaleString()}</td>
                  <td>
                    <button className="btn ghost" onClick={()=>setExpanded(expanded===idx?null:idx)} aria-label="View details">
                      {expanded===idx ? "Hide" : "View"} details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {history.map((h, idx)=> expanded===idx ? (
        <Card key={`d-${idx}`} title="Attempt details" subtitle={new Date(h.dateISO).toLocaleString()} className="mt16">
          <ol className="m0">
            {h.answers.map((a, i)=>{
              const correct = a.selectedIndex === a.correctIndex;
              return (
                <li key={i} className="mb12">
                  <div style={{fontWeight:700}}>{a.question}</div>
                  <div className="small">
                    Your answer: {a.options[a.selectedIndex]} {correct ? "✓" : "✗"}
                  </div>
                  {!correct && <div className="small" style={{color:"var(--color-primary)"}}>Correct: {a.options[a.correctIndex]}</div>}
                </li>
              );
            })}
          </ol>
        </Card>
      ) : null)}
    </Layout>
  );
}
