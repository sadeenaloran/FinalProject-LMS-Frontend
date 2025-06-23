// // StudentEnrollmentDashboard.js
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Avatar,
//   Divider,
//   CircularProgress,
//   useTheme,
//   Card,
//   CardContent,
//   Chip,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   School as CourseIcon,
//   BarChart as ChartIcon,
//   Star as StarIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";
// import InstructorService from "../../../services/instructorService";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

// const StudentEnrollmentDashboard = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const [enrollments, setEnrollments] = useState([]);
//   const [courseStats, setCourseStats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const theme = useTheme();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const enrollmentResponse =
//           await InstructorService.getAllEnrollmentsByInstructor();
//         const rawEnrollments =
//           enrollmentResponse.data.data || enrollmentResponse.data;
//         // لو البيانات داخل data.data أو data فقط حسب الرد

//         // تحويل أسماء الحقول من snake_case إلى camelCase
//         const enrollments = rawEnrollments.map((item) => ({
//           id: item.id,
//           studentId: item.student_id,
//           courseId: item.course_id,
//           enrollmentDate: item.enrollmentdate,
//           studentName: item.studentname,
//           courseTitle: item.coursetitle,
//           status: item.status || "active", // لو حابب تضيف status افتراضي
//         }));

//         // حساب الإحصائيات من نفس الداتا
//         const stats = calculateCourseStats(enrollments);

//         setEnrollments(enrollments);
//         setCourseStats(stats);
//       } catch (error) {
//         console.error("Error fetching enrollments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const calculateCourseStats = (enrollments) => {
//     const courseMap = {};

//     enrollments.forEach((enrollment) => {
//       if (!courseMap[enrollment.courseId]) {
//         courseMap[enrollment.courseId] = {
//           courseId: enrollment.courseId,
//           courseTitle: enrollment.courseTitle,
//           enrollments: [],
//           studentCount: 0,
//         };
//       }
//       courseMap[enrollment.courseId].enrollments.push(enrollment);
//       courseMap[enrollment.courseId].studentCount++;
//     });

//     return Object.values(courseMap).sort(
//       (a, b) => b.studentCount - a.studentCount
//     );
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ mb: 3, display: "flex", alignItems: "center" }}
//       >
//         <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
//         Student Enrollment Dashboard
//       </Typography>

//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="All Students" icon={<PersonIcon />} />
//         <Tab label="Course Stats" icon={<CourseIcon />} />
//         <Tab label="Visualizations" icon={<ChartIcon />} />
//       </Tabs>

//       <Divider sx={{ mb: 3 }} />

//       {activeTab === 0 && <AllStudentsTab enrollments={enrollments} />}
//       {activeTab === 1 && <CourseStatsTab courseStats={courseStats} />}
//       {activeTab === 2 && <VisualizationsTab courseStats={courseStats} />}
//     </Box>
//   );
// };

// // Tab Components
// const AllStudentsTab = ({ enrollments }) => (
//   <Paper elevation={2} sx={{ p: 2 }}>
//     <Typography
//       variant="h6"
//       gutterBottom
//       sx={{ display: "flex", alignItems: "center" }}
//     >
//       <PeopleIcon sx={{ mr: 1 }} />
//       All Enrolled Students ({enrollments.length})
//     </Typography>
//     <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
//       {enrollments.map((enrollment, index) => (
//         <React.Fragment key={enrollment.id}>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar>{enrollment.studentName?.charAt(0) || "?"}</Avatar>
//             </ListItemAvatar>
//             <ListItemText
//               primary={enrollment.studentName}
//               secondary={
//                 <>
//                   <span>{enrollment.courseTitle}</span>
//                   <br />
//                   <span>
//                     Enrolled:{" "}
//                     {new Date(enrollment.enrollmentDate).toLocaleDateString()}
//                   </span>
//                 </>
//               }
//             />
//             <Chip
//               label={enrollment.status}
//               size="small"
//               color={
//                 enrollment.status === "active"
//                   ? "success"
//                   : enrollment.status === "completed"
//                   ? "primary"
//                   : "default"
//               }
//             />
//           </ListItem>
//           {index < enrollments.length - 1 && (
//             <Divider variant="inset" component="li" />
//           )}
//         </React.Fragment>
//       ))}
//     </List>
//   </Paper>
// );

// const CourseStatsTab = ({ courseStats }) => (
//   <Grid container spacing={3}>
//     {courseStats.map((course, index) => (
//       <Grid item xs={12} sm={6} md={4} key={course.courseId}>
//         <Card
//           elevation={3}
//           sx={{
//             height: "100%",
//             borderTop: index === 0 ? "4px solid #FFD700" : "4px solid #3f51b5",
//           }}
//         >
//           <CardContent>
//             <Box
//               sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
//             >
//               <Typography variant="h6" component="div">
//                 {course.courseTitle}
//               </Typography>
//               {index === 0 && <StarIcon color="warning" fontSize="small" />}
//             </Box>

//             <Typography variant="body2" color="text.secondary" gutterBottom>
//               Course ID: {course.courseId}
//             </Typography>

//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 mt: 2,
//                 gap: 1,
//               }}
//             >
//               <PeopleIcon color="primary" />
//               <Typography variant="h5" component="div">
//                 {course.studentCount}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 students enrolled
//               </Typography>
//             </Box>

//             {index === 0 && (
//               <Chip
//                 label="Most Popular"
//                 color="warning"
//                 size="small"
//                 sx={{ mt: 1 }}
//                 icon={<TrendingUpIcon fontSize="small" />}
//               />
//             )}
//           </CardContent>
//         </Card>
//       </Grid>
//     ))}
//   </Grid>
// );

// const VisualizationsTab = ({ courseStats }) => (
//   <Grid container spacing={3}>
//     <Grid item xs={12} md={6}>
//       <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
//         <Typography variant="h6" gutterBottom>
//           Enrollment Distribution
//         </Typography>
//         <PieChart width={500} height={300}>
//           <Pie
//             data={courseStats}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="studentCount"
//             nameKey="courseTitle"
//             label={({ name, percent }) =>
//               `${name}: ${(percent * 100).toFixed(0)}%`
//             }
//           >
//             {courseStats.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </Paper>
//     </Grid>

//     <Grid item xs={12} md={6}>
//       <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
//         <Typography variant="h6" gutterBottom>
//           Enrollment Comparison
//         </Typography>
//         <BarChart
//           width={500}
//           height={300}
//           data={courseStats}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <XAxis dataKey="courseTitle" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar
//             dataKey="studentCount"
//             name="Number of Students"
//             fill="#3f51b5"
//           />
//         </BarChart>
//       </Paper>
//     </Grid>
//   </Grid>
// );

// export default StudentEnrollmentDashboard;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  useTheme,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Badge,
  IconButton,
  styled,
} from "@mui/material";
import {
  People as PeopleIcon,
  School as CourseIcon,
  BarChart as ChartIcon,
  Star as StarIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InstructorService from "../../../services/instructorService";
import { motion, AnimatePresence } from "framer-motion";

// Custom styled components
const GlassPaper = styled(Paper)(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(30, 41, 59, 0.8)",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: theme.shadows[4],
  border: `1px solid ${
    theme.palette.mode === "light"
      ? "rgba(26, 140, 240, 0.2)"
      : "rgba(255, 255, 255, 0.1)"
  }`,
  overflow: "hidden",
}));

const GradientCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "light"
      ? "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)"
      : "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)",
  borderRadius: "16px",
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

const COLORS = ["#1A8CF0", "#4CAF50", "#FF9800", "#9C27B0", "#607D8B"];

const StudentEnrollmentDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();

  const fetchData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      const enrollmentResponse =
        await InstructorService.getAllEnrollmentsByInstructor();
      const rawEnrollments =
        enrollmentResponse.data.data || enrollmentResponse.data;

      const enrollments = rawEnrollments.map((item) => ({
        id: item.id,
        studentId: item.student_id,
        courseId: item.course_id,
        enrollmentDate: item.enrollmentdate,
        studentName: item.studentname,
        courseTitle: item.coursetitle,
        status: item.status || "active",
      }));

      const stats = calculateCourseStats(enrollments);

      setEnrollments(enrollments);
      setCourseStats(stats);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateCourseStats = (enrollments) => {
    const courseMap = {};

    enrollments.forEach((enrollment) => {
      if (!courseMap[enrollment.courseId]) {
        courseMap[enrollment.courseId] = {
          courseId: enrollment.courseId,
          courseTitle: enrollment.courseTitle,
          enrollments: [],
          studentCount: 0,
        };
      }
      courseMap[enrollment.courseId].enrollments.push(enrollment);
      courseMap[enrollment.courseId].studentCount++;
    });

    return Object.values(courseMap).sort(
      (a, b) => b.studentCount - a.studentCount
    );
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              filter: `drop-shadow(0 0 8px ${theme.palette.primary.light})`,
            }}
          />
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          <Avatar
            sx={{
              mr: 2,
              width: 56,
              height: 56,
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)"
                  : "linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)",
              boxShadow: theme.shadows[2],
            }}
          >
            <PeopleIcon fontSize="large" />
          </Avatar>
          Student Enrollment Dashboard
        </Typography>

        <IconButton
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{
            background:
              theme.palette.mode === "light"
                ? "rgba(26, 140, 240, 0.1)"
                : "rgba(26, 140, 240, 0.2)",
            "&:hover": {
              background: theme.palette.primary.main,
              color: "#fff",
            },
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Box>

      <GlassPaper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 4,
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)"
                  : "linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)",
            },
          }}
        >
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" />
                <span>All Students</span>
                <Badge
                  badgeContent={enrollments.length}
                  color="primary"
                  sx={{ ml: 1 }}
                />
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CourseIcon fontSize="small" />
                <span>Course Stats</span>
              </Box>
            }
          />
          <Tab
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ChartIcon fontSize="small" />
                <span>Visualizations</span>
              </Box>
            }
          />
        </Tabs>
      </GlassPaper>

      <Divider sx={{ mb: 3 }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 0 ? -20 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 0 && <AllStudentsTab enrollments={enrollments} />}
          {activeTab === 1 && <CourseStatsTab courseStats={courseStats} />}
          {activeTab === 2 && <VisualizationsTab courseStats={courseStats} />}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

// Tab Components
const AllStudentsTab = ({ enrollments }) => {
  const theme = useTheme();

  return (
    <GlassPaper sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
          All Enrolled Students
        </Typography>
        <Chip
          label={`Total: ${enrollments.length}`}
          color="primary"
          size="small"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
        <AnimatePresence>
          {enrollments.map((enrollment, index) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItem sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #1A8CF0 0%, #4DABF5 100%)"
                          : "linear-gradient(135deg, #1A8CF0 0%, #1565C0 100%)",
                      color: "#fff",
                    }}
                  >
                    {enrollment.studentName?.charAt(0) || "?"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight="600">
                      {enrollment.studentName}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {enrollment.courseTitle}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Enrolled:{" "}
                        {new Date(
                          enrollment.enrollmentDate
                        ).toLocaleDateString()}
                      </Typography>
                    </>
                  }
                />
                <Chip
                  label={enrollment.status}
                  size="small"
                  sx={{
                    fontWeight: 500,
                    background:
                      enrollment.status === "active"
                        ? theme.palette.mode === "light"
                          ? "rgba(76, 175, 80, 0.1)"
                          : "rgba(76, 175, 80, 0.2)"
                        : enrollment.status === "completed"
                        ? theme.palette.mode === "light"
                          ? "rgba(26, 140, 240, 0.1)"
                          : "rgba(26, 140, 240, 0.2)"
                        : theme.palette.mode === "light"
                        ? "rgba(158, 158, 158, 0.1)"
                        : "rgba(158, 158, 158, 0.2)",
                    color:
                      enrollment.status === "active"
                        ? theme.palette.success.main
                        : enrollment.status === "completed"
                        ? theme.palette.primary.main
                        : theme.palette.text.secondary,
                  }}
                />
              </ListItem>
              {index < enrollments.length - 1 && (
                <Divider
                  variant="inset"
                  component="li"
                  sx={{
                    borderColor:
                      theme.palette.mode === "light"
                        ? "rgba(26, 140, 240, 0.1)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </List>
    </GlassPaper>
  );
};

const CourseStatsTab = ({ courseStats }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {courseStats.map((course, index) => (
        <Grid item xs={12} sm={6} md={4} key={course.courseId}>
          <GradientCard>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {course.courseTitle}
                </Typography>
                {index === 0 && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <StarIcon color="warning" fontSize="small" />
                  </motion.div>
                )}
              </Box>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Course ID: {course.courseId}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  gap: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(26, 140, 240, 0.1)"
                        : "rgba(26, 140, 240, 0.2)",
                    color: theme.palette.primary.main,
                  }}
                >
                  <PeopleIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="h5" component="div" fontWeight="700">
                    {course.studentCount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    students enrolled
                  </Typography>
                </Box>
              </Box>

              {index === 0 && (
                <Chip
                  label="Most Popular"
                  size="small"
                  sx={{
                    mt: 2,
                    fontWeight: 600,
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, rgba(255, 214, 0, 0.2) 0%, rgba(255, 171, 0, 0.2) 100%)"
                        : "linear-gradient(135deg, rgba(255, 214, 0, 0.3) 0%, rgba(255, 171, 0, 0.3) 100%)",
                    color: theme.palette.warning.dark,
                  }}
                  icon={
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <TrendingUpIcon fontSize="small" />
                    </motion.div>
                  }
                />
              )}
            </CardContent>
          </GradientCard>
        </Grid>
      ))}
    </Grid>
  );
};

const VisualizationsTab = ({ courseStats }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      <Grid item size={6} xs={12} md={6}>
        <GlassPaper sx={{ p: 3}}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Enrollment Distribution
          </Typography>
          <PieChart width={500} height={400}>
            <Pie
              data={courseStats}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="studentCount"
              nameKey="courseTitle"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {courseStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </GlassPaper>
      </Grid>

      <Grid item size={6} xs={12} md={6}>
        <Paper elevation={3} sx={{ p:2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            <ChartIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            Enrollment Comparison
          </Typography>
          <BarChart
            width={500}
            height={400}
            data={courseStats}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            sx={{color: theme.palette.primary.main}}
          >
            <XAxis
              dataKey="courseTitle"
              tick={{ fill: theme.palette.text.main }}
            />
            <YAxis tick={{ fill: theme.palette.text.main }} />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                borderRadius: "8px",
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
            <Legend />
            <Bar
              dataKey="studentCount"
              name="Number of Students"
              fill="#3f51b5"
              animationDuration={1500}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StudentEnrollmentDashboard;
