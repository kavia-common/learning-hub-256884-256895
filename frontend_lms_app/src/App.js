import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/theme.css";
import "./index.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import LessonPage from "./pages/LessonPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import PrivateRoute from "./js/PrivateRoute";

/** PUBLIC_INTERFACE
 * App entry with routing
 */
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CoursesPage/></PrivateRoute>} />
        <Route path="/courses/:courseId" element={<PrivateRoute><CourseDetailsPage/></PrivateRoute>} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<PrivateRoute><LessonPage/></PrivateRoute>} />
        <Route path="/courses/:courseId/quiz" element={<PrivateRoute><QuizPage/></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><ResultsPage/></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
