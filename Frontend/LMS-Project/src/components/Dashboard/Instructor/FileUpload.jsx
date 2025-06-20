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


import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ClearIcon from "@mui/icons-material/Clear";
 
const FileUpload = ({
  onFileUpload, // This should accept the secure_url from Cloudinary
  accept = "image/*",
  disabled = false,
  label = "Upload Thumbnail",
  currentFileUrl = null, // For showing existing thumbnail
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
 
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
 
    // Reset previous errors
    setError(null);
 
    // Validate file
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }
 
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setError("File size must be less than 5MB");
      return;
    }
 
    setSelectedFile(file);
    setIsUploading(true);
 
    try {
      const formData = new FormData();
      formData.append("file", file); // Matches your multer.single('file') config
 
      const response = await fetch("/api/attachments/upload", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary
      });
 
      if (!response.ok) {
        throw new Error((await response.text()) || "Upload failed");
      }
 
      const data = await response.json();
 
      if (data.attachment && data.attachment.secure_url) {
        onFileUpload(data.attachment.secure_url); // Pass the URL to parent
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(err.message);
      setSelectedFile(null);
    } finally {
      setIsUploading(false);
    }
  };
 
  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileUpload(null); // Notify parent to remove the thumbnail
  };
 
  return (
    <Box sx={{ mb: 2 }}>
      <input
        accept={accept}
        style={{ display: "none" }}
        id="file-upload-input"
        type="file"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
 
      {!selectedFile && !currentFileUrl ? (
        <label htmlFor="file-upload-input">
          <Button
            component="span"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            disabled={disabled || isUploading}
          >
            {label}
            {isUploading && <CircularProgress size={24} sx={{ ml: 1 }} />}
          </Button>
        </label>
      ) : (
        <Box>
          <List>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={handleRemoveFile}
                  disabled={disabled || isUploading}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText
                primary={selectedFile?.name || "Current thumbnail"}
                secondary={
                  selectedFile
                    ? `${(selectedFile.size / 1024).toFixed(2)} KB`
                    : "Uploaded image"
                }
              />
            </ListItem>
          </List>
 
          {currentFileUrl && !selectedFile && (
            <Box mt={2}>
              <img
                src={currentFileUrl}
                alt="Current thumbnail"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "4px",
                }}
              />
            </Box>
          )}
        </Box>
      )}
 
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};
 
export default FileUpload;