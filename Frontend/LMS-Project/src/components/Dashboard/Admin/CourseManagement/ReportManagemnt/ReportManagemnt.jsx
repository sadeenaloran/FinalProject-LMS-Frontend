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
import ReportService from "../../../../../services/reportService";
import { saveAs } from "file-saver";

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

  const userActivityChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "User Activity Over Time",
      },
    },
  };

  const coursePopularityChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Course Popularity",
      },
    },
  };

  const systemPerformanceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "System Performance Metrics",
      },
    },
  };

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
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            System Reports
          </Typography>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="time-range-label">Time Range</InputLabel>
            <Select
              labelId="time-range-label"
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={() => handleExport("user_activity")}
            sx={{ mr: 2 }}
            disabled={!userActivityData}
          >
            Export User Activity
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleExport("course_popularity")}
            disabled={!coursePopularityData}
          >
            Export Course Popularity
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* User Activity Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            {userActivityData ? (
              <LineChart
                options={userActivityChartOptions}
                data={{
                  labels: userActivityData.labels,
                  datasets: [
                    {
                      label: "Active Users",
                      data: userActivityData.activeUsers,
                      borderColor: "rgb(75, 192, 192)",
                      backgroundColor: "rgba(75, 192, 192, 0.5)",
                    },
                    {
                      label: "New Signups",
                      data: userActivityData.newSignups,
                      borderColor: "rgb(53, 162, 235)",
                      backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                  ],
                }}
              />
            ) : (
              <Typography>No user activity data available</Typography>
            )}
          </Paper>
        </Grid>

        {/* Course Popularity Chart */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 400,
            }}
          >
            {coursePopularityData ? (
              <PieChart
                options={coursePopularityChartOptions}
                data={{
                  labels: coursePopularityData.labels,
                  datasets: [
                    {
                      label: "Enrollments",
                      data: coursePopularityData.enrollments,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.7)",
                        "rgba(54, 162, 235, 0.7)",
                        "rgba(255, 206, 86, 0.7)",
                        "rgba(75, 192, 192, 0.7)",
                        "rgba(153, 102, 255, 0.7)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            ) : (
              <Typography>No course popularity data available</Typography>
            )}
          </Paper>
        </Grid>

        {/* System Performance Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            {systemPerformanceData ? (
              <BarChart
                options={systemPerformanceChartOptions}
                data={{
                  labels: systemPerformanceData.labels,
                  datasets: [
                    {
                      label: "Response Time (ms)",
                      data: systemPerformanceData.responseTimes,
                      backgroundColor: "rgba(255, 159, 64, 0.7)",
                    },
                    {
                      label: "Uptime (%)",
                      data: systemPerformanceData.uptimePercentages,
                      backgroundColor: "rgba(54, 162, 235, 0.7)",
                    },
                  ],
                }}
              />
            ) : (
              <Typography>No system performance data available</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Report exported successfully"
      />
    </Container>
  );
};

export default ReportManagement;
