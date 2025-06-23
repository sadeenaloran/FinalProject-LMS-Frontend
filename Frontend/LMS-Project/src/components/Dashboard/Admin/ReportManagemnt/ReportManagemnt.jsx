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
//   Divider,
//   useTheme,
//   useMediaQuery
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
// import ReportService from "../../../../services/reportService";
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
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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

//   const getChartOptions = (title) => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: isMobile ? 'bottom' : 'top',
//       },
//       title: {
//         display: true,
//         text: title,
//         font: {
//           size: isMobile ? 14 : 16
//         }
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         },
//         ticks: {
//           font: {
//             size: isMobile ? 10 : 12
//           }
//         }
//       },
//       x: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.05)'
//         },
//         ticks: {
//           font: {
//             size: isMobile ? 10 : 12
//           }
//         }
//       }
//     }
//   });

//   const chartHeight = isMobile ? 250 : isTablet ? 300 : 350;

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
//               width: isMobile ? 40 : 56,
//               height: isMobile ? 40 : 56
//             }}>
//               <TimelineIcon fontSize={isMobile ? "medium" : "large"} />
//             </Avatar>
//           }
//           title={
//             <Typography variant={isMobile ? "h5" : "h4"} sx={{
//               color: 'primary.dark',
//               fontWeight: 700
//             }}>
//               System Reports Dashboard
//             </Typography>
//           }
//           subheader={
//             <Typography variant="body1" sx={{
//               color: 'text.secondary',
//               fontSize: isMobile ? '0.875rem' : '1rem'
//             }}>
//               Analyze and export system performance metrics
//             </Typography>
//           }
//           action={
//             !isMobile && (
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={() => handleExport("user_activity")}
//                   disabled={!userActivityData}
//                   sx={{
//                     bgcolor: 'primary.light',
//                     color: 'primary.dark',
//                     '&:hover': {
//                       bgcolor: 'primary.main',
//                       color: 'white'
//                     },
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: 'none',
//                     fontSize: '0.875rem'
//                   }}
//                 >
//                   Export User Activity
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<DownloadIcon />}
//                   onClick={() => handleExport("course_popularity")}
//                   disabled={!coursePopularityData}
//                   sx={{
//                     bgcolor: 'primary.light',
//                     color: 'primary.dark',
//                     '&:hover': {
//                       bgcolor: 'primary.main',
//                       color: 'white'
//                     },
//                     borderRadius: 2,
//                     px: 3,
//                     textTransform: 'none',
//                     fontSize: '0.875rem'
//                   }}
//                 >
//                   Export Courses
//                 </Button>
//               </Box>
//             )
//           }
//           sx={{ p: isMobile ? 2 : 3 }}
//         />
//         <Divider />
//         <Box sx={{ p: isMobile ? 2 : 3, display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: 2 }}>
//           <Typography variant="body1" sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//             color: 'text.secondary',
//             fontSize: isMobile ? '0.875rem' : '1rem'
//           }}>
//             <CalendarIcon color="primary" fontSize={isMobile ? "small" : "medium"} />
//             Time Range:
//           </Typography>
//           <FormControl sx={{ minWidth: isMobile ? '100%' : 200 }}>
//             <InputLabel id="time-range-label" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Select Range</InputLabel>
//             <Select
//               labelId="time-range-label"
//               value={timeRange}
//               label="Select Range"
//               onChange={(e) => setTimeRange(e.target.value)}
//               sx={{
//                 borderRadius: 2,
//                 '& .MuiOutlinedInput-notchedOutline': {
//                   borderColor: 'primary.light'
//                 },
//                 fontSize: isMobile ? '0.875rem' : '1rem'
//               }}
//               size={isMobile ? "small" : "medium"}
//             >
//               <MenuItem value="daily" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Daily</MenuItem>
//               <MenuItem value="weekly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Weekly</MenuItem>
//               <MenuItem value="monthly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Monthly</MenuItem>
//               <MenuItem value="yearly" sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>Yearly</MenuItem>
//             </Select>
//           </FormControl>
//           {isMobile && (
//             <Box sx={{ display: 'flex', gap: 2, width: '100%', mt: 2 }}>
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
//                   px: 2,
//                   textTransform: 'none',
//                   fontSize: '0.75rem',
//                   flex: 1
//                 }}
//               >
//                 Export Users
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
//                   px: 2,
//                   textTransform: 'none',
//                   fontSize: '0.75rem',
//                   flex: 1
//                 }}
//               >
//                 Export Courses
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </Card>

//       <Grid container spacing={3} sx={{display:"flex", flexDirection:"column"}}>
//         {/* User Activity Chart */}
//         <Grid item>
//           <Paper
//             sx={{
//               p: isMobile ? 2 : 3,
//               display: "flex",
//               flexDirection: "column",
//               height: chartHeight,
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {userActivityData ? (
//               <Box sx={{ flex: 1, minHeight: 0 }}>
//                 <LineChart
//                   options={getChartOptions("User Activity Over Time")}
//                   data={{
//                     labels: userActivityData.labels,
//                     datasets: [
//                       {
//                         label: "Active Users",
//                         data: userActivityData.activeUsers,
//                         borderColor: "rgb(69, 147, 255)",
//                         backgroundColor: "rgba(69, 147, 255, 0.2)",
//                         borderWidth: 2,
//                         tension: 0.3,
//                         pointBackgroundColor: 'rgb(69, 147, 255)',
//                         pointRadius: isMobile ? 3 : 4
//                       },
//                       {
//                         label: "New Signups",
//                         data: userActivityData.newSignups,
//                         borderColor: "rgb(100, 181, 246)",
//                         backgroundColor: "rgba(100, 181, 246, 0.2)",
//                         borderWidth: 2,
//                         tension: 0.3,
//                         pointBackgroundColor: 'rgb(100, 181, 246)',
//                         pointRadius: isMobile ? 3 : 4
//                       },
//                     ],
//                   }}
//                 />
//               </Box>
//             ) : (
//               <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%',
//                 color: 'text.secondary'
//               }}>
//                 <TimelineIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
//                 <Typography variant={isMobile ? "body2" : "body1"}>No user activity data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* Course Popularity Chart */}
//         <Grid item>
//           <Paper
//             sx={{
//               p: isMobile ? 2 : 3,
//               display: "flex",
//               flexDirection: "column",
//               height: chartHeight,
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {coursePopularityData ? (
//               <Box sx={{ flex: 1, minHeight: 0 }}>
//                 <PieChart
//                   options={getChartOptions("Course Popularity")}
//                   data={{
//                     labels: coursePopularityData.labels,
//                     datasets: [
//                       {
//                         label: "Enrollments",
//                         data: coursePopularityData.enrollments,
//                         backgroundColor: [
//                           "rgba(69, 147, 255, 0.7)",
//                           "rgba(100, 181, 246, 0.7)",
//                           "rgba(30, 136, 229, 0.7)",
//                           "rgba(13, 71, 161, 0.7)",
//                           "rgba(1, 87, 155, 0.7)",
//                         ],
//                         borderColor: [
//                           "rgba(69, 147, 255, 1)",
//                           "rgba(100, 181, 246, 1)",
//                           "rgba(30, 136, 229, 1)",
//                           "rgba(13, 71, 161, 1)",
//                           "rgba(1, 87, 155, 1)",
//                         ],
//                         borderWidth: 1,
//                       },
//                     ],
//                   }}
//                 />
//               </Box>
//             ) : (
//               <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%',
//                 color: 'text.secondary'
//               }}>
//                 <CourseIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
//                 <Typography variant={isMobile ? "body2" : "body1"}>No course popularity data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* System Performance Chart */}
//         <Grid item>
//           <Paper
//             sx={{
//               p: isMobile ? 2 : 3,
//               display: "flex",
//               flexDirection: "column",
//               height: chartHeight,
//               borderRadius: 3,
//               boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//               border: '1px solid rgba(145, 185, 255, 0.2)',
//               bgcolor: 'rgba(255, 255, 255, 0.7)'
//             }}
//           >
//             {systemPerformanceData ? (
//               <Box sx={{ flex: 1, minHeight: 0 }}>
//                 <BarChart
//                   options={getChartOptions("System Performance Metrics")}
//                   data={{
//                     labels: systemPerformanceData.labels,
//                     datasets: [
//                       {
//                         label: "Response Time (ms)",
//                         data: systemPerformanceData.responseTimes,
//                         backgroundColor: "rgba(69, 147, 255, 0.7)",
//                         borderRadius: 3
//                       },
//                       {
//                         label: "Uptime (%)",
//                         data: systemPerformanceData.uptimePercentages,
//                         backgroundColor: "rgba(100, 181, 246, 0.7)",
//                         borderRadius: 3
//                       },
//                     ],
//                   }}
//                 />
//               </Box>
//             ) : (
//               <Box sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100%',
//                 color: 'text.secondary'
//               }}>
//                 <PerformanceIcon sx={{ fontSize: isMobile ? 40 : 60, mb: 2 }} />
//                 <Typography variant={isMobile ? "body2" : "body1"}>No system performance data available</Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: isMobile ? 'center' : 'right' }}
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
//             <Typography variant={isMobile ? "body2" : "body1"}>
//               Report exported successfully!
//             </Typography>
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
  useMediaQuery,
  Chip,
  LinearProgress,
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
  CalendarMonth as CalendarIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
        position: isMobile ? "bottom" : "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: '"Poppins", sans-serif',
            size: isMobile ? 10 : 12,
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          family: '"Poppins", sans-serif',
          size: isMobile ? 14 : 16,
          weight: 600,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#1E293B",
        titleFont: {
          family: '"Poppins", sans-serif',
          size: 12,
          weight: 600,
        },
        bodyFont: {
          family: '"Poppins", sans-serif',
          size: 11,
        },
        padding: 10,
        cornerRadius: 8,
        displayColors: true,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        usePointStyle: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          font: {
            family: '"Poppins", sans-serif',
            size: isMobile ? 10 : 12,
          },
        },
      },
      x: {
        grid: {
          color:
            theme.palette.mode === "light"
              ? "rgba(0, 0, 0, 0.05)"
              : "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          font: {
            family: '"Poppins", sans-serif',
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
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
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={80}
            thickness={4}
            sx={{
              color: "primary.main",
              mb: 3,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
            }}
          >
            Loading Dashboard Data...
          </Typography>
          <LinearProgress
            color="primary"
            sx={{
              height: 6,
              borderRadius: 3,
              mt: 2,
              width: "60%",
              mx: "auto",
            }}
          />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt:7 }}>
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {error}
        </Alert>
      )}

      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: theme.shadows[4],
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(26, 140, 240, 0.03) 0%, rgba(255, 255, 255, 0.5) 100%)"
              : "linear-gradient(135deg, rgba(26, 140, 240, 0.1) 0%, rgba(30, 41, 59, 0.8) 100%)",
          border: `1px solid ${
            theme.palette.mode === "light"
              ? "rgba(26, 140, 240, 0.1)"
              : "rgba(255, 255, 255, 0.1)"
          }`,
          backdropFilter: "blur(8px)",
          overflow: "visible",
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #1A8CF0 0%, #4DABF5 100%)",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: isMobile ? 40 : 56,
                height: isMobile ? 40 : 56,
                boxShadow: theme.shadows[4],
              }}
            >
              <AnalyticsIcon fontSize={isMobile ? "medium" : "large"} />
            </Avatar>
          }
          title={
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                color: "text.primary",
                fontWeight: 700,
                fontFamily: '"Poppins", sans-serif',
                letterSpacing: "-0.5px",
              }}
            >
              Analytics Dashboard
            </Typography>
          }
          subheader={
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: isMobile ? "0.875rem" : "1rem",
                fontFamily: '"Poppins", sans-serif',
                mt: 0.5,
              }}
            >
              Comprehensive insights and performance metrics
            </Typography>
          }
          action={
            !isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="gradient"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("user_activity")}
                  disabled={!userActivityData}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Export User Activity
                </Button>
                <Button
                  variant="gradient"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("course_popularity")}
                  disabled={!coursePopularityData}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 600,
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  Export Courses
                </Button>
              </Box>
            )
          }
          sx={{
            p: isMobile ? 2 : 3,
            alignItems: "flex-start",
          }}
        />
        <Divider
          sx={{
            borderColor:
              theme.palette.mode === "light"
                ? "rgba(26, 140, 240, 0.1)"
                : "rgba(255, 255, 255, 0.1)",
            mx: isMobile ? 2 : 3,
          }}
        />
        <Box
          sx={{
            p: isMobile ? 2 : 3,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor:
                theme.palette.mode === "light" ? "primary.50" : "primary.900",
              p: 1.5,
              borderRadius: 2,
              boxShadow: theme.shadows[1],
            }}
          >
            <CalendarIcon
              color="primary"
              fontSize={isMobile ? "small" : "medium"}
              sx={{
                bgcolor:
                  theme.palette.mode === "light"
                    ? "primary.100"
                    : "primary.800",
                p: 0.5,
                borderRadius: "50%",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: isMobile ? "0.875rem" : "1rem",
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 500,
              }}
            >
              Time Range:
            </Typography>
          </Box>
          <FormControl sx={{ minWidth: isMobile ? "100%" : 200 }}>
            <InputLabel
              id="time-range-label"
              sx={{
                fontSize: isMobile ? "0.875rem" : "1rem",
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              Select Range
            </InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              label="Select Range"
              onChange={(e) => setTimeRange(e.target.value)}
              sx={{
                borderRadius: 2,
                fontFamily: '"Poppins", sans-serif',
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.light",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
                fontSize: isMobile ? "0.875rem" : "1rem",
                bgcolor:
                  theme.palette.mode === "light" ? "primary.50" : "primary.900",
              }}
              size={isMobile ? "small" : "medium"}
            >
              <MenuItem
                value="daily"
                sx={{
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Daily
              </MenuItem>
              <MenuItem
                value="weekly"
                sx={{
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Weekly
              </MenuItem>
              <MenuItem
                value="monthly"
                sx={{
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Monthly
              </MenuItem>
              <MenuItem
                value="yearly"
                sx={{
                  fontSize: isMobile ? "0.875rem" : "1rem",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                Yearly
              </MenuItem>
            </Select>
          </FormControl>
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                mt: 2,
              }}
            >
              <Button
                variant="gradient"
                startIcon={<DownloadIcon />}
                onClick={() => handleExport("user_activity")}
                disabled={!userActivityData}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  flex: 1,
                  boxShadow: theme.shadows[1],
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                Export Users
              </Button>
              <Button
                variant="gradient"
                startIcon={<DownloadIcon />}
                onClick={() => handleExport("course_popularity")}
                disabled={!coursePopularityData}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  textTransform: "none",
                  fontSize: "0.75rem",
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 600,
                  flex: 1,
                  boxShadow: theme.shadows[1],
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                  },
                }}
              >
                Export Courses
              </Button>
            </Box>
          )}
        </Box>
      </Card>

      <Grid
        container
        spacing={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {/* User Activity Chart */}
        <Grid item>
          <Paper
            sx={{
              p: isMobile ? 2 : 3,
              display: "flex",
              flexDirection: "column",
              height: chartHeight,
              borderRadius: 3,
              boxShadow: theme.shadows[4],
              border: `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(26, 140, 240, 0.1)"
                  : "rgba(255, 255, 255, 0.1)"
              }`,
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)"
                  : "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 1,
                bgcolor: "primary.light",
                borderBottomLeftRadius: 12,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PeopleIcon fontSize="small" sx={{ color: "primary.dark" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "primary.dark",
                  fontWeight: 600,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                USER ACTIVITY
              </Typography>
            </Box>
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
                        borderColor: theme.palette.primary.main,
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(26, 140, 240, 0.1)"
                            : "rgba(26, 140, 240, 0.2)",
                        borderWidth: 3,
                        tension: 0.3,
                        pointBackgroundColor: theme.palette.primary.main,
                        pointRadius: isMobile ? 3 : 4,
                        pointHoverRadius: isMobile ? 5 : 6,
                        fill: true,
                      },
                      {
                        label: "New Signups",
                        data: userActivityData.newSignups,
                        borderColor: theme.palette.secondary.main,
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(255, 152, 0, 0.1)"
                            : "rgba(255, 152, 0, 0.2)",
                        borderWidth: 3,
                        tension: 0.3,
                        pointBackgroundColor: theme.palette.secondary.main,
                        pointRadius: isMobile ? 3 : 4,
                        pointHoverRadius: isMobile ? 5 : 6,
                        fill: true,
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <TimelineIcon
                  sx={{
                    fontSize: isMobile ? 40 : 60,
                    mb: 2,
                    color:
                      theme.palette.mode === "light"
                        ? "primary.light"
                        : "primary.200",
                  }}
                />
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  No user activity data available
                </Typography>
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
              boxShadow: theme.shadows[4],
              border: `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(26, 140, 240, 0.1)"
                  : "rgba(255, 255, 255, 0.1)"
              }`,
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)"
                  : "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 1,
                bgcolor: "secondary.light",
                borderBottomLeftRadius: 12,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CourseIcon fontSize="small" sx={{ color: "secondary.dark" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "secondary.dark",
                  fontWeight: 600,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                COURSE POPULARITY
              </Typography>
            </Box>
            {coursePopularityData ? (
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <PieChart
                  options={{
                    ...getChartOptions("Course Popularity"),
                    plugins: {
                      ...getChartOptions("").plugins,
                      legend: {
                        ...getChartOptions("").plugins.legend,
                        position: isMobile ? "bottom" : "right",
                      },
                    },
                  }}
                  data={{
                    labels: coursePopularityData.labels,
                    datasets: [
                      {
                        label: "Enrollments",
                        data: coursePopularityData.enrollments,
                        backgroundColor: [
                          theme.palette.primary.main,
                          theme.palette.primary.light,
                          theme.palette.secondary.main,
                          theme.palette.secondary.light,
                          theme.palette.info.main,
                        ],
                        borderColor:
                          theme.palette.mode === "light"
                            ? "rgba(255, 255, 255, 0.8)"
                            : "rgba(0, 0, 0, 0.5)",
                        borderWidth: 1,
                        hoverOffset: 15,
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <CourseIcon
                  sx={{
                    fontSize: isMobile ? 40 : 60,
                    mb: 2,
                    color:
                      theme.palette.mode === "light"
                        ? "secondary.light"
                        : "secondary.200",
                  }}
                />
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  No course popularity data available
                </Typography>
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
              boxShadow: theme.shadows[4],
              border: `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(26, 140, 240, 0.1)"
                  : "rgba(255, 255, 255, 0.1)"
              }`,
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 0.8) 100%)"
                  : "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)",
              backdropFilter: "blur(8px)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 1,
                bgcolor: "info.light",
                borderBottomLeftRadius: 12,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PerformanceIcon fontSize="small" sx={{ color: "info.dark" }} />
              <Typography
                variant="caption"
                sx={{
                  color: "info.dark",
                  fontWeight: 600,
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                SYSTEM PERFORMANCE
              </Typography>
            </Box>
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
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(26, 140, 240, 0.7)"
                            : "rgba(100, 181, 246, 0.7)",
                        borderRadius: 4,
                        borderWidth: 0,
                        barPercentage: 0.6,
                      },
                      {
                        label: "Uptime (%)",
                        data: systemPerformanceData.uptimePercentages,
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(76, 175, 80, 0.7)"
                            : "rgba(129, 199, 132, 0.7)",
                        borderRadius: 4,
                        borderWidth: 0,
                        barPercentage: 0.6,
                      },
                    ],
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <PerformanceIcon
                  sx={{
                    fontSize: isMobile ? 40 : 60,
                    mb: 2,
                    color:
                      theme.palette.mode === "light"
                        ? "info.light"
                        : "info.200",
                  }}
                />
                <Typography
                  variant={isMobile ? "body2" : "body1"}
                  sx={{ fontFamily: '"Poppins", sans-serif' }}
                >
                  No system performance data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: 3,
            bgcolor: "success.light",
            color: "success.dark",
            boxShadow: theme.shadows[6],
            fontFamily: '"Poppins", sans-serif',
            alignItems: "center",
          }}
          iconMapping={{
            success: <DownloadIcon fontSize="inherit" color="success" />,
          }}
        >
          <Typography variant={isMobile ? "body2" : "body1"}>
            Report exported successfully!
          </Typography>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReportManagement;
