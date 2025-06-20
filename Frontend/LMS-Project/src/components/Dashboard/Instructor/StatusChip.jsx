// src/components/instructor/StatusChip.jsx
import React from "react";
import { Chip } from "@mui/material";

const statusColors = {
  pending: {
    color: "warning",
    label: "Pending",
  },
  approved: {
    color: "success",
    label: "Approved",
  },
  rejected: {
    color: "error",
    label: "Rejected",
  },
};

const StatusChip = ({ status }) => {
  const statusInfo = statusColors[status] || {
    color: "default",
    label: "Unknown",
  };

  return (
    <Chip
      label={statusInfo.label}
      color={statusInfo.color}
      size="small"
      variant="outlined"
    />
  );
};

export default StatusChip;
