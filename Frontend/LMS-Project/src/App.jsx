import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { createAppTheme } from "@/styles/theme";
import { AuthProvider } from "@contexts/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GoogleAuth from "@/components/auth/GoogleAuth";
import Profile from "@components/user/Profile";
import ProtectedRoute from "@components/common/ProtectedRoute/ProtectedRoute.jsx";
import GoogleAuthCallback from "@components/auth/GoogleAuth.jsx";
import Home from "@pages/Home/Home.jsx";
import About from "@pages/About/About.jsx";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import Unauthorized from "@components/common/Unauthorized";
// import CourseForm from "@/components/instructor/InstructorCourses/CourseForm";
// import CourseDetails from "./components/instructor/InstructorCourses/Mycourses";
// import CourseDetailsDialog from "./pages/Student/MyCourses/CourseDetailsDialog";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage";

function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <div style={{ position: "fixed", top: 10, right: 10, zIndex: 999 }}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/google" element={<GoogleAuth />} />
            <Route
              path="/auth/google/callback"
              element={<GoogleAuthCallback />}
            />
            <Route path="/auth/success" element={<GoogleAuthCallback />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            {/* Instructor Routes */}
            {/* <Route
              path="/instructor/dashboard"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <InstructorCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/new"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <CourseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/:id"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <CourseDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/instructor/courses/:id/edit"
              element={
                <ProtectedRoute roles={["instructor"]}>
                  <CourseForm />
                </ProtectedRoute>
              }
            /> */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route element={<ProtectedRoute roles={["student"]} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              {/* <Route path="/courses" element={<StudentCourses />} /> */}
              {/* <Route path="/courses/:id" element={<CourseDetails />} /> */}
              {/* <Route
                path="/student/dashboard/CourseDetailsDialog"
                element={<CourseDetailsDialog />}
              /> */}
            </Route>
            {/* <Route path="/assignment/:id" element={<AssignmentDetail />} /> */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
