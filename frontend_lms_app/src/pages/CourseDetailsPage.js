import React from "react";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import LessonListItem from "../components/LessonListItem";
import Button from "../components/Button";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getCourseById, computeProgress } from "../js/courseService";
import { isLessonCompleted } from "../js/storage";

/** PUBLIC_INTERFACE
 * CourseDetailsPage - course overview with lesson list and progress
 */
export default function CourseDetailsPage(){
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = getCourseById(courseId);

  if(!course){
    return (
      <Layout title="Course Not Found">
        <p>We couldn't find that course. <Link to="/courses">Back to courses</Link></p>
      </Layout>
    );
  }

  const progress = computeProgress(course);

  return (
    <Layout title={course.title} subtitle={course.shortDescription}>
      <div className="card mb16">
        <div className="card-body">
          <img src={course.thumbnail} alt={`${course.title} thumbnail`} style={{width:"100%", borderRadius:10, marginBottom:12}}/>
          <div style={{minWidth:240}}>
            <ProgressBar value={progress}/>
            <div className="small mt8">Progress: {Math.round(progress)}%</div>
          </div>
          <div className="mt16">
            <Button onClick={()=>navigate(`/courses/${course.id}/quiz`)} ariaLabel="Start quiz">Start Quiz</Button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div style={{fontWeight:800, marginBottom:8}}>Lessons</div>
          {course.lessons.map((l, idx)=>(
            <LessonListItem
              key={l.id}
              lesson={l}
              index={idx}
              completed={isLessonCompleted(course.id, l.id)}
              onOpen={()=>navigate(`/courses/${course.id}/lessons/${l.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
