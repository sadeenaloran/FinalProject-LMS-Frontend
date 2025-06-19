// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
// } from "@mui/material";

// const EditUserDialog = ({ open, onClose, user, onEditUser }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "student",
//   });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         role: user.role || "student",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Validation
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     onEditUser(user.id, {
//       name: formData.name,
//       email: formData.email,
//       role: formData.role,
//     });
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Edit User</DialogTitle>
//       <DialogContent>
//         <TextField
//           margin="dense"
//           name="name"
//           label="Name"
//           fullWidth
//           value={formData.name}
//           onChange={handleChange}
//           error={!!errors.name}
//           helperText={errors.name}
//         />
//         <TextField
//           margin="dense"
//           name="email"
//           label="Email"
//           type="email"
//           fullWidth
//           value={formData.email}
//           onChange={handleChange}
//           error={!!errors.email}
//           helperText={errors.email}
//         />
//         <TextField
//           select
//           margin="dense"
//           name="role"
//           label="Role"
//           fullWidth
//           value={formData.role}
//           onChange={handleChange}
//         >
//           <MenuItem value="student">Student</MenuItem>
//           <MenuItem value="instructor">Instructor</MenuItem>
//         </TextField>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditUserDialog;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Collapse,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  changePasswordSchema,
  editUserSchema,
} from "../shared/Validations/auth.schema";

const EditUserDialog = ({ open, onClose, user, onEditUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "student",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordFields(false);
      setErrors({});
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = async () => {
    try {
      // First validate basic user info
      await editUserSchema.validate(
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        },
        { abortEarly: false }
      );

      // Then validate password if showing password fields
      if (showPasswordFields) {
        await changePasswordSchema.validate(
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          },
          { abortEarly: false }
        );
      }

      return {};
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      return newErrors;
    }
  };

  const handleSubmit = async () => {
    const validationErrors = await validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    // Include password data only if changing password
    if (showPasswordFields) {
      userData.currentPassword = formData.currentPassword;
      userData.newPassword = formData.newPassword;
      userData.confirmPassword = formData.confirmPassword;
    }

    onEditUser(user.id, userData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit User
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="normal"
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin="normal"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormControl fullWidth margin="normal" error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
          {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
        </FormControl>

        <Button
          variant="text"
          color="primary"
          onClick={() => setShowPasswordFields(!showPasswordFields)}
          sx={{ mt: 2 }}
        >
          {showPasswordFields ? "Hide Password Change" : "Change Password"}
        </Button>

        <Collapse in={showPasswordFields}>
          <TextField
            margin="normal"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            value={formData.currentPassword}
            onChange={handleChange}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
          />
          <TextField
            margin="normal"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            value={formData.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
          />
          <TextField
            margin="normal"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
