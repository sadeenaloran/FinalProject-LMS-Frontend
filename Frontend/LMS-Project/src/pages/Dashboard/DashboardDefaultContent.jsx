// import {
//   Box,
//   Typography,
// } from "@mui/material";

// const DashboardDefaultContent = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>
//       <Typography>
//         Welcome to the administration panel. Select a section from the sidebar.
//       </Typography>
//     </Box>
//   );
// };

// export default DashboardDefaultContent;

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Avatar,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  People as PeopleIcon,
  School as SchoolIcon,
  MenuBook as CourseIcon,
} from "@mui/icons-material";
import { useState } from "react";

const DashboardDefaultContent = () => {
  // Dummy data - no API calls needed
  const [stats] = useState({
    students: 1245,
    instructors: 42,
    courses: 87,
    loading: false, // Set to false since we're not loading anything
  });

  // No useEffect needed since we're using dummy data

  const chartData = [
    { name: "Students", count: stats.students },
    { name: "Instructors", count: stats.instructors },
    { name: "Courses", count: stats.courses },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Admin Dashboard
        </Typography>
        <Typography>
          Welcome to the administration panel. Select a section from the
          sidebar.
        </Typography>
      </Box>
      {/* Stats Cards - no loading state needed */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                <PeopleIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary">Students</Typography>
                <Typography variant="h4">
                  {stats.students.toLocaleString()}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                <SchoolIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary">Instructors</Typography>
                <Typography variant="h4">
                  {stats.instructors.toLocaleString()}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <CourseIcon />
              </Avatar>
              <div>
                <Typography color="textSecondary">Courses</Typography>
                <Typography variant="h4">
                  {stats.courses.toLocaleString()}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart */}
      <Card elevation={3} sx={{ height: 400 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overview
          </Typography>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardDefaultContent;
