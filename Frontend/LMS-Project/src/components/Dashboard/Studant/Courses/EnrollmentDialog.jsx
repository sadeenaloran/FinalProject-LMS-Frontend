// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { dialogStyles } from "../../../../assets/styles/studentStyle";

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: theme.shape.borderRadius * 2,
//     padding: theme.spacing(2),
//   },
// }));

// const EnrollmentDialog = ({ open, onClose, course, onEnroll }) => {
//   return (
//     <StyledDialog open={open} onClose={onClose}>
//       <DialogTitle sx={dialogStyles.title}>Enroll in Course</DialogTitle>
//       <DialogContent>
//         <DialogContentText sx={dialogStyles.contentText}>
//           Are you sure you want to enroll in <strong>{course?.title}</strong>?
//         </DialogContentText>
//         <DialogContentText sx={dialogStyles.noteText}>
//           This will give you access to all course materials and assignments.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions sx={dialogStyles.actions}>
//         <Button onClick={onClose} sx={dialogStyles.cancelButton}>
//           Cancel
//         </Button>
//         <Button
//           onClick={onEnroll}
//           color="primary"
//           variant="contained"
//           sx={dialogStyles.confirmButton}
//         >
//           Confirm Enrollment
//         </Button>
//       </DialogActions>
//     </StyledDialog>
//   );
// };

// export default EnrollmentDialog;


import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { dialogStyles } from "../../../../assets/styles/studentStyle";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius * 3,
    padding: theme.spacing(3),
    background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
    boxShadow: theme.shadows[10],
    border: `1px solid ${theme.palette.divider}`,
    minWidth: "400px",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  "&:hover": {
    boxShadow: theme.shadows[4],
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
  },
}));

const OutlinedButton = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.text.secondary}`,
  color: theme.palette.text.secondary,
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius * 2,
  "&:hover": {
    border: `2px solid ${theme.palette.text.primary}`,
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
  },
}));

const HighlightText = styled("strong")(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const EnrollmentDialog = ({ open, onClose, course, onEnroll }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <DialogTitle sx={{ 
          ...dialogStyles.title, 
          fontSize: "1.5rem", 
          fontWeight: 700,
          color: "primary.main",
          p: 0,
          mb: 1
        }}>
          Enroll in Course
        </DialogTitle>
        <Box sx={{ 
          height: "4px", 
          width: "60px", 
          background: `linear-gradient(90deg, ${dialogStyles.title.color}, transparent)`, 
          mx: "auto",
          borderRadius: 2
        }} />
      </Box>
      
      <DialogContent sx={{ textAlign: "center", px: 0 }}>
        <DialogContentText sx={{ 
          ...dialogStyles.contentText, 
          fontSize: "1.1rem",
          mb: 2
        }}>
          Are you sure you want to enroll in <HighlightText>{course?.title}</HighlightText>?
        </DialogContentText>
        <DialogContentText sx={{ 
          ...dialogStyles.noteText, 
          fontStyle: "italic",
          px: 4,
          color: "text.secondary"
        }}>
          This will give you access to all course materials and assignments.
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ 
        ...dialogStyles.actions, 
        justifyContent: "center",
        pt: 3,
        pb: 1
      }}>
        <OutlinedButton onClick={onClose} sx={{ mr: 2 }}>
          Cancel
        </OutlinedButton>
        <GradientButton
          onClick={onEnroll}
          color="primary"
          variant="contained"
        >
          Confirm Enrollment
        </GradientButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default EnrollmentDialog;