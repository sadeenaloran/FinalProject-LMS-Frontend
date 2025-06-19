// // // src/components/admin/AddUserDialog.js
// // import React, { useState } from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   TextField,
// //   MenuItem,
// //   Box,
// // } from "@mui/material";

// // const AddUserDialog = ({ open, onClose, onAddUser }) => {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     role: "student",
// //   });
// //   const [errors, setErrors] = useState({});

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.name) newErrors.name = "Name is required";
// //     if (!formData.email) {
// //       newErrors.email = "Email is required";
// //     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
// //       newErrors.email = "Email is invalid";
// //     }
// //     if (!formData.password) {
// //       newErrors.password = "Password is required";
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters";
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = () => {
// //     if (validate()) {
// //       onAddUser(formData);
// //       setFormData({
// //         name: "",
// //         email: "",
// //         password: "",
// //         role: "student",
// //       });
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
// //       <DialogTitle>Add New User</DialogTitle>
// //       <DialogContent>
// //         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
// //           <TextField
// //             label="Name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             error={!!errors.name}
// //             helperText={errors.name}
// //             fullWidth
// //             margin="normal"
// //           />
// //           <TextField
// //             label="Email"
// //             name="email"
// //             type="email"
// //             value={formData.email}
// //             onChange={handleChange}
// //             error={!!errors.email}
// //             helperText={errors.email}
// //             fullWidth
// //             margin="normal"
// //           />
// //           <TextField
// //             label="Password"
// //             name="password"
// //             type="password"
// //             value={formData.password}
// //             onChange={handleChange}
// //             error={!!errors.password}
// //             helperText={errors.password}
// //             fullWidth
// //             margin="normal"
// //           />
// //           <TextField
// //             select
// //             label="Role"
// //             name="role"
// //             value={formData.role}
// //             onChange={handleChange}
// //             fullWidth
// //             margin="normal"
// //           >
// //             <MenuItem value="student">Student</MenuItem>
// //             <MenuItem value="instructor">Instructor</MenuItem>
// //           </TextField>
// //         </Box>
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose}>Cancel</Button>
// //         <Button onClick={handleSubmit} variant="contained" color="primary">
// //           Add User
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };

// // export default AddUserDialog;
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
// } from "@mui/material";

// const AddUserDialog = ({ open, onClose, onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "student",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Validation
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     if (formData.password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     onSubmit({
//       name: formData.name,
//       email: formData.email,
//       role: formData.role,
//       password: formData.password,
//     });
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add New User</DialogTitle>
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
//         <TextField
//           margin="dense"
//           name="password"
//           label="Password"
//           type="password"
//           fullWidth
//           value={formData.password}
//           onChange={handleChange}
//           error={!!errors.password}
//           helperText={errors.password}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} color="primary">
//           Add User
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddUserDialog;
import React, { useState } from "react";
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
  IconButton,
  CircularProgress, // Add this import
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { addUserSchema } from "../shared/Validations/auth.schema";

const AddUserDialog = ({ open, onClose, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      await addUserSchema.validate(formData, { abortEarly: false });

      // If validation passes, submit the data
      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New User
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
        <TextField
          margin="normal"
          name="password"
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          margin="normal"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading}
          endIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? "Adding..." : "Add User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
