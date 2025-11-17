const KEYS = {
  USER: "lms_user",
  COMPLETED: "lms_completed_lessons", // { [courseId]: { [lessonId]: true } }
  LAST_LESSON: "lms_last_lesson", // { [courseId]: { lessonId, dateISO } }
  QUIZ_HISTORY: "lms_quiz_history" // Array of attempts
};

/** PUBLIC_INTERFACE
 * Get mock user from localStorage
 * @returns {{id:string, name:string, email:string}|null}
 */
export function getUser(){
  try {
    const txt = localStorage.getItem(KEYS.USER);
    return txt ? JSON.parse(txt) : null;
  } catch { return null; }
}

/** PUBLIC_INTERFACE
 * Save mock user
 * @param {{id:string, name:string, email:string}} user
 */
export function setUser(user){
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

/** PUBLIC_INTERFACE
 * Remove user (sign out)
 */
export function signOut(){
  localStorage.removeItem(KEYS.USER);
}

/** PUBLIC_INTERFACE
 * Mark a lesson as completed
 * @param {string} courseId
 * @param {string} lessonId
 */
export function completeLesson(courseId, lessonId){
  const map = getCompletedMap();
  if(!map[courseId]) map[courseId] = {};
  map[courseId][lessonId] = true;
  localStorage.setItem(KEYS.COMPLETED, JSON.stringify(map));
}

/** PUBLIC_INTERFACE
 * Check if lesson completed
 * @param {string} courseId
 * @param {string} lessonId
 */
export function isLessonCompleted(courseId, lessonId){
  const map = getCompletedMap();
  return !!(map[courseId] && map[courseId][lessonId]);
}

function getCompletedMap(){
  try{
    const raw = localStorage.getItem(KEYS.COMPLETED);
    return raw ? JSON.parse(raw) : {};
  }catch{ return {}; }
}

/** PUBLIC_INTERFACE
 * Get course progress in percentage
 * @param {string} courseId
 * @param {number} totalLessons
 * @returns {number}
 */
export function getCourseProgress(courseId, totalLessons){
  const map = getCompletedMap();
  const course = map[courseId] || {};
  const completed = Object.values(course).filter(Boolean).length;
  if(totalLessons<=0) return 0;
  return (completed/totalLessons)*100;
}

/** PUBLIC_INTERFACE
 * Save last accessed lesson
 * @param {string} courseId
 * @param {string} lessonId
 */
export function saveLastLesson(courseId, lessonId){
  const store = getLastLessonMap();
  store[courseId] = { lessonId, dateISO: new Date().toISOString() };
  localStorage.setItem(KEYS.LAST_LESSON, JSON.stringify(store));
}

/** PUBLIC_INTERFACE
 * Get last accessed lesson
 * @param {string} courseId
 * @returns {{lessonId:string, dateISO:string}|null}
 */
export function getLastLesson(courseId){
  const store = getLastLessonMap();
  return store[courseId] || null;
}

function getLastLessonMap(){
  try{
    const raw = localStorage.getItem(KEYS.LAST_LESSON);
    return raw ? JSON.parse(raw) : {};
  }catch{ return {}; }
}

/** PUBLIC_INTERFACE
 * Append quiz attempt to history
 * @param {{courseId:string, score:number, total:number, dateISO:string, answers:Array<{questionId:string, selectedIndex:number, correctIndex:number}>}} attempt
 */
export function addQuizAttempt(attempt){
  const list = getQuizHistory();
  list.push(attempt);
  localStorage.setItem(KEYS.QUIZ_HISTORY, JSON.stringify(list));
}

/** PUBLIC_INTERFACE
 * Get quiz history list
 * @returns {Array<any>}
 */
export function getQuizHistory(){
  try{
    const raw = localStorage.getItem(KEYS.QUIZ_HISTORY);
    return raw ? JSON.parse(raw) : [];
  }catch{ return []; }
}
