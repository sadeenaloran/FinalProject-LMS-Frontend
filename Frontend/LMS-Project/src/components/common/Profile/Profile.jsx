import React, { useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Button, TextField, Box, Typography, Avatar, Divider } from '@mui/material';
import GoogleIcon from "@mui/icons-material/Google";

const Profile = () => {
  const { user, logout, linkGoogleAccount, changePassword } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(passwordData);
      setMessage('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleGoogleLink = async () => {
    try {
      // You would typically get this token from Google's auth flow
      const googleToken = await getGoogleToken(); // Implement this function
      await linkGoogleAccount(googleToken);
      setMessage('Google account linked successfully');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const getGoogleToken = async () => {
    // TODO: Implement Google OAuth flow here
    throw new Error('Google OAuth not implemented');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar 
          src={user?.avatar} 
          sx={{ width: 80, height: 80, mr: 3 }}
        />
        <Box>
          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body1">{user?.email}</Typography>
          <Typography variant="body2">Role: {user?.role}</Typography>
        </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {!user?.oauth_provider && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>Link Google Account</Typography>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon/>}
            onClick={handleGoogleLink}
          >
            Link Google Account
          </Button>
        </Box>
      )}
      
      <Box component="form" onSubmit={handlePasswordSubmit}>
        <Typography variant="h6" gutterBottom>Change Password</Typography>
        
        <TextField
          label="Current Password"
          type="password"
          name="currentPassword"
          fullWidth
          margin="normal"
          value={passwordData.currentPassword}
          onChange={handlePasswordChange}
          required
        />
        
        <TextField
          label="New Password"
          type="password"
          name="newPassword"
          fullWidth
          margin="normal"
          value={passwordData.newPassword}
          onChange={handlePasswordChange}
          required
        />
        
        <TextField
          label="Confirm New Password"
          type="password"
          name="confirmPassword"
          fullWidth
          margin="normal"
          value={passwordData.confirmPassword}
          onChange={handlePasswordChange}
          required
        />
        
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Change Password
        </Button>
        
        {message && (
          <Typography color={message.includes('success') ? 'success' : 'error'} sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Button
        variant="outlined"
        color="error"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;