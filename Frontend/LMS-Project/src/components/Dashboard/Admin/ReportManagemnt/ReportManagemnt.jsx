// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@mui/material";
// import {
//   Bar as BarChart,
//   Line as LineChart,
//   Pie as PieChart,
// } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement,
// } from "chart.js";
// import ReportService from "../../../services/reportService";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement
// );

// const ReportManagement = () => {
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [userActivityData, setUserActivityData] = useState(null);
//   const [coursePopularityData, setCoursePopularityData] = useState(null);
//   const [systemPerformanceData, setSystemPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadReports = async () => {
//       try {
//         setLoading(true);
//         const [userActivity, coursePopularity, systemPerformance] =
//           await Promise.all([
//             ReportService.fetchUserActivity(timeRange),
//             ReportService.fetchCoursePopularity(),
//             ReportService.fetchSystemPerformance(),
//           ]);

//         setUserActivityData(userActivity);
//         setCoursePopularityData(coursePopularity);
//         setSystemPerformanceData(systemPerformance);
//       } catch (error) {
//         console.error("Error loading reports:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReports();
//   }, [timeRange]);

//   const userActivityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "User Activity Over Time",
//       },
//     },
//   };

//   const coursePopularityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Course Popularity",
//       },
//     },
//   };

//   const systemPerformanceChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "System Performance Metrics",
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Typography>Loading reports...</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           System Reports
//         </Typography>

//         <FormControl sx={{ minWidth: 200, mb: 3 }}>
//           <InputLabel id="time-range-label">Time Range</InputLabel>
//           <Select
//             labelId="time-range-label"
//             value={timeRange}
//             label="Time Range"
//             onChange={(e) => setTimeRange(e.target.value)}
//           >
//             <MenuItem value="daily">Daily</MenuItem>
//             <MenuItem value="weekly">Weekly</MenuItem>
//             <MenuItem value="monthly">Monthly</MenuItem>
//             <MenuItem value="yearly">Yearly</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={3}>
//         {/* User Activity Chart */}
//         <Grid item xs={12} md={8} lg={9}>
//           <Paper
//             sx={{
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//             }}
//           >
//             {userActivityData && (
//               <LineChart
//                 options={userActivityChartOptions}
//                 data={{
//                   labels: userActivityData.labels,
//                   datasets: [
//                     {
//                       label: "Active Users",
//                       data: userActivityData.activeUsers,
//                       borderColor: "rgb(75, 192, 192)",
//                       backgroundColor: "rgba(75, 192, 192, 0.5)",
//                     },
//                     {
//                       label: "New Signups",
//                       data: userActivityData.newSignups,
//                       borderColor: "rgb(53, 162, 235)",
//                       backgroundColor: "rgba(53, 162, 235, 0.5)",
//                     },
//                   ],
//                 }}
//               />
//             )}
//           </Paper>
//         </Grid>

//         {/* Course Popularity Chart */}
//         <Grid item xs={12} md={4} lg={3}>
//           <Paper
//             sx={{
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//             }}
//           >
//             {coursePopularityData && (
//               <PieChart
//                 options={coursePopularityChartOptions}
//                 data={{
//                   labels: coursePopularityData.labels,
//                   datasets: [
//                     {
//                       label: "Enrollments",
//                       data: coursePopularityData.enrollments,
//                       backgroundColor: [
//                         "rgba(255, 99, 132, 0.7)",
//                         "rgba(54, 162, 235, 0.7)",
//                         "rgba(255, 206, 86, 0.7)",
//                         "rgba(75, 192, 192, 0.7)",
//                         "rgba(153, 102, 255, 0.7)",
//                       ],
//                       borderColor: [
//                         "rgba(255, 99, 132, 1)",
//                         "rgba(54, 162, 235, 1)",
//                         "rgba(255, 206, 86, 1)",
//                         "rgba(75, 192, 192, 1)",
//                         "rgba(153, 102, 255, 1)",
//                       ],
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//               />
//             )}
//           </Paper>
//         </Grid>

//         {/* System Performance Chart */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//             {systemPerformanceData && (
//               <BarChart
//                 options={systemPerformanceChartOptions}
//                 data={{
//                   labels: systemPerformanceData.labels,
//                   datasets: [
//                     {
//                       label: "Response Time (ms)",
//                       data: systemPerformanceData.responseTimes,
//                       backgroundColor: "rgba(255, 159, 64, 0.7)",
//                     },
//                     {
//                       label: "Uptime (%)",
//                       data: systemPerformanceData.uptimePercentages,
//                       backgroundColor: "rgba(54, 162, 235, 0.7)",
//                     },
//                   ],
//                 }}
//               />
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ReportManagement;

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   CircularProgress,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   Bar as BarChart,
//   Line as LineChart,
//   Pie as PieChart,
// } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement,
// } from "chart.js";
// import ReportService from "../../../../../services/reportService";
// import { saveAs } from "file-saver";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement
// );

// const ReportManagement = () => {
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [userActivityData, setUserActivityData] = useState(null);
//   const [coursePopularityData, setCoursePopularityData] = useState(null);
//   const [systemPerformanceData, setSystemPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     const loadReports = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [userActivity, coursePopularity, systemPerformance] =
//           await Promise.all([
//             ReportService.fetchUserActivity(timeRange),
//             ReportService.fetchCoursePopularity(),
//             ReportService.fetchSystemPerformance(),
//           ]);

//         setUserActivityData(userActivity);
//         setCoursePopularityData(coursePopularity);
//         setSystemPerformanceData(systemPerformance);
//       } catch (error) {
//         console.error("Error loading reports:", error);
//         setError("Failed to load reports. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReports();
//   }, [timeRange]);

//   const handleExport = async (reportType) => {
//     try {
//       setError(null);
//       const blob = await ReportService.exportReport(reportType, "pdf", {
//         timeRange,
//       });
//       saveAs(blob, `${reportType}_report.pdf`);
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error("Error exporting report:", err);
//       setError(err.message || "Failed to export report.");
//     }
//   };

//   const userActivityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "User Activity Over Time",
//       },
//     },
//   };

//   const coursePopularityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Course Popularity",
//       },
//     },
//   };

//   const systemPerformanceChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "System Performance Metrics",
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <Container
//         maxWidth="lg"
//         sx={{
//           mt: 4,
//           mb: 4,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       {error && (
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       )}

//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
//         <Box>
//           <Typography variant="h4" component="h1" gutterBottom>
//             System Reports
//           </Typography>

//           <FormControl sx={{ minWidth: 200 }}>
//             <InputLabel id="time-range-label">Time Range</InputLabel>
//             <Select
//               labelId="time-range-label"
//               value={timeRange}
//               label="Time Range"
//               onChange={(e) => setTimeRange(e.target.value)}
//             >
//               <MenuItem value="daily">Daily</MenuItem>
//               <MenuItem value="weekly">Weekly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//               <MenuItem value="yearly">Yearly</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "flex-end" }}>
//           <Button
//             variant="outlined"
//             onClick={() => handleExport("user_activity")}
//             sx={{ mr: 2 }}
//             disabled={!userActivityData}
//           >
//             Export User Activity
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => handleExport("course_popularity")}
//             disabled={!coursePopularityData}
//           >
//             Export Course Popularity
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={3}>
//         {/* User Activity Chart */}
//         <Grid item xs={12} md={8} lg={9}>
//           <Paper
//             sx={{
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//             }}
//           >
//             {userActivityData ? (
//               <LineChart
//                 options={userActivityChartOptions}
//                 data={{
//                   labels: userActivityData.labels,
//                   datasets: [
//                     {
//                       label: "Active Users",
//                       data: userActivityData.activeUsers,
//                       borderColor: "rgb(75, 192, 192)",
//                       backgroundColor: "rgba(75, 192, 192, 0.5)",
//                     },
//                     {
//                       label: "New Signups",
//                       data: userActivityData.newSignups,
//                       borderColor: "rgb(53, 162, 235)",
//                       backgroundColor: "rgba(53, 162, 235, 0.5)",
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Typography>No user activity data available</Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* Course Popularity Chart */}
//         <Grid item xs={12} md={4} lg={3}>
//           <Paper
//             sx={{
//               p: 2,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//             }}
//           >
//             {coursePopularityData ? (
//               <PieChart
//                 options={coursePopularityChartOptions}
//                 data={{
//                   labels: coursePopularityData.labels,
//                   datasets: [
//                     {
//                       label: "Enrollments",
//                       data: coursePopularityData.enrollments,
//                       backgroundColor: [
//                         "rgba(255, 99, 132, 0.7)",
//                         "rgba(54, 162, 235, 0.7)",
//                         "rgba(255, 206, 86, 0.7)",
//                         "rgba(75, 192, 192, 0.7)",
//                         "rgba(153, 102, 255, 0.7)",
//                       ],
//                       borderColor: [
//                         "rgba(255, 99, 132, 1)",
//                         "rgba(54, 162, 235, 1)",
//                         "rgba(255, 206, 86, 1)",
//                         "rgba(75, 192, 192, 1)",
//                         "rgba(153, 102, 255, 1)",
//                       ],
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Typography>No course popularity data available</Typography>
//             )}
//           </Paper>
//         </Grid>

//         {/* System Performance Chart */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//             {systemPerformanceData ? (
//               <BarChart
//                 options={systemPerformanceChartOptions}
//                 data={{
//                   labels: systemPerformanceData.labels,
//                   datasets: [
//                     {
//                       label: "Response Time (ms)",
//                       data: systemPerformanceData.responseTimes,
//                       backgroundColor: "rgba(255, 159, 64, 0.7)",
//                     },
//                     {
//                       label: "Uptime (%)",
//                       data: systemPerformanceData.uptimePercentages,
//                       backgroundColor: "rgba(54, 162, 235, 0.7)",
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Typography>No system performance data available</Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         message="Report exported successfully"
//       />
//     </Container>
//   );
// };

// export default ReportManagement;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   Card,
//   CardHeader,
//   Avatar,
//   Divider
// } from "@mui/material";
// import {
//   Bar as BarChart,
//   Line as LineChart,
//   Pie as PieChart,
// } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement,
// } from "chart.js";
// import ReportService from "../../../../../services/reportService";
// import { saveAs } from "file-saver";
// import {
//   Timeline as TimelineIcon,
//   School as CourseIcon,
//   Speed as PerformanceIcon,
//   Download as DownloadIcon,
//   CalendarMonth as CalendarIcon
// } from "@mui/icons-material";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   LineElement,
//   ArcElement
// );

// const ReportManagement = () => {
//   const [timeRange, setTimeRange] = useState("monthly");
//   const [userActivityData, setUserActivityData] = useState(null);
//   const [coursePopularityData, setCoursePopularityData] = useState(null);
//   const [systemPerformanceData, setSystemPerformanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     const loadReports = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const [userActivity, coursePopularity, systemPerformance] =
//           await Promise.all([
//             ReportService.fetchUserActivity(timeRange),
//             ReportService.fetchCoursePopularity(),
//             ReportService.fetchSystemPerformance(),
//           ]);

//         setUserActivityData(userActivity);
//         setCoursePopularityData(coursePopularity);
//         setSystemPerformanceData(systemPerformance);
//       } catch (error) {
//         console.error("Error loading reports:", error);
//         setError("Failed to load reports. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadReports();
//   }, [timeRange]);

//   const handleExport = async (reportType) => {
//     try {
//       setError(null);
//       const blob = await ReportService.exportReport(reportType, "pdf", {
//         timeRange,
//       });
//       saveAs(blob, `${reportType}_report.pdf`);
//       setSnackbarOpen(true);
//     } catch (err) {
//       console.error("Error exporting report:", err);
//       setError(err.message || "Failed to export report.");
//     }
//   };

//   const userActivityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "User Activity Over Time",
//         font: {
//           size: 16
//         }
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         }
//       },
//       x: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         }
//       }
//     }
//   };

//   const coursePopularityChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Course Popularity",
//         font: {
//           size: 16
//         }
//       },
//     }
//   };

//   const systemPerformanceChartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "System Performance Metrics",
//         font: {
//           size: 16
//         }
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         }
//       },
//       x: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         }
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <Container
//         maxWidth="lg"
//         sx={{
//           mt: 4,
//           mb: 4,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "80vh",
//         }}
//       >
//         <CircularProgress size={80} thickness={4} sx={{ color: 'primary.main' }} />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       {error && (
//         <Alert severity="error" sx={{ 
//           mb: 3,
//           borderRadius: 2,
//           bgcolor: 'error.light',
//           color: 'error.dark'
//         }}>
//           {error}
//         </Alert>
//       )}

//       <Card sx={{ 
//         mb: 4,
//         borderRadius: 3,
//         boxShadow: '0 4px 20px rgba(69, 147, 255, 0.1)',
//         border: '1px solid rgba(145, 185, 255, 0.2)'
//       }}>
//         <CardHeader
//           avatar={
//             <Avatar sx={{ 
//               bgcolor: 'primary.light',
//               width: 56,
//               height: 56
//             }}>
//               <TimelineIcon fontSize="large" />
//             </Avatar>
//           }
//           title={
//             <Typography variant="h4" sx={{ 
//               color: 'primary.dark',
//               fontWeight: 700
//             }}>
//               System Reports Dashboard
//             </Typography>
//           }
//           subheader={
//             <Typography variant="body1" sx={{ 
//               color: 'text.secondary'
//             }}>
//               Analyze and export system performance metrics
//             </Typography>
//           }
//           action={
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 onClick={() => handleExport("user_activity")}
//                 disabled={!userActivityData}
//                 sx={{
//                   bgcolor: 'primary.light',
//                   color: 'primary.dark',
//                   '&:hover': {
//                     bgcolor: 'primary.main',
//                     color: 'white'
//                   },
//                   borderRadius: 2,
//                   px: 3,
//                   textTransform: 'none'
//                 }}
//               >
//                 Export User Activity
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 onClick={() => handleExport("course_popularity")}
//                 disabled={!coursePopularityData}
//                 sx={{
//                   bgcolor: 'primary.light',
//                   color: 'primary.dark',
//                   '&:hover': {
//                     bgcolor: 'primary.main',
//                     color: 'white'
//                   },
//                   borderRadius: 2,
//                   px: 3,
//                   textTransform: 'none'
//                 }}
//               >
//                 Export Courses
//               </Button>
//             </Box>
//           }
//           sx={{ p: 3 }}
//         />
//         <Divider />
//         <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
//           <Typography variant="body1" sx={{ 
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             color: 'text.secondary'
//           }}>
//             <CalendarIcon color="primary" />
//             Time Range:
//           </Typography>
//           <FormControl sx={{ minWidth: 200 }}>
//             <InputLabel id="time-range-label">Select Range</InputLabel>
//             <Select
//               labelId="time-range-label"
//               value={timeRange}
//               label="Select Range"
//               onChange={(e) => setTimeRange(e.target.value)}
//               sx={{
//                 borderRadius: 2,
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'primary.light'
//                 }
//               }}
//             >
//               <MenuItem value="daily">Daily</MenuItem>
//               <MenuItem value="weekly">Weekly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//               <MenuItem value="yearly">Yearly</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Card>

//       <Grid container spacing={3}>
//         {/* User Activity Chart */}
//         <Grid item xs={12} md={8} lg={9}>
//           <Paper
//             sx={{
//               p: 3,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {userActivityData ? (
//               <LineChart
//                 options={userActivityChartOptions}
//                 data={{
//                   labels: userActivityData.labels,
//                   datasets: [
//                     {
//                       label: "Active Users",
//                       data: userActivityData.activeUsers,
//                       borderColor: "rgb(69, 147, 255)",
//                       backgroundColor: "rgba(69, 147, 255, 0.2)",
//                       borderWidth: 2,
//                       tension: 0.3,
//                       pointBackgroundColor: 'rgb(69, 147, 255)',
//                       pointRadius: 4
//                     },
//                     {
//                       label: "New Signups",
//                       data: userActivityData.newSignups,
//                       borderColor: "rgb(100, 181, 246)",
//                       backgroundColor: "rgba(100, 181, 246, 0.2)",
//                       borderWidth: 2,
//                       tension: 0.3,
//                       pointBackgroundColor: 'rgb(100, 181, 246)',
//                       pointRadius: 4
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 height: '100%',
//                 color: 'text.secondary'
//               }}>
//                 <TimelineIcon sx={{ fontSize: 60, mb: 2 }} />
//                 <Typography>No user activity data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* Course Popularity Chart */}
//         <Grid item xs={12} md={4} lg={3}>
//           <Paper
//             sx={{
//               p: 3,
//               display: "flex",
//               flexDirection: "column",
//               height: 400,
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {coursePopularityData ? (
//               <PieChart
//                 options={coursePopularityChartOptions}
//                 data={{
//                   labels: coursePopularityData.labels,
//                   datasets: [
//                     {
//                       label: "Enrollments",
//                       data: coursePopularityData.enrollments,
//                       backgroundColor: [
//                         "rgba(69, 147, 255, 0.7)",
//                         "rgba(100, 181, 246, 0.7)",
//                         "rgba(30, 136, 229, 0.7)",
//                         "rgba(13, 71, 161, 0.7)",
//                         "rgba(1, 87, 155, 0.7)",
//                       ],
//                       borderColor: [
//                         "rgba(69, 147, 255, 1)",
//                         "rgba(100, 181, 246, 1)",
//                         "rgba(30, 136, 229, 1)",
//                         "rgba(13, 71, 161, 1)",
//                         "rgba(1, 87, 155, 1)",
//                       ],
//                       borderWidth: 1,
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 height: '100%',
//                 color: 'text.secondary'
//               }}>
//                 <CourseIcon sx={{ fontSize: 60, mb: 2 }} />
//                 <Typography>No course popularity data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* System Performance Chart */}
//         <Grid item xs={12}>
//           <Paper 
//             sx={{ 
//               p: 3, 
//               display: "flex", 
//               flexDirection: "column",
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {systemPerformanceData ? (
//               <BarChart
//                 options={systemPerformanceChartOptions}
//                 data={{
//                   labels: systemPerformanceData.labels,
//                   datasets: [
//                     {
//                       label: "Response Time (ms)",
//                       data: systemPerformanceData.responseTimes,
//                       backgroundColor: "rgba(69, 147, 255, 0.7)",
//                       borderRadius: 3
//                     },
//                     {
//                       label: "Uptime (%)",
//                       data: systemPerformanceData.uptimePercentages,
//                       backgroundColor: "rgba(100, 181, 246, 0.7)",
//                       borderRadius: 3
//                     },
//                   ],
//                 }}
//               />
//             ) : (
//               <Box sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center', 
//                 justifyContent: 'center',
//                 height: 300,
//                 color: 'text.secondary'
//               }}>
//                 <PerformanceIcon sx={{ fontSize: 60, mb: 2 }} />
//                 <Typography>No system performance data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={() => setSnackbarOpen(false)}
//           severity="success"
//           sx={{ 
//             width: '100%',
//             borderRadius: 2,
//             bgcolor: 'primary.50',
//             color: 'primary.dark',
//             border: '1px solid',
//             borderColor: 'primary.100'
//           }}
//           icon={false}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <DownloadIcon color="primary" fontSize="small" />
//             Report exported successfully!
//           </Box>
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ReportManagement;


import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardHeader,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Bar as BarChart,
  Line as LineChart,
  Pie as PieChart,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";
import ReportService from "../../../../services/reportService";
import { saveAs } from "file-saver";
import {
  Timeline as TimelineIcon,
  School as CourseIcon,
  Speed as PerformanceIcon,
  Download as DownloadIcon,
  CalendarMonth as CalendarIcon
} from "@mui/icons-material";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const ReportManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [timeRange, setTimeRange] = useState("monthly");
  const [userActivityData, setUserActivityData] = useState(null);
  const [coursePopularityData, setCoursePopularityData] = useState(null);
  const [systemPerformanceData, setSystemPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const [userActivity, coursePopularity, systemPerformance] =
          await Promise.all([
            ReportService.fetchUserActivity(timeRange),
            ReportService.fetchCoursePopularity(),
            ReportService.fetchSystemPerformance(),
          ]);

        setUserActivityData(userActivity);
        setCoursePopularityData(coursePopularity);
        setSystemPerformanceData(systemPerformance);
      } catch (error) {
        console.error("Error loading reports:", error);
        setError("Failed to load reports. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [timeRange]);

  const handleExport = async (reportType) => {
    try {
      setError(null);
      const blob = await ReportService.exportReport(reportType, "pdf", {
        timeRange,
      });
      saveAs(blob, `${reportType}_report.pdf`);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Error exporting report:", err);
      setError(err.message || "Failed to export report.");
    }
  };

  const getChartOptions = (title) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: isMobile ? 14 : 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    }
  });

  const chartHeight = isMobile ? 250 : isTablet ? 300 : 350;

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={80} thickness={4} sx={{ color: 'primary.main' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ 
          mb: 3,
          borderRadius: 2,
          bgcolor: 'error.light',
          color: 'error.dark'
        }}>
          {error}
        </Alert>
      )}

      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(69, 147, 255, 0.1)',
        border: '1px solid rgba(145, 185, 255, 0.2)'
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ 
              bgcolor: 'primary.light',
              width: isMobile ? 40 : 56,
              height: isMobile ? 40 : 56
            }}>
              <TimelineIcon fontSize={isMobile ? "medium" : "large"} />
            </Avatar>
          }
          title={
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ 
              color: 'primary.dark',
              fontWeight: 700
            }}>
              System Reports Dashboard
            </Typography>
          }
          subheader={
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}>
              Analyze and export system performance metrics
            </Typography>
          }
          action={
            !isMobile && (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("user_activity")}
                  disabled={!userActivityData}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  Export User Activity
                </Button>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("course_popularity")}
                  disabled={!coursePopularityData}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.dark',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white'
                    },
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontSize: '0.875rem'
                  }}
                >
                  Export Courses
                </Button>
              </Box>
            )
          }
          sx={{ p: isMobile ? 2 : 3 }}
        />
        <Divider />
        <Box sx={{ p: isMobile ? 2 : 3, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary',
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}>
            <CalendarIcon color="primary" fontSize={isMobile ? "small" : "medium"} />
            Time Range:
          </Typography>
          <FormControl sx={{ minWidth: isMobile ? '100%' : 200 }}>
            <InputLabel id="time-range-label" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Select Range</InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              label="Select Range"
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.light'
                },
                fontSize: isMobile ? '0.875rem' : '1rem'
              }}
              size={isMobile ? "small" : "medium"}
            >
              <MenuItem value="daily" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Daily</MenuItem>
              <MenuItem value="weekly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Weekly</MenuItem>
              <MenuItem value="monthly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Monthly</MenuItem>
              <MenuItem value="yearly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Yearly</MenuItem>
            </Select>
          </FormControl>
          {isMobile && (
            <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 2 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleExport("user_activity")}
                disabled={!userActivityData}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  },
                  borderRadius: 2,
                  px: 2,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  flex: 1
                }}
              >
                Export Users
              </Button>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => handleExport("course_popularity")}
                disabled={!coursePopularityData}
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.dark',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  },
                  borderRadius: 2,
                  px: 2,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  flex: 1
                }}
              >
                Export Courses
              </Button>
            </Box>
          )}
        </Box>
      </Card>

      <Grid container spacing={3} sx={{display:"flex", flexDirection:"column"}}>
        {/* User Activity Chart */}
        <Grid item>
          <Paper
            sx={{
              p: isMobile ? 2 : 3,
              display: "flex",
              flexDirection: "column",
              height: chartHeight,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(145, 185, 255, 0.2)',
              bgcolor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            {userActivityData ? (
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <LineChart
                  options={getChartOptions("User Activity Over Time")}
                  data={{
                    labels: userActivityData.labels,
                    datasets: [
                      {
                        label: "Active Users",
                        data: userActivityData.activeUsers,
                        borderColor: "rgb(69, 147, 255)",
                        backgroundColor: "rgba(69, 147, 255, 0.2)",
                        borderWidth: 2,
                        tension: 0.3,
                        pointBackgroundColor: 'rgb(69, 147, 255)',
                        pointRadius: isMobile ? 3 : 4
                      },
                      {
                        label: "New Signups",
                        data: userActivityData.newSignups,
                        borderColor: "rgb(100, 181, 246)",
                        backgroundColor: "rgba(100, 181, 246, 0.2)",
                        borderWidth: 2,
                        tension: 0.3,
                        pointBackgroundColor: 'rgb(100, 181, 246)',
                        pointRadius: isMobile ? 3 : 4
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary'
              }}>
                <TimelineIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
                <Typography variant={isMobile ? "body2" : "body1"}>No user activity data available</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Course Popularity Chart */}
        <Grid item>
          <Paper
            sx={{
              p: isMobile ? 2 : 3,
              display: "flex",
              flexDirection: "column",
              height: chartHeight,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(145, 185, 255, 0.2)',
              bgcolor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            {coursePopularityData ? (
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <PieChart
                  options={getChartOptions("Course Popularity")}
                  data={{
                    labels: coursePopularityData.labels,
                    datasets: [
                      {
                        label: "Enrollments",
                        data: coursePopularityData.enrollments,
                        backgroundColor: [
                          "rgba(69, 147, 255, 0.7)",
                          "rgba(100, 181, 246, 0.7)",
                          "rgba(30, 136, 229, 0.7)",
                          "rgba(13, 71, 161, 0.7)",
                          "rgba(1, 87, 155, 0.7)",
                        ],
                        borderColor: [
                          "rgba(69, 147, 255, 1)",
                          "rgba(100, 181, 246, 1)",
                          "rgba(30, 136, 229, 1)",
                          "rgba(13, 71, 161, 1)",
                          "rgba(1, 87, 155, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary'
              }}>
                <CourseIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
                <Typography variant={isMobile ? "body2" : "body1"}>No course popularity data available</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* System Performance Chart */}
        <Grid item>
          <Paper 
            sx={{ 
              p: isMobile ? 2 : 3, 
              display: "flex", 
              flexDirection: "column",
              height: chartHeight,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(145, 185, 255, 0.2)',
              bgcolor: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            {systemPerformanceData ? (
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <BarChart
                  options={getChartOptions("System Performance Metrics")}
                  data={{
                    labels: systemPerformanceData.labels,
                    datasets: [
                      {
                        label: "Response Time (ms)",
                        data: systemPerformanceData.responseTimes,
                        backgroundColor: "rgba(69, 147, 255, 0.7)",
                        borderRadius: 3
                      },
                      {
                        label: "Uptime (%)",
                        data: systemPerformanceData.uptimePercentages,
                        backgroundColor: "rgba(100, 181, 246, 0.7)",
                        borderRadius: 3
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary'
              }}>
                <PerformanceIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
                <Typography variant={isMobile ? "body2" : "body1"}>No system performance data available</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: isMobile ? 'center' : 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ 
            width: '100%',
            borderRadius: 2,
            bgcolor: 'primary.50',
            color: 'primary.dark',
            border: '1px solid',
            borderColor: 'primary.100'
          }}
          icon={false}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DownloadIcon color="primary" fontSize="small" />
            <Typography variant={isMobile ? "body2" : "body1"}>
              Report exported successfully!
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReportManagement;