import coursesData from "../data/courses.json";
import { getCourseProgress } from "./storage";

/** PUBLIC_INTERFACE
 * Load all courses
 * @returns {Array<any>}
 */
export function getAllCourses(){
  return coursesData.courses;
}

/** PUBLIC_INTERFACE
 * Find course by id
 * @param {string} courseId
 */
export function getCourseById(courseId){
  return coursesData.courses.find(c=>String(c.id)===String(courseId)) || null;
}

/** PUBLIC_INTERFACE
 * Get lesson by id within a course
 * @param {any} course
 * @param {string} lessonId
 */
export function getLesson(course, lessonId){
  if(!course) return null;
  return course.lessons.find(l=>String(l.id)===String(lessonId)) || null;
}

/** PUBLIC_INTERFACE
 * Compute course progress value from storage
 * @param {any} course
 */
export function computeProgress(course){
  return getCourseProgress(String(course.id), course.totalLessons || (course.lessons?.length || 0));
}

/** PUBLIC_INTERFACE
 * Next/prev lesson helpers
 * @param {any} course
 * @param {string} lessonId
 */
export function getLessonIndex(course, lessonId){
  return Math.max(0, course.lessons.findIndex(l => String(l.id) === String(lessonId)));
}
export function getNextLesson(course, lessonId){
  const idx = getLessonIndex(course, lessonId);
  return course.lessons[idx+1] || null;
}
export function getPrevLesson(course, lessonId){
  const idx = getLessonIndex(course, lessonId);
  return course.lessons[idx-1] || null;
}
