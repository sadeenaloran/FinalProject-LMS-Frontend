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
  CardContent,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Bar as BarChart,
  Line as LineChart,
  Pie as PieChart,
  Doughnut as DoughnutChart,
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
import {
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as CourseIcon,
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import ReportService from "../../services/reportService";
import { saveAs } from "file-saver";
import adminService from "../../services/adminService";

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

const DashboardDefaultContent = () => {
  const theme = useTheme();

  // Dashboard stats state
  const [stats, setStats] = useState({
    students: 0,
    instructors: 0,
    courses: 0,
    loading: true,
  });

  const [chartData, setChartData] = useState([]);

  // Report management state
  const [timeRange, setTimeRange] = useState("monthly");
  const [userActivityData, setUserActivityData] = useState(null);
  const [coursePopularityData, setCoursePopularityData] = useState(null);
  const [systemPerformanceData, setSystemPerformanceData] = useState(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Use theme colors instead of hardcoded colors
  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    error: theme.palette.error.main,
    purple: '#8B5CF6', // Violet - not in theme, keeping as fallback
    teal: '#14B8A6', // Teal - not in theme, keeping as fallback
    orange: '#F97316', // Orange - not in theme, keeping as fallback
  };

  // Fetch dashboard stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users data
        const users = await adminService.getAllUsers();

        // Count students and instructors
        const students = users.filter((user) => user.role === "student").length;
        const instructors = users.filter(
          (user) => user.role === "instructor"
        ).length;

        // Fetch courses data
        const coursesResponse = await ReportService.fetchCoursePopularity();
        const courses = coursesResponse.labels?.length || 0;

        setStats({
          students,
          instructors,
          courses,
          loading: false,
        });

        // Prepare chart data
        setChartData([
          { name: "Students", count: students },
          { name: "Instructors", count: instructors },
          { name: "Courses", count: courses },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  // Fetch report data
  useEffect(() => {
    const loadReports = async () => {
      try {
        setReportLoading(true);
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
        setReportLoading(false);
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
  const getRandomGradient = (index) => {
    const gradients = [
      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
    ];
    return gradients[index % gradients.length];
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: theme.typography.fontFamily,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.mode === 'light' ? "rgba(0, 0, 0, 0.8)" : "rgba(30, 41, 59, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: colors.primary,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
          },
          color: theme.palette.text.secondary,
        },
      },
      y: {
        grid: {
          color: alpha(theme.palette.text.secondary, 0.1),
        },
        ticks: {
          font: {
            family: theme.typography.fontFamily,
          },
          color: theme.palette.text.secondary,
        },
      },
    },
  };

  if (stats.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: theme.palette.background.default,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} sx={{ color: colors.primary, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading Dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: theme.palette.background.default,
        pb: 4,
        pt:5,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          // background: `linear-gradient(135deg, ${colors.primary} 0%, ${theme.palette.primary.dark} 100%)`,
           boxShadow: theme.shadows[2],
          background: getRandomGradient(0),
          color: "white",
          py: 6,
          px: 3,
          borderRadius: "0 0 24px 24px",
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="36" cy="12" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background:
                    "linear-gradient(45deg, #fff 30%, rgba(255,255,255,0.8) 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Admin Dashboard
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                Welcome back! Here's what's happening with your platform today.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  bgcolor: alpha("#fff", 0.1),
                  color: "white",
                  "&:hover": { bgcolor: alpha("#fff", 0.2) },
                }}
                onClick={() => window.location.reload()}
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: alpha("#fff", 0.1),
                  color: "white",
                  "&:hover": { bgcolor: alpha("#fff", 0.2) },
                }}
              >
                <AnalyticsIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Enhanced Stats Cards */}
        <Grid container spacing={3} sx={{mb: 6, display:"flex", justifyContent:"center"}}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${theme.palette.primary.dark} 100%)`,
                color: "white",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  transform: "translate(30px, -30px)",
                },
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, fontSize: "0.875rem" }}
                    >
                      Total Students
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, lineHeight: 1 }}
                    >
                      {stats.students.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Active learners
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${theme.palette.secondary.dark} 100%)`,
                color: "white",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  transform: "translate(30px, -30px)",
                },
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, fontSize: "0.875rem" }}
                    >
                      Total Instructors
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, lineHeight: 1 }}
                    >
                      {stats.instructors.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Expert educators
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${colors.success} 0%, ${theme.palette.success.dark} 100%)`,
                color: "white",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                  transform: "translate(30px, -30px)",
                },
              }}
            >
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: alpha("#fff", 0.2),
                      color: "white",
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    <CourseIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.8, fontSize: "0.875rem" }}
                    >
                      Total Courses
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, lineHeight: 1 }}
                    >
                      {stats.courses.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Learning paths
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Enhanced System Overview Chart */}
        <Card
          elevation={0}
          sx={{
            mb: 6,
            borderRadius: 3,
            border: "1px solid",
            borderColor: theme.palette.divider,
            background: theme.palette.background.paper,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  System Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Platform statistics and growth metrics
                </Typography>
              </Box>
              <Chip
                label="Live Data"
                color="success"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            </Box>
            <Box sx={{ height: 350 }}>
              {chartData.length > 0 ? (
                <BarChart
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: {
                        display: false,
                      },
                    },
                  }}
                  data={{
                    labels: chartData.map((item) => item.name),
                    datasets: [
                      {
                        label: "Count",
                        data: chartData.map((item) => item.count),
                        backgroundColor: [
                          alpha(colors.primary, 0.8),
                          alpha(colors.secondary, 0.8),
                          alpha(colors.success, 0.8),
                        ],
                        borderColor: [
                          colors.primary,
                          colors.secondary,
                          colors.success,
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                      },
                    ],
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress sx={{ color: colors.primary }} />
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Enhanced Reports Section */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: "1px solid",
            borderColor: theme.palette.divider,
            background: theme.palette.background.paper,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Reports Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 4,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  Analytics & Reports
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Comprehensive insights into platform performance and user
                  engagement
                </Typography>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="time-range-label">Time Range</InputLabel>
                  <Select
                    labelId="time-range-label"
                    value={timeRange}
                    label="Time Range"
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("user_activity")}
                  disabled={!userActivityData}
                  sx={{
                    borderRadius: 2,
                    borderColor: colors.primary,
                    color: colors.primary,
                    "&:hover": {
                      borderColor: colors.primary,
                      bgcolor: alpha(colors.primary, 0.04),
                    },
                  }}
                >
                  Export User Activity
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport("course_popularity")}
                  disabled={!coursePopularityData}
                  sx={{
                    borderRadius: 2,
                    borderColor: colors.secondary,
                    color: colors.secondary,
                    "&:hover": {
                      borderColor: colors.secondary,
                      bgcolor: alpha(colors.secondary, 0.04),
                    },
                  }}
                >
                  Export Course Data
                </Button>
              </Box>
            </Box>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {reportLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress
                    size={60}
                    sx={{ color: colors.primary, mb: 2 }}
                  />
                  <Typography variant="h6" color="text.secondary">
                    Loading Analytics...
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Grid container spacing={4} sx={{display:"flex", flexDirection:"column"}}>
                {/* User Activity Chart */}
                <Grid item >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: 450,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: theme.palette.divider,
                      background: theme.palette.background.paper,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <SpeedIcon sx={{ color: colors.info, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        User Activity Trends
                      </Typography>
                    </Box>
                    <Box sx={{ height: 350 }}>
                      {userActivityData ? (
                        <LineChart
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                              title: { display: false },
                            },
                          }}
                          data={{
                            labels: userActivityData.labels,
                            datasets: [
                              {
                                label: "Active Users",
                                data: userActivityData.activeUsers,
                                borderColor: colors.info,
                                backgroundColor: alpha(colors.info, 0.1),
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: colors.info,
                                pointBorderColor: theme.palette.background.paper,
                                pointBorderWidth: 2,
                                pointRadius: 6,
                              },
                              {
                                label: "New Signups",
                                data: userActivityData.newSignups,
                                borderColor: colors.teal,
                                backgroundColor: alpha(colors.teal, 0.1),
                                borderWidth: 3,
                                fill: true,
                                tension: 0.4,
                                pointBackgroundColor: colors.teal,
                                pointBorderColor: theme.palette.background.paper,
                                pointBorderWidth: 2,
                                pointRadius: 6,
                              },
                            ],
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1" color="text.secondary">
                            No user activity data available
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* Course Popularity Chart */}
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: 450,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: theme.palette.divider,
                      background: theme.palette.background.paper,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <CourseIcon sx={{ color: colors.secondary, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Course Popularity
                      </Typography>
                    </Box>
                    <Box sx={{ height: 350 }}>
                      {coursePopularityData ? (
                        <DoughnutChart
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                              title: { display: false },
                            },
                            cutout: "60%",
                          }}
                          data={{
                            labels: coursePopularityData.labels,
                            datasets: [
                              {
                                label: "Enrollments",
                                data: coursePopularityData.enrollments,
                                backgroundColor: [
                                  alpha(colors.secondary, 0.8),
                                  alpha(colors.purple, 0.8),
                                  alpha(colors.info, 0.8),
                                  alpha(colors.teal, 0.8),
                                  alpha(colors.orange, 0.8),
                                ],
                                borderColor: [
                                  colors.secondary,
                                  colors.purple,
                                  colors.info,
                                  colors.teal,
                                  colors.orange,
                                ],
                                borderWidth: 2,
                              },
                            ],
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1" color="text.secondary">
                            No course popularity data available
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>

                {/* System Performance Chart */}
                <Grid item>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: theme.palette.divider,
                      background: theme.palette.background.paper,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <AnalyticsIcon sx={{ color: colors.warning, mr: 1 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        System Performance Metrics
                      </Typography>
                    </Box>
                    <Box sx={{ height: 350 }}>
                      {systemPerformanceData ? (
                        <BarChart
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                              title: { display: false },
                            },
                          }}
                          data={{
                            labels: systemPerformanceData.labels,
                            datasets: [
                              {
                                label: "Response Time (ms)",
                                data: systemPerformanceData.responseTimes,
                                backgroundColor: alpha(colors.warning, 0.8),
                                borderColor: colors.warning,
                                borderWidth: 2,
                                borderRadius: 6,
                                borderSkipped: false,
                              },
                              {
                                label: "Uptime (%)",
                                data: systemPerformanceData.uptimePercentages,
                                backgroundColor: alpha(colors.success, 0.8),
                                borderColor: colors.success,
                                borderWidth: 2,
                                borderRadius: 6,
                                borderSkipped: false,
                              },
                            ],
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          <Typography variant="body1" color="text.secondary">
                            No system performance data available
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: 2,
          }}
        >
          Report exported successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardDefaultContent;