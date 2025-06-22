// // import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Box,
//   Chip,
// } from "@mui/material";
// import { School, Assessment, Assignment } from "@mui/icons-material";

// const CourseCard = ({
//   course,
//   isEnrolled,
//   onEnrollClick,
//   onViewProgressClick,
//   onViewAssignmentsClick,
// }) => {
//   return (
//     <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//       <CardMedia
//        component="img"
//           height="160"
//           image={course.thumbnail_url || "/default-course.jpg"}
//           alt={course.title}
//           sx={{
//             objectFit: "cover",
//             filter: "brightness(0.95)",}}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="div">
//           {course.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {course.description.substring(0, 100)}...
//         </Typography>
//         <Box sx={{ mt: 1 }}>
//           <Chip
//             label={course.difficulty || "Beginner"}
//             size="small"
//             color="primary"
//             sx={{ mr: 1 }}
//           />
//           <Chip
//             label={`${course.duration || 0} hours`}
//             size="small"
//             color="secondary"
//           />
//         </Box>
//       </CardContent>
//       <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
//         {!isEnrolled ? (
//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={<School />}
//             onClick={() => onEnrollClick(course)}
//           >
//             Enroll
//           </Button>
//         ) : (
//           <>
//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<Assessment />}
//               onClick={() => onViewProgressClick(course)}
//             >
//               View Progress
//             </Button>
//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<Assignment />}
//               onClick={() => onViewAssignmentsClick(course)}
//               sx={{ mt: 1 }}
//             >
//               Assignments
//             </Button>
//           </>
//         )}
//       </Box>
//     </Card>
//   );
// };

// export default CourseCard;

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Button,
//   Box,
//   Chip,
//   IconButton,
//   Stack,
//   LinearProgress,
//   alpha,
// } from "@mui/material";
// import {
//   School,
//   Assessment,
//   Assignment,
//   BookmarkBorder,
//   Bookmark,
// } from "@mui/icons-material";
// import QuizIcon from "@mui/icons-material/Quiz";

// const CourseCard = ({
//   course,
//   isEnrolled,
//   onEnrollClick,
//   onViewProgressClick,
//   onViewAssignmentsClick,
//   onViewQuizzesClick,
// }) => {
//   const [isBookmarked, setIsBookmarked] = React.useState(false);

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty?.toLowerCase()) {
//       case "beginner":
//         return { color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" };
//       case "intermediate":
//         return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" };
//       case "advanced":
//         return { color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" };
//       default:
//         return { color: "#6366f1", bg: "rgba(99, 102, 241, 0.1)" };
//     }
//   };

//   return (
//     <Card
//       sx={{
//         height: 520,
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         borderRadius: "20px",
//         overflow: "hidden",
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         border: "1px solid rgba(99, 102, 241, 0.08)",
//         background: "linear-gradient(135deg, #ffffff 0%, #fafbff 100%)",
//         "&:hover": {
//           transform: "translateY(-8px)",
//           boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)",
//           "& .course-image": {
//             transform: "scale(1.05)",
//           },
//           "& .bookmark-btn": {
//             opacity: 1,
//           },
//         },
//       }}
//     >
//       <Box sx={{ position: "relative", overflow: "hidden", height: 180 }}>
//         <CardMedia
//           component="img"
//           height="180"
//           image={course.thumbnail_url || "/default-course.jpg"}
//           alt={course.title}
//           className="course-image"
//           sx={{
//             objectFit: "cover",
//             transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
//             filter: "brightness(0.95) saturate(1.1)",
//             height: "100%",
//             width: "100%",
//           }}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background:
//               "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
//           }}
//         />
//         <IconButton
//           className="bookmark-btn"
//           onClick={() => setIsBookmarked(!isBookmarked)}
//           sx={{
//             position: "absolute",
//             top: 12,
//             right: 12,
//             backgroundColor: "rgba(255, 255, 255, 0.9)",
//             backdropFilter: "blur(10px)",
//             opacity: 0,
//             transition: "all 0.3s ease",
//             "&:hover": {
//               backgroundColor: "rgba(255, 255, 255, 1)",
//               transform: "scale(1.1)",
//             },
//           }}
//         >
//           {isBookmarked ? (
//             <Bookmark sx={{ color: "#6366f1" }} />
//           ) : (
//             <BookmarkBorder sx={{ color: "#64748b" }} />
//           )}
//         </IconButton>
//       </Box>

//       <CardContent
//         sx={{ flexGrow: 1, p: 2.5, display: "flex", flexDirection: "column" }}
//       >
//         <Typography
//           gutterBottom
//           variant="h6"
//           component="div"
//           sx={{
//             fontWeight: 700,
//             color: "#1e293b",
//             lineHeight: 1.3,
//             mb: 1.5,
//             height: "2.6em",
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             fontSize: "1.1rem",
//           }}
//         >
//           {course.title}
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{
//             mb: 2,
//             lineHeight: 1.5,
//             height: "4.5em",
//             display: "-webkit-box",
//             WebkitLineClamp: 3,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             fontSize: "0.9rem",
//           }}
//         >
//           {course.description.length > 100
//             ? `${course.description.substring(0, 100)}...`
//             : course.description}
//         </Typography>

//         <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//           <Chip
//             label={course.difficulty || "Beginner"}
//             size="small"
//             sx={{
//               backgroundColor: getDifficultyColor(course.difficulty).bg,
//               color: getDifficultyColor(course.difficulty).color,
//               fontWeight: 600,
//               border: `1px solid ${alpha(
//                 getDifficultyColor(course.difficulty).color,
//                 0.2
//               )}`,
//               fontSize: "0.75rem",
//             }}
//           />
//           <Chip
//             label={`${course.duration || 0}h`}
//             size="small"
//             sx={{
//               backgroundColor: "rgba(6, 182, 212, 0.1)",
//               color: "#06b6d4",
//               fontWeight: 600,
//               border: "1px solid rgba(6, 182, 212, 0.2)",
//               fontSize: "0.75rem",
//             }}
//           />
//         </Stack>

//         {isEnrolled && (
//           <Box sx={{ mb: 2 }}>
//             <Stack
//               direction="row"
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ mb: 1 }}
//             >
//               <Typography
//                 variant="caption"
//                 sx={{ fontWeight: 600, color: "#64748b" }}
//               >
//                 Progress
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{ fontWeight: 600, color: "#6366f1" }}
//               >
//                 65%
//               </Typography>
//             </Stack>
//             <LinearProgress
//               variant="determinate"
//               value={65}
//               sx={{
//                 height: 6,
//                 borderRadius: 3,
//                 backgroundColor: "rgba(99, 102, 241, 0.1)",
//                 "& .MuiLinearProgress-bar": {
//                   borderRadius: 3,
//                   background:
//                     "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
//                 },
//               }}
//             />
//           </Box>
//         )}
//       </CardContent>

//       <Box sx={{ p: 2.5, pt: 0, mt: "auto" }}>
//         {!isEnrolled ? (
//           <Button
//             variant="contained"
//             fullWidth
//             startIcon={<School />}
//             onClick={() => onEnrollClick(course)}
//             sx={{
//               background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
//               color: "white",
//               fontWeight: 600,
//               py: 1.3,
//               borderRadius: "12px",
//               textTransform: "none",
//               fontSize: "0.95rem",
//               boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
//               "&:hover": {
//                 boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
//                 transform: "translateY(-1px)",
//               },
//             }}
//           >
//             Enroll Now
//           </Button>
//         ) : (
//           <Stack spacing={1}>
//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<Assessment />}
//               onClick={() => onViewProgressClick(course)}
//               sx={{
//                 borderColor: "#6366f1",
//                 color: "#6366f1",
//                 fontWeight: 600,
//                 py: 1,
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontSize: "0.9rem",
//                 "&:hover": {
//                   backgroundColor: "rgba(99, 102, 241, 0.08)",
//                   borderColor: "#6366f1",
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               View Progress
//             </Button>

//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<Assignment />}
//               onClick={() => onViewAssignmentsClick(course)}
//               sx={{
//                 borderColor: "#8b5cf6",
//                 color: "#8b5cf6",
//                 fontWeight: 600,
//                 py: 1,
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontSize: "0.9rem",
//                 "&:hover": {
//                   backgroundColor: "rgba(139, 92, 246, 0.08)",
//                   borderColor: "#8b5cf6",
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               Assignments
//             </Button>

//             {/* زر عرض الكويز */}
//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<QuizIcon />}
//               onClick={() => onViewQuizzesClick && onViewQuizzesClick(course)}
//               sx={{
//                 borderColor: "#10b981",
//                 color: "#10b981",
//                 fontWeight: 600,
//                 py: 1,
//                 borderRadius: "12px",
//                 textTransform: "none",
//                 fontSize: "0.9rem",
//                 "&:hover": {
//                   backgroundColor: "rgba(16, 185, 129, 0.08)",
//                   borderColor: "#10b981",
//                   transform: "translateY(-1px)",
//                 },
//               }}
//             >
//               Quizzes
//             </Button>
//           </Stack>
//         )}
//       </Box>
//     </Card>
//   );
// };

// export default CourseCard;

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Stack,
  LinearProgress,
  alpha,
  Avatar,
} from "@mui/material";
import {
  School,
  Assessment,
  Assignment,
  BookmarkBorder,
  Bookmark,
  PlayCircleOutline,
} from "@mui/icons-material";
import QuizIcon from "@mui/icons-material/Quiz";
import { useTheme } from "@mui/material/styles";

const CourseCard = ({
  course,
  isEnrolled,
  onEnrollClick,
  onViewProgressClick,
  onViewAssignmentsClick,
  onViewQuizzesClick,
}) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const theme = useTheme();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return { color: "success.main", bg: "success.light" };
      case "intermediate":
        return { color: "warning.main", bg: "warning.light" };
      case "advanced":
        return { color: "error.main", bg: "error.light" };
      default:
        return { color: "primary.main", bg: "primary.light" };
    }
  };

  return (
    <Card
      sx={{
        height: 520,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: 2,
        position: "relative",
        bgcolor: "background.paper",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
          "& .course-image": {
            transform: "scale(1.05)",
          },
          "& .bookmark-btn": {
            opacity: 1,
          },
          "& .play-icon": {
            opacity: 1,
            transform: "scale(1)",
          },
        },
      }}
    >
      {/* Course Image with Play Button Overlay */}
      <Box sx={{ position: "relative", overflow: "hidden", height: 180 }}>
        <CardMedia
          component="img"
          height="180"
          image={course.thumbnail_url || "/default-course.jpg"}
          alt={course.title}
          className="course-image"
          sx={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            height: "100%",
            width: "100%",
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Play Button (Center) */}
        <Box
          className="play-icon"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.9)",
            opacity: 0,
            transition: "all 0.3s ease",
          }}
        >
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.9),
              width: 56,
              height: 56,
              backdropFilter: "blur(4px)",
              "&:hover": {
                bgcolor: "primary.main",
                transform: "scale(1.1)",
              },
            }}
          >
            <PlayCircleOutline sx={{ fontSize: 32 }} />
          </Avatar>
        </Box>

        {/* Bookmark Button */}
        <IconButton
          className="bookmark-btn"
          onClick={() => setIsBookmarked(!isBookmarked)}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            opacity: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "background.paper",
              transform: "scale(1.1)",
            },
          }}
        >
          {isBookmarked ? (
            <Bookmark color="primary" />
          ) : (
            <BookmarkBorder sx={{ color: "text.secondary" }} />
          )}
        </IconButton>
      </Box>

      {/* Course Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Difficulty Ribbon */}
        <Box
          sx={{
            position: "absolute",
            top: -20,
            left: 16,
            bgcolor: getDifficultyColor(course.difficulty).bg,
            color: getDifficultyColor(course.difficulty).color,
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: 12,
            fontWeight: 700,
            textTransform: "uppercase",
            boxShadow: 1,
          }}
        >
          {course.difficulty || "Beginner"}
        </Box>

        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.3,
            mb: 2,
            height: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            height: "4.5em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {course.description.length > 100
            ? `${course.description.substring(0, 100)}...`
            : course.description}
        </Typography>

        {/* Course Meta */}
        <Box sx={{ mt: "auto", mb: 2 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<School fontSize="small" />}
              label={`${course.lessons || 0} Lessons`}
              size="small"
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.info.light, 0.2),
                color: "info.main",
                fontWeight: 600,
                border: "1px solid",
                borderColor: "info.light",
              }}
            />
            <Chip
              icon={<Assessment fontSize="small" />}
              label={`${course.duration || 0}h`}
              size="small"
              sx={{
                backgroundColor: alpha(theme.palette.success.light, 0.2),
                color: "success.main",
                fontWeight: 600,
                border: "1px solid",
                borderColor: "success.light",
              }}
            />
          </Stack>

          {isEnrolled && (
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: "text.secondary" }}
                >
                  Your Progress
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  65%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={65}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: alpha(theme.palette.primary.light, 0.5),
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 4,
                    background:
                      "linear-gradient(90deg, primary.main 0%, primary.dark 100%)",
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <Box sx={{ p: 3, pt: 0 }}>
        {!isEnrolled ? (
          <Button
            variant="gradient" // Using your custom gradient variant from theme
            fullWidth
            startIcon={<School />}
            onClick={() => onEnrollClick(course)}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              
              fontSize: "0.95rem",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          >
            Enroll Now
          </Button>
        ) : (
          <Stack spacing={1.5}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Assessment />}
              onClick={() => onViewProgressClick(course)}
              sx={{
                py: 1.25,
                borderRadius: 2,
                fontWeight: 600,
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Continue Learning
            </Button>

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Assignment />}
                onClick={() => onViewAssignmentsClick(course)}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: "secondary.main",
                  color: "secondary.main",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.light, 0.5),
                    borderColor: "secondary.dark",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Assignments
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<QuizIcon />}
                onClick={() => onViewQuizzesClick && onViewQuizzesClick(course)}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: "success.main",
                  color: "success.main",
                  "&:hover": {
    bgcolor: alpha(theme.palette.success.light, 0.1),
                    borderColor: "success.dark",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Quizzes
              </Button>
            </Stack>
          </Stack>
        )}
      </Box>
    </Card>
  );
};

export default CourseCard;
