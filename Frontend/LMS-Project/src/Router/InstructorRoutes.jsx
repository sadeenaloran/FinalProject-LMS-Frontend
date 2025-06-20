import { Routes, Route } from "react-router-dom";
import InstructorDashboard from "../pages/Dashboard/InstructoDashboard";
import CourseList from "../components/Dashboard/Instructor/CourseList";
import CourseForm from "../components/Dashboard/Instructor/CourseForm";
import CourseDetails from "../components/Dashboard/Instructor/CourseDetails";
import ModuleForm from "../components/Dashboard/Instructor/ModuleForm";
import LessonForm from "../components/Dashboard/instructor/LessonForm";
import ModuleDetails from "../components/Dashboard/Instructor/ModuleDetails";
import StudentEnrollmentDashboard from "../components/Dashboard/Instructor/EnrollmentStats";
import AssignmentsList from "../components/Dashboard/Instructor/assignmnet/AssignmentsList"; 
import QuizPage from "../components/Dashboard/Instructor/assignmnet/QuizPage"; 
import StudentEnrollmentDashboardd from "../components/Dashboard/Instructor/StudantEnrollment";
const InstructorRoutes = () => {
  return (
    <Routes>
      <Route path="/modules/:moduleId" element={<ModuleDetails />} />

      <Route path="/dashboard" element={<InstructorDashboard />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/create" element={<CourseForm />} />
      <Route path="/courses/:courseId" element={<CourseDetails />} />
      <Route path="/courses/edit/:courseId" element={<CourseForm />} />
      <Route path="/courses/:courseId/modules/new" element={<ModuleForm />} />
      <Route
        path="/courses/:courseId/modules/:moduleId/edit"
        element={<ModuleForm />}
      />
      <Route path="enrollments" element={<StudentEnrollmentDashboard />} />

      <Route path="modules/:moduleId/lessons/new" element={<LessonForm />} />
      <Route path="lessons/:lessonId/edit" element={<LessonForm />} />

      <Route path="/assignments" element={<AssignmentsList />} />
      <Route path="/Quizze" element={<QuizPage />} />
      <Route path="/Visualization" element={<StudentEnrollmentDashboardd />} />
    </Routes>
  );
};

export default InstructorRoutes;
