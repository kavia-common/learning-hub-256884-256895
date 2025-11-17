import React, { useMemo, useState } from "react";
import Layout from "../components/Layout";
import QuizQuestion from "../components/QuizQuestion";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCourseById } from "../js/courseService";
import { addQuizAttempt } from "../js/storage";

/** PUBLIC_INTERFACE
 * QuizPage - MCQ quiz and submission
 */
export default function QuizPage(){
  const { courseId } = useParams();
  const course = getCourseById(courseId);
  const navigate = useNavigate();
  const questions = useMemo(()=>course?.quiz || [], [course]);
  const [answers, setAnswers] = useState({}); // id -> index
  const [error, setError] = useState("");

  if(!course){
    return (
      <Layout title="Quiz Not Found">
        <p>We couldn't find this quiz. <Link to="/courses">Back to courses</Link></p>
      </Layout>
    );
  }

  const setAnswer = (qid, idx)=> setAnswers(prev=>({ ...prev, [qid]: idx }));

  const onSubmit = ()=>{
    if(Object.keys(answers).length < questions.length){
      setError("Please answer all questions before submitting.");
      return;
    }
    let score = 0;
    const detail = questions.map(q=>{
      const selectedIndex = answers[q.id];
      const correctIndex = q.correctIndex;
      if(selectedIndex === correctIndex) score += 1;
      return { questionId: q.id, selectedIndex, correctIndex, question: q.question, options: q.options };
    });
    const attempt = {
      courseId: course.id,
      score,
      total: questions.length,
      dateISO: new Date().toISOString(),
      answers: detail
    };
    addQuizAttempt(attempt);
    navigate("/results", { state: { latest: attempt } });
  };

  return (
    <Layout title={`${course.title} - Quiz`} subtitle={`Answer ${questions.length} questions`}>
      {error && <Card variant="colored"><div style={{color:"var(--color-error)"}}>{error}</div></Card>}
      {questions.map((q, idx)=>(
        <QuizQuestion key={q.id} question={q} name={`q-${q.id}`} value={answers[q.id]} onChange={(i)=>setAnswer(q.id, i)}/>
      ))}
      <div className="row" style={{justifyContent:"space-between"}}>
        <Link to={`/courses/${course.id}`} className="btn ghost">Back to Course</Link>
        <Button onClick={onSubmit} ariaLabel="Submit quiz">Submit Quiz</Button>
      </div>
    </Layout>
  );
}
