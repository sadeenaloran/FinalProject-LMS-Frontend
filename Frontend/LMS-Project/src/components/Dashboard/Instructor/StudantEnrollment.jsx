// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   CircularProgress,
//   useTheme,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";
// import {
//   People as PeopleIcon,
//   BarChart as ChartIcon,
//   School as SchoolIcon,
//   TrendingUp as TrendingUpIcon,
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
//   ResponsiveContainer,
// } from "recharts";
// import InstructorService from "../../../services/instructorService";

// // Modern LMS color palette - professional and accessible
// const COLORS = [
//   "#6366f1", // Indigo - primary
//   "#10b981", // Emerald - success
//   "#f59e0b", // Amber - warning
//   "#ef4444", // Red - error
//   "#8b5cf6", // Violet - secondary
//   "#06b6d4", // Cyan - info
//   "#84cc16", // Lime - accent
//   "#f97316", // Orange - highlight
//   "#ec4899", // Pink - creative
//   "#64748b", // Slate - neutral
//   "#14b8a6", // Teal - complement
//   "#a855f7", // Purple - royal
// ];

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   // Show label only if slice is bigger than 3%
//   if (percent < 0.03) return null;

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="#ffffff"
//       textAnchor={x > cx ? "start" : "end"}
//       dominantBaseline="central"
//       style={{
//         fontSize: 12,
//         fontWeight: "700",
//         textShadow: "0 1px 3px rgba(0,0,0,0.8)",
//         filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
//       }}
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const VisualizationView = () => {
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

//         const stats = calculateCourseStats(rawEnrollments);
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
//       const courseId = enrollment.course_id || enrollment.courseId;
//       const courseTitle = enrollment.coursetitle || enrollment.courseTitle;

//       if (!courseMap[courseId]) {
//         courseMap[courseId] = {
//           courseId,
//           courseTitle,
//           studentCount: 0,
//         };
//       }
//       courseMap[courseId].studentCount++;
//     });

//     return Object.values(courseMap).sort(
//       (a, b) => b.studentCount - a.studentCount
//     );
//   };

//   const totalStudents = courseStats.reduce(
//     (sum, course) => sum + course.studentCount,
//     0
//   );
//   const totalCourses = courseStats.length;

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="60vh"
//         sx={{
//           background:
//             theme.palette.mode === "dark"
//               ? "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
//               : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//           borderRadius: "20px",
//           margin: 2,
//         }}
//       >
//         <CircularProgress
//           size={80}
//           thickness={4}
//           sx={{
//             color: "#6366f1",
//             mb: 2,
//             "& .MuiCircularProgress-circle": {
//               strokeLinecap: "round",
//             },
//           }}
//         />
//         <Typography variant="h6" color="text.secondary" fontWeight={500}>
//           Loading enrollment data...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         p: { xs: 2, md: 4 },
//         background:
//           theme.palette.mode === "dark"
//             ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
//             : "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
//         minHeight: "100vh",
//       }}
//     >
//       {/* Header Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography
//           variant="h3"
//           sx={{
//             mb: 1,
//             display: "flex",
//             alignItems: "center",
//             fontWeight: 800,
//             background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//             backgroundClip: "text",
//             WebkitBackgroundClip: "text",
//             color: "transparent",
//             fontSize: { xs: "2rem", md: "3rem" },
//           }}
//         >
//           <SchoolIcon
//             sx={{
//               mr: 2,
//               fontSize: { xs: "2.5rem", md: "3.5rem" },
//               color: "#6366f1",
//               filter: "drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))",
//             }}
//           />
//           Learning Analytics
//         </Typography>
//         <Typography
//           variant="h6"
//           color="text.secondary"
//           fontWeight={400}
//           sx={{ ml: { xs: 0, md: 7 } }}
//         >
//           Student Enrollment Dashboard
//         </Typography>
//       </Box>

//       {/* Stats Overview Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//               color: "white",
//               borderRadius: "20px",
//               boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
//               transform: "translateY(0)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 15px 35px rgba(99, 102, 241, 0.4)",
//               },
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box>
//                   <Typography variant="h4" fontWeight={800}>
//                     {totalStudents}
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                     Total Students
//                   </Typography>
//                 </Box>
//                 <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//               color: "white",
//               borderRadius: "20px",
//               boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
//               transform: "translateY(0)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
//               },
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box>
//                   <Typography variant="h4" fontWeight={800}>
//                     {totalCourses}
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                     Active Courses
//                   </Typography>
//                 </Box>
//                 <SchoolIcon sx={{ fontSize: 40, opacity: 0.8 }} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
//               color: "white",
//               borderRadius: "20px",
//               boxShadow: "0 10px 25px rgba(245, 158, 11, 0.3)",
//               transform: "translateY(0)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 15px 35px rgba(245, 158, 11, 0.4)",
//               },
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box>
//                   <Typography variant="h4" fontWeight={800}>
//                     {Math.round(totalStudents / totalCourses)}
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                     Avg per Course
//                   </Typography>
//                 </Box>
//                 <TrendingUpIcon sx={{ fontSize: 40, opacity: 0.8 }} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
//               color: "white",
//               borderRadius: "20px",
//               boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)",
//               transform: "translateY(0)",
//               transition: "all 0.3s ease",
//               "&:hover": {
//                 transform: "translateY(-5px)",
//                 boxShadow: "0 15px 35px rgba(236, 72, 153, 0.4)",
//               },
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Box>
//                   <Typography variant="h4" fontWeight={800}>
//                     {Math.max(...courseStats.map((c) => c.studentCount))}
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                     Highest Enrollment
//                   </Typography>
//                 </Box>
//                 <ChartIcon sx={{ fontSize: 40, opacity: 0.8 }} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Grid container spacing={4}>
//         {/* Pie Chart */}
//         <Grid item xs={12} lg={6}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               height: "550px",
//               borderRadius: "24px",
//               background:
//                 theme.palette.mode === "dark"
//                   ? "rgba(15, 23, 42, 0.8)"
//                   : "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(20px)",
//               border:
//                 theme.palette.mode === "dark"
//                   ? "1px solid rgba(255, 255, 255, 0.1)"
//                   : "1px solid rgba(0, 0, 0, 0.05)",
//               boxShadow:
//                 theme.palette.mode === "dark"
//                   ? "0 20px 40px rgba(0, 0, 0, 0.3)"
//                   : "0 20px 40px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="space-between"
//               mb={3}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   color: theme.palette.text.primary,
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 8,
//                     height: 32,
//                     background:
//                       "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//                     borderRadius: "4px",
//                     mr: 2,
//                   }}
//                 />
//                 Enrollment Distribution
//               </Typography>
//               <Chip
//                 label="Interactive"
//                 size="small"
//                 sx={{
//                   background:
//                     "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//                   color: "white",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <Box sx={{ height: "450px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={courseStats}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={140}
//                     innerRadius={80}
//                     paddingAngle={2}
//                     dataKey="studentCount"
//                     nameKey="courseTitle"
//                     label={renderCustomizedLabel}
//                     isAnimationActive={true}
//                     animationDuration={1500}
//                     animationBegin={0}
//                   >
//                     {courseStats.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                         stroke="rgba(255, 255, 255, 0.2)"
//                         strokeWidth={2}
//                         style={{
//                           filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
//                         }}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       background:
//                         theme.palette.mode === "dark"
//                           ? "rgba(15, 23, 42, 0.95)"
//                           : "rgba(255, 255, 255, 0.95)",
//                       border: "none",
//                       borderRadius: "16px",
//                       boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//                       backdropFilter: "blur(20px)",
//                       padding: "12px 16px",
//                     }}
//                     itemStyle={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 600,
//                     }}
//                   />
//                   <Legend
//                     layout="vertical"
//                     verticalAlign="middle"
//                     align="right"
//                     wrapperStyle={{
//                       paddingLeft: "30px",
//                       fontWeight: "600",
//                       fontSize: "13px",
//                       color: theme.palette.text.primary,
//                       lineHeight: "1.6",
//                     }}
//                     iconType="circle"
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* Bar Chart */}
//         <Grid item xs={12} lg={6}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 4,
//               height: "550px",
//               borderRadius: "24px",
//               background:
//                 theme.palette.mode === "dark"
//                   ? "rgba(15, 23, 42, 0.8)"
//                   : "rgba(255, 255, 255, 0.9)",
//               backdropFilter: "blur(20px)",
//               border:
//                 theme.palette.mode === "dark"
//                   ? "1px solid rgba(255, 255, 255, 0.1)"
//                   : "1px solid rgba(0, 0, 0, 0.05)",
//               boxShadow:
//                 theme.palette.mode === "dark"
//                   ? "0 20px 40px rgba(0, 0, 0, 0.3)"
//                   : "0 20px 40px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Box
//               display="flex"
//               alignItems="center"
//               justifyContent="space-between"
//               mb={3}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   color: theme.palette.text.primary,
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 8,
//                     height: 32,
//                     background:
//                       "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                     borderRadius: "4px",
//                     mr: 2,
//                   }}
//                 />
//                 Course Comparison
//               </Typography>
//               <Chip
//                 label="Live Data"
//                 size="small"
//                 sx={{
//                   background:
//                     "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                   color: "white",
//                   fontWeight: 600,
//                 }}
//               />
//             </Box>
//             <Box sx={{ height: "450px" }}>
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={courseStats}
//                   margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
//                   layout="vertical"
//                   barCategoryGap="15%"
//                   isAnimationActive={true}
//                   animationDuration={1500}
//                 >
//                   <XAxis
//                     type="number"
//                     tick={{
//                       fill: theme.palette.text.primary,
//                       fontWeight: 600,
//                       fontSize: 12,
//                     }}
//                     axisLine={{
//                       stroke: theme.palette.divider,
//                       strokeWidth: 2,
//                     }}
//                     tickLine={false}
//                     gridLines={false}
//                   />
//                   <YAxis
//                     dataKey="courseTitle"
//                     type="category"
//                     width={180}
//                     tick={{
//                       fill: theme.palette.text.primary,
//                       fontWeight: 600,
//                       fontSize: 12,
//                     }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       background:
//                         theme.palette.mode === "dark"
//                           ? "rgba(15, 23, 42, 0.95)"
//                           : "rgba(255, 255, 255, 0.95)",
//                       border: "none",
//                       borderRadius: "16px",
//                       boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
//                       backdropFilter: "blur(20px)",
//                       padding: "12px 16px",
//                     }}
//                     itemStyle={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 600,
//                     }}
//                   />
//                   <Bar
//                     dataKey="studentCount"
//                     name="Students Enrolled"
//                     radius={[8, 8, 8, 8]}
//                     animationDuration={1800}
//                   >
//                     {courseStats.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                         style={{
//                           filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15))",
//                         }}
//                       />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default VisualizationView;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  useTheme,
  Card,
  CardContent,
  Chip,
  Avatar,
  Fade,
} from "@mui/material";
import {
  People as PeopleIcon,
  BarChart as ChartIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  AutoGraph as AnalyticsIcon,
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

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{
        fontSize: 12,
        fontWeight: "700",
        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
      }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const VisualizationView = () => {
  const [courseStats, setCourseStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Generate colors from theme palette
  const getChartColors = () => [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.primary.light,
    theme.palette.secondary.light,
    theme.palette.warning.light,
    theme.palette.error.light,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const enrollmentResponse =
          await InstructorService.getAllEnrollmentsByInstructor();
        const rawEnrollments =
          enrollmentResponse.data.data || enrollmentResponse.data;

        const stats = calculateCourseStats(rawEnrollments);
        setCourseStats(stats);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateCourseStats = (enrollments) => {
    const courseMap = {};

    enrollments.forEach((enrollment) => {
      const courseId = enrollment.course_id || enrollment.courseId;
      const courseTitle = enrollment.coursetitle || enrollment.courseTitle;

      if (!courseMap[courseId]) {
        courseMap[courseId] = {
          courseId,
          courseTitle,
          studentCount: 0,
        };
      }
      courseMap[courseId].studentCount++;
    });

    return Object.values(courseMap).sort(
      (a, b) => b.studentCount - a.studentCount
    );
  };

  const totalStudents = courseStats.reduce(
    (sum, course) => sum + course.studentCount,
    0
  );
  const totalCourses = courseStats.length;

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        sx={{
          background: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius * 2,
          margin: 2,
        }}
      >
        <Fade in={true} style={{ transitionDelay: "200ms" }}>
          <Box textAlign="center">
            <CircularProgress
              size={80}
              thickness={4}
              sx={{
                color: theme.palette.primary.main,
                mb: 2,
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                },
              }}
            />
            <Typography variant="h6" color="text.secondary" fontWeight={500}>
              Loading enrollment insights...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              background: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: theme.shadows[4],
            }}
          >
            <AnalyticsIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Enrollment Analytics
          </Typography>
        </Box>
        <Typography
          variant="h6"
          color="text.secondary"
          fontWeight={400}
          sx={{ ml: { xs: 0, md: 8 } }}
        >
          Visual insights into your teaching impact
        </Typography>
      </Box>

      {/* Stats Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            value: totalStudents,
            label: "Total Students",
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            color: "primary",
            delay: 0,
          },
          {
            value: totalCourses,
            label: "Active Courses",
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            color: "secondary",
            delay: 100,
          },
          {
            value: Math.round(totalStudents / totalCourses),
            label: "Avg per Course",
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            color: "warning",
            delay: 200,
          },
          {
            value: Math.max(...courseStats.map((c) => c.studentCount)),
            label: "Highest Enrollment",
            icon: <ChartIcon sx={{ fontSize: 40 }} />,
            color: "info",
            delay: 300,
          },
        ].map((stat) => (
          <Grid item xs={12} md={3} key={stat.label}>
            <Fade in={!loading} style={{ transitionDelay: `${stat.delay}ms` }}>
              <Card
                sx={{
                  background: theme.palette[stat.color].main,
                  color: theme.palette[stat.color].contrastText,
                  borderRadius: theme.shape.borderRadius * 2,
                  boxShadow: theme.shadows[4],
                  transform: "translateY(0)",
                  transition: "all 0.3s ease",
                  height: "100%",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{ mb: 0.5 }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "50%",
                        background: `rgba(255,255,255,${
                          theme.palette.mode === "dark" ? 0.1 : 0.2
                        })`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={4}
        // sx={{ display: "flex", justifyContent: "center" }}
      >
        {/* Pie Chart */}
        <Grid item size={6} xs={12} xl={6}>
          <Fade in={!loading} style={{ transitionDelay: "400ms" }}>
            <Paper
              sx={{
                p: 5,
                height: "500px",
                width: "550px",
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2],
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 32,
                      background: theme.palette.primary.main,
                      borderRadius: theme.shape.borderRadius,
                      mr: 2,
                    }}
                  />
                  Enrollment Distribution
                </Typography>
                <Chip
                  label="Interactive"
                  size="small"
                  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Box sx={{ height: "450px", position: "relative" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courseStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={140}
                      innerRadius={60}
                      paddingAngle={2}
                      dataKey="studentCount"
                      nameKey="courseTitle"
                      label={renderCustomizedLabel}
                      animationDuration={1500}
                      animationEasing="ease-out"
                    >
                      {courseStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            getChartColors()[index % getChartColors().length]
                          }
                          stroke={theme.palette.background.paper}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[4],
                        padding: theme.spacing(1, 2),
                        fontSize: theme.typography.body2.fontSize,
                      }}
                      itemStyle={{
                        color: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                      formatter={(value, name) => [`${value} students`, name]}
                    />
                    <Legend
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{
                        paddingLeft: theme.spacing(2),
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.body2.fontSize,
                        color: theme.palette.text.primary,
                      }}
                      iconType="circle"
                      iconSize={10}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Bar Chart */}
        <Grid item  size={6} xs={12} lg={6}>
          <Fade in={!loading} style={{ transitionDelay: "500ms" }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: "500px",
                width: "550px",
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2],
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 32,
                      background: theme.palette.secondary.main,
                      borderRadius: theme.shape.borderRadius,
                      mr: 2,
                    }}
                  />
                  Course Popularity
                </Typography>
                <Chip
                  label="Live Data"
                  size="small"
                  sx={{
                    background: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Box sx={{ height: "450px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={courseStats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    layout="vertical"
                    barSize={24}
                    barCategoryGap={16}
                    animationDuration={1500}
                  >
                    <XAxis
                      type="number"
                      tick={{
                        fill: theme.palette.text.secondary,
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.body2.fontSize,
                      }}
                      axisLine={{
                        stroke: theme.palette.divider,
                        strokeWidth: 1,
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="courseTitle"
                      type="category"
                      width={180}
                      tick={{
                        fill: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightMedium,
                        fontSize: theme.typography.body2.fontSize,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: theme.shape.borderRadius,
                        boxShadow: theme.shadows[4],
                        padding: theme.spacing(1, 2),
                        fontSize: theme.typography.body2.fontSize,
                      }}
                      itemStyle={{
                        color: theme.palette.text.primary,
                        fontWeight: theme.typography.fontWeightMedium,
                      }}
                      formatter={(value) => [
                        `${value} students`,
                        "Enrollments",
                      ]}
                    />
                    <Bar
                      dataKey="studentCount"
                      name="Students Enrolled"
                      radius={[
                        0,
                        theme.shape.borderRadius,
                        theme.shape.borderRadius,
                        0,
                      ]}
                      animationDuration={1800}
                    >
                      {courseStats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            getChartColors()[index % getChartColors().length]
                          }
                          style={{
                            filter: `drop-shadow(0 2px 4px ${
                              theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.3)"
                                : "rgba(0,0,0,0.1)"
                            })`,
                          }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisualizationView;
