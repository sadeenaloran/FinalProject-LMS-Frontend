// import React from "react";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Typography,
//   Button,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { cardStyles } from "../../theme/studentStyle";

// const StyledCard = styled(Card)(({ theme }) => ({
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: theme.shadows[8],
//   },
// }));

// const CourseCard = ({
//   course,
//   isEnrolled,
//   onEnrollClick,
//   onViewProgressClick,
// }) => {
//   return (
//     <StyledCard>
//       <CardMedia
//         component="img"
//         height="140"
//         image={course.thumbnail_url || "/default-course.jpg"}
//         alt={course.title}
//         sx={cardStyles.media}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h6" component="h3">
//           {course.title}
//         </Typography>
//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={cardStyles.description}
//         >
//           {course.description.length > 100
//             ? `${course.description.substring(0, 100)}...`
//             : course.description}
//         </Typography>
//         <Typography variant="caption" display="block" sx={cardStyles.duration}>
//           Duration: {course.duration} weeks
//         </Typography>
//       </CardContent>
//       <CardActions sx={cardStyles.actions}>
//         {isEnrolled ? (
//           <Button
//             size="small"
//             color="primary"
//             variant="contained"
//             onClick={onViewProgressClick}
//             sx={cardStyles.progressButton}
//           >
//             Continue Progress
//           </Button>
//         ) : (
//           <Button
//             size="small"
//             color="primary"
//             variant="outlined"
//             onClick={() => onEnrollClick(course)}
//             sx={cardStyles.enrollButton}
//           >
//             Enroll Now
//           </Button>
//         )}
//       </CardActions>
//     </StyledCard>
//   );
// };

// export default CourseCard;


import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  LinearProgress,
  Box,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import { cardStyles } from "../../theme/studentStyle";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const CourseCard = ({
  course,
  isEnrolled,
  progress = 0,
  onEnrollClick,
  onViewProgressClick,
  showProgressButton = false,
}) => {
  const getButtonText = () => {
    if (!isEnrolled) return "Enroll Now";
    if (progress === 100) return "View Course";
    return showProgressButton ? "Continue Progress" : "View Progress";
  };

  const getButtonVariant = () => {
    if (!isEnrolled) return "outlined";
    if (showProgressButton) return "contained";
    return "outlined";
  };

  const handleButtonClick = () => {
    if (!isEnrolled) {
      onEnrollClick(course);
    } else {
      onViewProgressClick(course);
    }
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="140"
        image={course.thumbnail_url || "/default-course.jpg"}
        alt={course.title}
        sx={cardStyles.media}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom variant="h6" component="h3">
            {course.title}
          </Typography>
          {isEnrolled && progress === 100 && (
            <Chip label="Completed" size="small" color="success" />
          )}
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={cardStyles.description}
        >
          {course.description.length > 100
            ? `${course.description.substring(0, 100)}...`
            : course.description}
        </Typography>
        <Typography variant="caption" display="block" sx={cardStyles.duration}>
          Duration: {course.duration} weeks
        </Typography>
        
        {isEnrolled && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 8, borderRadius: 4, mb: 1 }}
            />
            <Typography variant="caption" color="text.secondary">
              {Math.round(progress)}% complete
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions sx={cardStyles.actions}>
        <Button
          size="small"
          color="primary"
          variant={getButtonVariant()}
          onClick={handleButtonClick}
          fullWidth
          sx={{
            ...(isEnrolled ? cardStyles.progressButton : cardStyles.enrollButton),
            ...(progress === 100 && {
              bgcolor: 'success.light',
              '&:hover': { bgcolor: 'success.main' }
            })
          }}
        >
          {getButtonText()}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CourseCard;