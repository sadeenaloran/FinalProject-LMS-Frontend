// StudentEnrollmentDashboard.js
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
} from "@mui/material";
import {
  People as PeopleIcon,
  School as CourseIcon,
  BarChart as ChartIcon,
  Star as StarIcon,
  Person as PersonIcon,
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
} from "recharts";
import InstructorService from "../../../services/instructorService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const StudentEnrollmentDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [courseStats, setCourseStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const enrollmentResponse =
          await InstructorService.getAllEnrollmentsByInstructor();
        const rawEnrollments =
          enrollmentResponse.data.data || enrollmentResponse.data;
        // لو البيانات داخل data.data أو data فقط حسب الرد

        // تحويل أسماء الحقول من snake_case إلى camelCase
        const enrollments = rawEnrollments.map((item) => ({
          id: item.id,
          studentId: item.student_id,
          courseId: item.course_id,
          enrollmentDate: item.enrollmentdate,
          studentName: item.studentname,
          courseTitle: item.coursetitle,
          status: item.status || "active", // لو حابب تضيف status افتراضي
        }));

        // حساب الإحصائيات من نفس الداتا
        const stats = calculateCourseStats(enrollments);

        setEnrollments(enrollments);
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, display: "flex", alignItems: "center" }}
      >
        <PeopleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
        Student Enrollment Dashboard
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="All Students" icon={<PersonIcon />} />
        <Tab label="Course Stats" icon={<CourseIcon />} />
        <Tab label="Visualizations" icon={<ChartIcon />} />
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {activeTab === 0 && <AllStudentsTab enrollments={enrollments} />}
      {activeTab === 1 && <CourseStatsTab courseStats={courseStats} />}
      {activeTab === 2 && <VisualizationsTab courseStats={courseStats} />}
    </Box>
  );
};

// Tab Components
const AllStudentsTab = ({ enrollments }) => (
  <Paper elevation={2} sx={{ p: 2 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ display: "flex", alignItems: "center" }}
    >
      <PeopleIcon sx={{ mr: 1 }} />
      All Enrolled Students ({enrollments.length})
    </Typography>
    <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
      {enrollments.map((enrollment, index) => (
        <React.Fragment key={enrollment.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{enrollment.studentName?.charAt(0) || "?"}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={enrollment.studentName}
              secondary={
                <>
                  <span>{enrollment.courseTitle}</span>
                  <br />
                  <span>
                    Enrolled:{" "}
                    {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                  </span>
                </>
              }
            />
            <Chip
              label={enrollment.status}
              size="small"
              color={
                enrollment.status === "active"
                  ? "success"
                  : enrollment.status === "completed"
                  ? "primary"
                  : "default"
              }
            />
          </ListItem>
          {index < enrollments.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </React.Fragment>
      ))}
    </List>
  </Paper>
);

const CourseStatsTab = ({ courseStats }) => (
  <Grid container spacing={3}>
    {courseStats.map((course, index) => (
      <Grid item xs={12} sm={6} md={4} key={course.courseId}>
        <Card
          elevation={3}
          sx={{
            height: "100%",
            borderTop: index === 0 ? "4px solid #FFD700" : "4px solid #3f51b5",
          }}
        >
          <CardContent>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography variant="h6" component="div">
                {course.courseTitle}
              </Typography>
              {index === 0 && <StarIcon color="warning" fontSize="small" />}
            </Box>

            <Typography variant="body2" color="text.secondary" gutterBottom>
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
              <PeopleIcon color="primary" />
              <Typography variant="h5" component="div">
                {course.studentCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                students enrolled
              </Typography>
            </Box>

            {index === 0 && (
              <Chip
                label="Most Popular"
                color="warning"
                size="small"
                sx={{ mt: 1 }}
                icon={<TrendingUpIcon fontSize="small" />}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

const VisualizationsTab = ({ courseStats }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Enrollment Distribution
        </Typography>
        <PieChart width={500} height={300}>
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
          >
            {courseStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Paper>
    </Grid>

    <Grid item xs={12} md={6}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Enrollment Comparison
        </Typography>
        <BarChart
          width={500}
          height={300}
          data={courseStats}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="courseTitle" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="studentCount"
            name="Number of Students"
            fill="#3f51b5"
          />
        </BarChart>
      </Paper>
    </Grid>
  </Grid>
);

export default StudentEnrollmentDashboard;
