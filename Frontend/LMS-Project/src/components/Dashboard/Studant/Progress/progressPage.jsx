import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ModuleList from "./ModuleList";
import LessonViewer from "./lessonViewer";
import EnrollmentService from "../../services/EnrollemtServices";
import CourseService from "../../services/StudentService";

const ProgressPage = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Get course details with modules and lessons
        const courseData = await CourseService.getCourseDetails(courseId);
        setCourse(courseData);

        // 2. Get user enrollments to find the enrollment ID
        const enrollments = await EnrollmentService.getUserEnrollments();
        const courseEnrollment = enrollments.find(
          (e) => e.course_id == courseId
        );

        if (courseEnrollment) {
          setEnrollmentId(courseEnrollment.id);
          // 3. Get progress details
          const progressData = await EnrollmentService.getCourseProgressDetails(
            courseEnrollment.id
          );
          setProgress(progressData);
        }
      } catch (error) {
        console.error("Error loading progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleMarkLessonComplete = async (lessonId) => {
    try {
      await EnrollmentService.markLessonCompleted(lessonId);

      // Refresh progress data
      if (enrollmentId) {
        const updatedProgress =
          await EnrollmentService.getCourseProgressDetails(enrollmentId);
        setProgress(updatedProgress);
      }
    } catch (error) {
      console.error("Error marking lesson complete:", error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box p={3}>
        <Typography variant="h6">Course not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {course.title} - Your Progress
      </Typography>

      {/* Overall Progress */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overall Progress
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress?.overallProgress || 0}
            sx={{ height: 10, mb: 2 }}
          />
          <Typography>
            {Math.round(progress?.overallProgress || 0)}% Complete
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Modules
              </Typography>
              <ModuleList
                modules={course.modules || []}
                completedLessons={progress?.completedLessons || []}
                onLessonSelect={setSelectedLesson}
                onMarkComplete={handleMarkLessonComplete}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          {selectedLesson ? (
            <LessonViewer
              lesson={selectedLesson}
              onComplete={() => handleMarkLessonComplete(selectedLesson.id)}
              isCompleted={progress?.completedLessons?.some(
                (l) => l.lesson_id === selectedLesson.id
              )}
            />
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Select a lesson to view details
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProgressPage;
