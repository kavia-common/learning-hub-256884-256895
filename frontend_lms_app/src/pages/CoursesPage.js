import React from "react";
import Layout from "../components/Layout";
import CourseCard from "../components/CourseCard";
import { getAllCourses, computeProgress } from "../js/courseService";
import { useNavigate } from "react-router-dom";

/** PUBLIC_INTERFACE
 * CoursesPage - grid of all courses
 */
export default function CoursesPage(){
  const courses = getAllCourses();
  const navigate = useNavigate();
  return (
    <Layout title="Courses" subtitle="Browse available learning paths">
      <div className="grid cols-3">
        {courses.map(c=>(
          <CourseCard key={c.id} course={c} progress={computeProgress(c)} onOpen={()=>navigate(`/courses/${c.id}`)} />
        ))}
      </div>
    </Layout>
  );
}
