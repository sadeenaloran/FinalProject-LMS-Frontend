import { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import { createAppTheme } from "./assets/styles/theme";
import { AuthProvider } from "@contexts/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GoogleAuth from "@/components/auth/GoogleAuth";
import Profile from "./components/common/Profile/Profile";
import ProtectedRoute from "@components/common/ProtectedRoute/ProtectedRoute.jsx";
import GoogleAuthCallback from "@components/auth/GoogleAuth.jsx";
import Home from "@pages/Home/Home.jsx";
import About from "@pages/About/About.jsx";
import Contact from "@/pages/ContactUs/ContactUs";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import Unauthorized from "./components/common/ProtectedRoute/Unauthorized";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage/RegisterPage";
import InstructorRoutes from "./Router/InstructorRoutes";
import Footer from "./components/common/Footer/Footer";
import AllCoursesPage from "./pages/Courses/Courses"
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
          <div style={{ position: "fixed", top: 80, right: 16, zIndex: 1400 }}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Courses" element={<AllCoursesPage />} />

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

            {/* Admin Routes */}
            <Route element={<ProtectedRoute roles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Instructor Routes */}
            <Route path="/instructor/*">
              <Route
                path="*"
                element={
                  <ProtectedRoute roles={["instructor"]}>
                    <InstructorRoutes />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Student Routes */}
            <Route element={<ProtectedRoute roles={["student"]} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
