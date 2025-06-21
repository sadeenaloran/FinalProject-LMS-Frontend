// import React, { useState } from "react";
// import {
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import ClearIcon from "@mui/icons-material/Clear";

// const FileUpload = ({
//   onFileUpload,
//   accept,
//   disabled,
//   multiple = false,
//   label = "Choose File",
// }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);

//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFileSelection(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFileSelection(e.target.files[0]);
//     }
//   };

//   const handleFileSelection = (file) => {
//     if (!file) return;

//     setSelectedFile(file);
//     setUploadProgress(0);

//     // Simulate upload progress (replace with actual upload logic)
//     //   const interval = setInterval(() => {
//     //     setUploadProgress((prev) => {
//     //       if (prev >= 100) {
//     //         clearInterval(interval);
//     //         onFileUpload(file);
//     //         return 100;
//     //       }
//     //       return prev + 10;
//     //     });
//     //   }, 200);
//     // };

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           // استدعي onFileUpload خارج setState لتجنب الخطأ
//           setTimeout(() => {
//             onFileUpload(file);
//           }, 0);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setUploadProgress(0);
//   };

//   return (
//     <Box
//       sx={{
//         border: isDragging ? "2px dashed #1976d2" : "2px dashed #ccc",
//         borderRadius: 1,
//         p: 3,
//         textAlign: "center",
//         backgroundColor: isDragging
//           ? "rgba(25, 118, 210, 0.04)"
//           : "transparent",
//         transition: "all 0.3s ease",
//       }}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDragOver={handleDragOver}
//       onDrop={handleDrop}
//     >
//       <input
//         accept={accept}
//         style={{ display: "none" }}
//         id="file-upload"
//         type="file"
//         onChange={handleFileChange}
//         disabled={disabled}
//         multiple={multiple}
//       />

//       {!selectedFile ? (
//         <>
//           <label htmlFor="file-upload">
//             <Button
//               component="span"
//               variant="outlined"
//               startIcon={<CloudUploadIcon />}
//               disabled={disabled}
//             >
//               {label}
//             </Button>
//           </label>
//           <Typography variant="body2" sx={{ mt: 1 }}>
//             or drag and drop file here
//           </Typography>
//         </>
//       ) : (
//         <Box>
//           <List>
//             <ListItem
//               secondaryAction={
//                 <IconButton
//                   edge="end"
//                   onClick={handleRemoveFile}
//                   disabled={disabled}
//                 >
//                   <ClearIcon />
//                 </IconButton>
//               }
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary={selectedFile.name}
//                 secondary={`${(selectedFile.size / 1024).toFixed(2)} KB`}
//               />
//             </ListItem>
//           </List>

//           {uploadProgress > 0 && uploadProgress < 100 && (
//             <Box sx={{ mt: 2 }}>
//               <CircularProgress variant="determinate" value={uploadProgress} />
//               <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                 Uploading: {uploadProgress}%
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default FileUpload;

import React from "react";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({
  accept,
  label,
  onFileUpload,
  disabled = false,
  currentFileUrl = null,
  fileType = "file",
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <input
        accept={accept}
        style={{ display: "none" }}
        id={`file-upload-${label.replace(/\s+/g, "-")}`}
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <label htmlFor={`file-upload-${label.replace(/\s+/g, "-")}`}>
        <Button
          component="span"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          disabled={disabled}
        >
          {label}
        </Button>
      </label>

      {currentFileUrl && (
        <Box mt={2}>
          {fileType === "image" ? (
            <img
              src={currentFileUrl}
              alt="Uploaded"
              style={{ maxWidth: "100%", maxHeight: 200 }}
            />
          ) : fileType === "video" ? (
            <video
              controls
              src={currentFileUrl}
              style={{ maxWidth: "100%", maxHeight: 200 }}
            />
          ) : (
            <Typography>
              <a
                href={currentFileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Uploaded File
              </a>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
