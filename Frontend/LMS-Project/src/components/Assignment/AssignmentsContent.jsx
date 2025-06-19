import { Box, Typography, Chip } from '@mui/material';
// import AssignmentList from "@/components/Dashboard/Student/AssignmentList";

const AssignmentsContent = ({ assignments, pendingAssignments }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>My Assignments</Typography>
          <Typography variant="body1" color="text.secondary">
            All your current and past assignments
          </Typography>
        </Box>
        <Chip 
          label={`${pendingAssignments} Pending`} 
          color="error" 
          variant="outlined"
          sx={{ ml: 2 }}
        />
      </Box>
      <AssignmentList assignments={assignments} showAll />
    </Box>
  );
};

export default AssignmentsContent;