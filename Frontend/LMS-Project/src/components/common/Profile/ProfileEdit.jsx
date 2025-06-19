import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Avatar,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Close, CloudUpload } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import ProfileService from "../../../services/ProfileService";
const EditProfile = ({ open, onClose, user }) => {
//   const { updateUserProfile } = useAuth(); // Assume this exists in your AuthContext
const { currentUser, setCurrentUser } = useAuth();  
const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatarUrl: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.displayName || user.name || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatarUrl: user.photoURL || user.avatarUrl || "",
      });
      setPreviewUrl(user.photoURL || user.avatarUrl || "");
    }
  }, [user, open]); // Reset when user changes or dialog reopens

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    setAvatarFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "" };

    if (!userInfo.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const updatedData = {
//         displayName: userInfo.name,
//         email: userInfo.email,
//       };

//       // If there's a new avatar file, include it
//       const avatarData = avatarFile ? { avatarFile } : null;

//       await updateUserProfile(updatedData, avatarData);
//       onClose(true); // Pass true to indicate success
//     } catch (error) {
//       console.error("Profile update failed:", error);
//       // Handle specific errors here if needed
//     } finally {
//       setIsLoading(false);
//     }
//   };
 setIsLoading(true);
    try {
      // Use ProfileService instead of AuthContext's updateUserProfile
      const updatedUser = await ProfileService.updateProfile(
        {
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.avatarUrl
        },
        avatarFile
      );

      // Update the current user in context
      setCurrentUser({
        ...currentUser,
        displayName: updatedUser.name,
        email: updatedUser.email,
        photoURL: updatedUser.avatarUrl || previewUrl,
      });

      onClose(true);
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Edit Profile</span>
        <IconButton onClick={() => onClose(false)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
            pb: 1,
          }}
        >
          <label htmlFor="avatar-upload">
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
            <Avatar
              src={previewUrl}
              sx={{
                width: 100,
                height: 100,
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              {userInfo.name.charAt(0)}
            </Avatar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 1,
              }}
            >
              <CloudUpload color="action" sx={{ mr: 1 }} />
              <Typography variant="body2">Change Avatar</Typography>
            </Box>
          </label>

          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
             // Often email shouldn't be editable directly
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => onClose(false)} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;