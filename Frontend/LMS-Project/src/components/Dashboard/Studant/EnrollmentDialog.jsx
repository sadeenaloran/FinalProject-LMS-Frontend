import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { dialogStyles } from "../../theme/studentStyle";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(2),
  },
}));

const EnrollmentDialog = ({ open, onClose, course, onEnroll }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={dialogStyles.title}>Enroll in Course</DialogTitle>
      <DialogContent>
        <DialogContentText sx={dialogStyles.contentText}>
          Are you sure you want to enroll in <strong>{course?.title}</strong>?
        </DialogContentText>
        <DialogContentText sx={dialogStyles.noteText}>
          This will give you access to all course materials and assignments.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={dialogStyles.actions}>
        <Button onClick={onClose} sx={dialogStyles.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={onEnroll}
          color="primary"
          variant="contained"
          sx={dialogStyles.confirmButton}
        >
          Confirm Enrollment
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default EnrollmentDialog;
