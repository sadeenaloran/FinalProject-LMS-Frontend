// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Avatar,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   IconButton,
//    Collapse,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import {
//   AccountCircle,
//   Edit,
//   Logout,
//   ContactMail,
//   Help,
//   Close,
//   Settings as SettingsIcon,
// } from "@mui/icons-material";
// import { useAuth } from "../../../contexts/AuthContext";

// const Settings = () => {
//   const { user, logout } = useAuth(); // Get user data and logout function from auth context
//   const [openProfileDialog, setOpenProfileDialog] = useState(false);
//   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
//   const [passwordOpen, setPasswordOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     avatarUrl: "",
//   });

//   // Initialize user info when component mounts or user changes
//   useEffect(() => {
//     if (user) {
//       setUserInfo({
//         name:
//           user.displayName || user.name || user.email?.split("@")[0] || "User",
//         email: user.email || "",
//         avatarUrl: user.photoURL || user.avatarUrl || "",
//       });
//     }
//   }, [user]);

//   const [passwordInfo, setPasswordInfo] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const handleOpenProfileDialog = () => {
//     setOpenProfileDialog(true);
//   };

//   const handleCloseProfileDialog = () => {
//     setOpenProfileDialog(false);
//   };

//   const handleOpenPasswordDialog = () => {
//     setOpenPasswordDialog(true);
//   };
//   const handleClosePasswordDialog = () => {
//     setOpenPasswordDialog(false);
//     setPasswordInfo({
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleSaveProfile = () => {
//     try {
//       // Here you would typically make an API call to save the user info
//       console.log("Saved user info:", userInfo);
//       handleCloseProfileDialog();
//     } catch (error) {
//       console.error("Failed to update profile:", error);
//     }
//   };
//   const handleChangePassword = async () => {
//     if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
//       setSnackbar({
//         open: true,
//         message: "New passwords don't match!",
//         severity: "error",
//       });
//       return;
//     }

//     try {
//       const response = await authService.changePassword(
//         passwordInfo.currentPassword,
//         passwordInfo.newPassword,
//         passwordInfo.confirmPassword
//       );

//       if (response.success) {
//         setSnackbar({
//           open: true,
//           message: response.message,
//           severity: "success",
//         });
//         handleClosePasswordDialog();
//       }
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: error.message || "Failed to change password",
//         severity: "error",
//       });
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     console.log("User logged out");
//   };

//   const handleContact = () => {
//     // Handle contact action
//     console.log("Contact clicked");
//   };

//   const handleHelp = () => {
//     // Handle help action
//     console.log("Help clicked");
//   };
//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };
//   return (
//     <Box sx={{ maxWidth: 700, py: 5 }}>
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{ display: "flex", alignItems: "start" }}
//       >
//         <SettingsIcon sx={{ mr: 1 }} /> Settings
//       </Typography>

//       <List>
//         {/* Profile Section */}
//         <ListItem button onClick={handleOpenProfileDialog}>
//           <Divider />
//           <ListItemIcon>
//             <Avatar
//               src={userInfo.avatarUrl}
//               alt={userInfo.name}
//               sx={{ width: 33, height: 33 }}
//             >
//               {userInfo.name.charAt(0)}
//             </Avatar>
//           </ListItemIcon>
//           <ListItemText
//             primary="Profile"
//             secondary={`${userInfo.name} - ${userInfo.email}`}
//           />
//           <Edit color="action" />
//         </ListItem>
//         <Divider sx={{ my: 1 }} />

//         {/* Password Section */}
//         <ListItem button onClick={() => setPasswordOpen(!passwordOpen)}>
//           <ListItemIcon>
//             <Lock color="primary" />
//           </ListItemIcon>
//           <ListItemText primary="Password" />
//           {passwordOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={passwordOpen} timeout="auto" unmountOnExit>
//           <Box sx={{ pl: 4, pr: 2, pt: 1, pb: 2 }}>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={handleOpenPasswordDialog}
//             >
//               Change Password
//             </Button>
//           </Box>
//         </Collapse>

//         <Divider sx={{ my: 1 }} />

//         {/* Contact */}
//         <ListItem button onClick={handleContact}>
//           <ListItemIcon>
//             <ContactMail color="primary" />
//           </ListItemIcon>
//           <ListItemText primary="Contact Us" />
//         </ListItem>
//         <Divider sx={{ my: 1 }} />

//         {/* Help */}
//         <ListItem button onClick={handleHelp}>
//           <ListItemIcon>
//             <Help color="primary" />
//           </ListItemIcon>
//           <ListItemText primary="Help & Support" />
//         </ListItem>
//       </List>
//       <Divider sx={{ my: 1 }} />

//       {/* Logout */}
//       <ListItem button onClick={handleLogout}>
//         <ListItemIcon>
//           <Logout color="error" />
//         </ListItemIcon>
//         <ListItemText
//           primary="Logout"
//           primaryTypographyProps={{ color: "error" }}
//         />
//       </ListItem>

//       {/* Profile Edit Dialog */}
//       <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog}>
//         <DialogTitle
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>Edit Profile</span>
//           <IconButton onClick={handleCloseProfileDialog}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box
//             sx={{
//               maxWidth: 700,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               p: 2,
//             }}
//           >
//             <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
//               {userInfo.name.charAt(0)}
//             </Avatar>
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Full Name"
//               name="name"
//               value={userInfo.name}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               value={userInfo.email}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Phone Number"
//               name="phone"
//               value={userInfo.phone}
//               onChange={handleInputChange}
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseProfileDialog}>Cancel</Button>
//           <Button
//             onClick={handleSaveProfile}
//             variant="contained"
//             color="primary"
//           >
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Change Password Dialog */}
//       <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
//         <DialogTitle
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <span>Change Password</span>
//           <IconButton onClick={handleClosePasswordDialog}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ p: 2 }}>
//             <DialogContentText sx={{ mb: 3 }}>
//               Please enter your current password and set a new password.
//             </DialogContentText>
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Current Password"
//               name="currentPassword"
//               type="password"
//               value={passwordInfo.currentPassword}
//               onChange={handlePasswordChange}
//               required
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label="New Password"
//               name="newPassword"
//               type="password"
//               value={passwordInfo.newPassword}
//               onChange={handlePasswordChange}
//               required
//             />
//             <TextField
//               margin="normal"
//               fullWidth
//               label="Confirm New Password"
//               name="confirmPassword"
//               type="password"
//               value={passwordInfo.confirmPassword}
//               onChange={handlePasswordChange}
//               required
//               error={passwordInfo.newPassword !== passwordInfo.confirmPassword}
//               helperText={
//                 passwordInfo.newPassword !== passwordInfo.confirmPassword
//                   ? "Passwords don't match"
//                   : ""
//               }
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePasswordDialog}>Cancel</Button>
//           <Button
//             onClick={handleChangePassword}
//             variant="contained"
//             color="primary"
//             disabled={
//               !passwordInfo.currentPassword ||
//               !passwordInfo.newPassword ||
//               !passwordInfo.confirmPassword ||
//               passwordInfo.newPassword !== passwordInfo.confirmPassword
//             }
//           >
//             Change Password
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AccountCircle,
  Edit,
  Logout,
  ContactMail,
  Help,
  Close,
  Settings as SettingsIcon,
  Lock,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { authService } from "../../../services/authService";
import EditProfile from "../../../components/common/Profile/ProfileEdit";
const Settings = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    avatarUrl: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const handleProfileUpdate = (updatedUser) => {
    setUserInfo({
      ...userInfo,
      name: updatedUser.name,
      email: updatedUser.email,
      avatarUrl: updatedUser.avatarUrl || userInfo.avatarUrl,
    });
    setSnackbar({
      open: true,
      message: "Profile updated successfully",
      severity: "success",
    });
  };
  const handleOpenProfileDialog = () => {
    setOpenProfileDialog(true);
  };

  const handleCloseProfileDialog = () => {
    setOpenProfileDialog(false);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Saved user info:", userInfo);
    handleCloseProfileDialog();
  };

  const handleChangePassword = async () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      setSnackbar({
        open: true,
        message: "New passwords don't match!",
        severity: "error",
      });
      return;
    }

    try {
      const response = await authService.changePassword(
        passwordInfo.currentPassword,
        passwordInfo.newPassword,
        passwordInfo.confirmPassword
      );

      if (response.success) {
        setSnackbar({
          open: true,
          message: response.message,
          severity: "success",
        });
        handleClosePasswordDialog();
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Failed to change password",
        severity: "error",
      });
    }
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleContact = () => {
    console.log("Contact clicked");
  };

  const handleHelp = () => {
    console.log("Help clicked");
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 700, py: 5 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "start" }}
      >
        <SettingsIcon sx={{ mr: 1 }} /> Settings
      </Typography>

      <List>
        {/* Profile Section */}
        <ListItem button onClick={() => setEditProfileOpen(true)}>
          <ListItemIcon>
            <Avatar
              src={userInfo.avatarUrl}
              alt={userInfo.name}
              sx={{ width: 33, height: 33 }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            secondary={`${userInfo.name} - ${userInfo.email}`}
          />
          <Edit color="action" />
        </ListItem>
        <EditProfile
          open={editProfileOpen}
          onClose={(success) => {
            setEditProfileOpen(false);
            if (success) {
              handleProfileUpdate(); // Call your update handler if needed
            }
          }}
          user={userInfo}
        />
        <Divider sx={{ my: 1 }} />
        {/* Password Section */}
        <ListItem button onClick={() => setPasswordOpen(!passwordOpen)}>
          <ListItemIcon>
            <Lock color="primary" />
          </ListItemIcon>
          <ListItemText primary="Password" />
          {passwordOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={passwordOpen} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4, pr: 2, pt: 1, pb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleOpenPasswordDialog}
            >
              Change Password
            </Button>
          </Box>
        </Collapse>

        <Divider sx={{ my: 1 }} />

        {/* Contact */}
        <ListItem button onClick={handleContact}>
          <ListItemIcon>
            <ContactMail color="primary" />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <Divider sx={{ my: 1 }} />

        {/* Help */}
        <ListItem button onClick={handleHelp}>
          <ListItemIcon>
            <Help color="primary" />
          </ListItemIcon>
          <ListItemText primary="Help & Support" />
        </ListItem>
      </List>
      <Divider sx={{ my: 1 }} />

      {/* Logout */}
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <Logout color="error" />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{ color: "error" }}
        />
      </ListItem>

      {/* Profile Edit Dialog */}
      <Dialog open={openProfileDialog} onClose={handleCloseProfileDialog}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Edit Profile</span>
          <IconButton onClick={handleCloseProfileDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              maxWidth: 700,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
              {userInfo.name.charAt(0)}
            </Avatar>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Cancel</Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Change Password</span>
          <IconButton onClick={handleClosePasswordDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <DialogContentText sx={{ mb: 3 }}>
              Please enter your current password and set a new password.
            </DialogContentText>
            <TextField
              margin="normal"
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordInfo.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
              required
              error={passwordInfo.newPassword !== passwordInfo.confirmPassword}
              helperText={
                passwordInfo.newPassword !== passwordInfo.confirmPassword
                  ? "Passwords don't match"
                  : ""
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            color="primary"
            disabled={
              !passwordInfo.currentPassword ||
              !passwordInfo.newPassword ||
              !passwordInfo.confirmPassword ||
              passwordInfo.newPassword !== passwordInfo.confirmPassword
            }
          >
            Change Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
