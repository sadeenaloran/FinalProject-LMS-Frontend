// import React, { useState } from "react";
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
//   DialogContentText,
//   DialogActions,
//   TextField,
//   Button,
//   IconButton,
//   Collapse,
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
//   Lock,
//   ExpandMore,
//   ExpandLess,
// } from "@mui/icons-material";
// import { authService } from "../../../services/authService";
// import EditProfile from "../../../components/common/Profile/ProfileEdit";
// const Settings = () => {
//   const [openProfileDialog, setOpenProfileDialog] = useState(false);
//   const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
//   const [passwordOpen, setPasswordOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     avatarUrl: "",
//   });
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
//   const [editProfileOpen, setEditProfileOpen] = useState(false);
//   const handleProfileUpdate = (updatedUser) => {
//     setUserInfo({
//       ...userInfo,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       avatarUrl: updatedUser.avatarUrl || userInfo.avatarUrl,
//     });
//     setSnackbar({
//       open: true,
//       message: "Profile updated successfully",
//       severity: "success",
//     });
//   };
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
//     console.log("Saved user info:", userInfo);
//     handleCloseProfileDialog();
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
//     console.log("User logged out");
//   };

//   const handleContact = () => {
//     console.log("Contact clicked");
//   };

//   const handleHelp = () => {
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
//         <ListItem button onClick={() => setEditProfileOpen(true)}>
//           <ListItemIcon>
//             <Avatar
//               src={userInfo.avatarUrl}
//               alt={userInfo.name}
//               sx={{ width: 33, height: 33 }}
//             />
//           </ListItemIcon>
//           <ListItemText
//             primary="Profile"
//             secondary={`${userInfo.name} - ${userInfo.email}`}
//           />
//           <Edit color="action" />
//         </ListItem>
//         <EditProfile
//           open={editProfileOpen}
//           onClose={(success) => {
//             setEditProfileOpen(false);
//             if (success) {
//               handleProfileUpdate(); // Call your update handler if needed
//             }
//           }}
//           user={userInfo}
//         />
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
  Paper,
  Card,
  CardHeader,
  Chip
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
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import { Navigate , useNavigate } from "react-router-dom";

const Settings = () => {
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
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

  // const handleOpenProfileDialog = () => {
  //   setOpenProfileDialog(true);
  // };

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
        navigate("/")

  };

  const handleContact = () => {
    navigate("/Contact")
    };

  const handleHelp = () => {
    navigate("/Contact")
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ py: 5, mx: 'auto' }} maxWidth="lg">
      <Card sx={{ 
        mb: 4,
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(69, 147, 255, 0.1)',
        border: '1px solid rgba(145, 185, 255, 0.2)'
      }}>
        <CardHeader
          avatar={
            <Avatar sx={{ 
              bgcolor: 'primary.light',
              width: 48,
              height: 48
            }}>
              <SettingsIcon fontSize="large" />
            </Avatar>
          }
          title={
            <Typography variant="h5" sx={{ 
              color: 'primary.dark',
              fontWeight: 700
            }}>
              Account Settings
            </Typography>
          }
          subheader={
            <Typography variant="body1" sx={{ 
              color: 'text.secondary'
            }}>
              Manage your profile and account preferences
            </Typography>
          }
          sx={{ p: 3 }}
        />
      </Card>

      <Paper sx={{ 
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid rgba(145, 185, 255, 0.2)',
        overflow: 'hidden'
      }}>
        <List disablePadding>
          {/* Profile Section */}
          <ListItem 
            button 
            onClick={() => setEditProfileOpen(true)}
            sx={{
              '&:hover': {
                bgcolor: 'primary.50'
              }
            }}
          >
            <ListItemIcon>
              <Avatar
                src={userInfo.avatarUrl}
                alt={userInfo.name}
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: 'primary.light',
                  color: 'primary.dark'
                }}
              >
                {userInfo.name.charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body1" fontWeight={500}>
                  Profile
                </Typography>
              }
              secondary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Chip 
                    label={userInfo.name} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'primary.50',
                      color: 'primary.dark'
                    }} 
                  />
                  <Chip 
                    label={userInfo.email} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'secondary.50',
                      color: 'secondary.dark'
                    }} 
                  />
                </Box>
              }
            />
            <Edit color="primary" />
          </ListItem>
          <EditProfile
            open={editProfileOpen}
            onClose={(success) => {
              setEditProfileOpen(false);
              if (success) {
                handleProfileUpdate();
              }
            }}
            user={userInfo}
          />
          <Divider sx={{ borderColor: 'primary.100' }} />

          {/* Password Section */}
          <ListItem 
            button 
            onClick={() => setPasswordOpen(!passwordOpen)}
            sx={{
              '&:hover': {
                bgcolor: 'primary.50'
              }
            }}
          >
            <ListItemIcon>
              <Lock color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontWeight={500}>
                  Password
                </Typography>
              } 
            />
            {passwordOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
          </ListItem>
          <Collapse in={passwordOpen} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4, pr: 2, pt: 1, pb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleOpenPasswordDialog}
                sx={{
                  borderColor: 'primary.light',
                  color: 'primary.dark',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50'
                  }
                }}
              >
                Change Password
              </Button>
            </Box>
          </Collapse>
          <Divider sx={{ borderColor: 'primary.100' }} />

          {/* Contact */}
          <ListItem 
            button 
            onClick={handleContact}
            sx={{
              '&:hover': {
                bgcolor: 'primary.50'
              }
            }}
          >
            <ListItemIcon>
              <ContactMail color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontWeight={500}>
                  Contact Us
                </Typography>
              } 
            />
          </ListItem>
          <Divider sx={{ borderColor: 'primary.100' }} />

          {/* Help */}
          <ListItem 
            button 
            onClick={handleHelp}
            sx={{
              '&:hover': {
                bgcolor: 'primary.50'
              }
            }}
          >
            <ListItemIcon>
              <Help color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography variant="body1" fontWeight={500}>
                  Help & Support
                </Typography>
              } 
            />
          </ListItem>
          <Divider sx={{ borderColor: 'primary.100' }} />

          {/* Logout */}
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                bgcolor: 'error.50'
              }
            }}
          >
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography color="error" fontWeight={500}>
                  Logout
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Paper>

      {/* Profile Edit Dialog */}
      <Dialog 
        open={openProfileDialog} 
        onClose={handleCloseProfileDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(145, 185, 255, 0.3)',
            width: '100%',
            maxWidth: '500px'
          }
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: 'primary.50',
            color: 'primary.dark',
            borderBottom: '1px solid',
            borderColor: 'primary.100'
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mb: 2,
              bgcolor: 'primary.light',
              color: 'primary.dark',
              fontSize: '2rem'
            }}>
              {userInfo.name.charAt(0)}
            </Avatar>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseProfileDialog}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveProfile}
            variant="contained"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog 
        open={openPasswordDialog} 
        onClose={handleClosePasswordDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(145, 185, 255, 0.3)',
            width: '100%',
            maxWidth: '500px'
          }
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: 'primary.50',
            color: 'primary.dark',
            borderBottom: '1px solid',
            borderColor: 'primary.100'
          }}
        >
          <span>Change Password</span>
          <IconButton onClick={handleClosePasswordDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 3 }}>
            <DialogContentText sx={{ mb: 3, color: 'text.secondary' }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                  borderColor: 'primary.100'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleClosePasswordDialog}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'primary.dark'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={
              !passwordInfo.currentPassword ||
              !passwordInfo.newPassword ||
              !passwordInfo.confirmPassword ||
              passwordInfo.newPassword !== passwordInfo.confirmPassword
            }
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white'
              }
            }}
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
          sx={{ 
            width: "100%",
            borderRadius: 2,
            bgcolor: snackbar.severity === 'success' ? 'primary.50' : 'error.light',
            color: snackbar.severity === 'success' ? 'primary.dark' : 'error.dark',
            border: '1px solid',
            borderColor: snackbar.severity === 'success' ? 'primary.100' : 'error.200'
          }}
          icon={false}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {snackbar.severity === 'success' ? (
              <CheckCircleOutline color="primary" fontSize="small" />
            ) : (
              <ErrorOutline color="error" fontSize="small" />
            )}
            {snackbar.message}
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;