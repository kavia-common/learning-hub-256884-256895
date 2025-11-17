import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import CourseCard from "../components/CourseCard";
import { getAllCourses } from "../js/courseService";
import { computeProgress } from "../js/courseService";
import { useNavigate } from "react-router-dom";

/** PUBLIC_INTERFACE
 * Dashboard showing welcome, progress summary, and quick links
 */
export default function DashboardPage(){
  const courses = getAllCourses();
  const navigate = useNavigate();
  const overall = Math.round(courses.reduce((acc,c)=> acc + computeProgress(c), 0) / courses.length);

  return (
    <Layout title="Dashboard" subtitle="Welcome back to Learning Hub">
      <div className="tinted mb16">
        <div className="card-body">
          <div className="row">
            <div>
              <div className="heading m0">Overview</div>
              <div className="small">Your learning at a glance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid cols-3">
        <Card variant="colored" title="Overall Progress" subtitle="Average across all courses">
          <div style={{fontSize:36, fontWeight:900}}>{overall}%</div>
          <div className="small">Keep going! You're doing great.</div>
        </Card>
        <Card variant="colored" title="Recent Activity" subtitle="Your latest learning">
          <ul className="m0">
            <li className="mb8">Visited your dashboard</li>
            <li className="mb8">Explored courses</li>
            <li className="mb8">Ready to start a quiz</li>
          </ul>
        </Card>
        <Card variant="colored" title="Tips" subtitle="Improve your retention">
          <ul className="m0">
            <li className="mb8">Space your learning over time</li>
            <li className="mb8">Practice with quizzes</li>
            <li className="mb8">Review key takeaways after each lesson</li>
          </ul>
        </Card>
      </div>

      <h2 className="heading mt24">Your Courses</h2>
      <div className="grid cols-3">
        {courses.map(c => (
          <CourseCard key={c.id} course={c} progress={computeProgress(c)} onOpen={()=>navigate(`/courses/${c.id}`)} />
        ))}
      </div>
    </Layout>
  );
}
