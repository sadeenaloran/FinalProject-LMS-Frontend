// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   Button,
// // //   Typography,
// // //   Box,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   CircularProgress,
// // //   Alert,
// // //   Snackbar,
// // //   IconButton,
// // // } from "@mui/material";
// // // import { Add as AddIcon, Edit, Delete } from "@mui/icons-material";
// // // import adminService from "../../services/adminService";
// // // import AddEditUserDialog from "./AddUserDialog";

// // // const UserManagement = () => {
// // //   const [users, setUsers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [dialogOpen, setDialogOpen] = useState(false);
// // //   const [currentUser, setCurrentUser] = useState(null);
// // //   const [snackbar, setSnackbar] = useState({
// // //     open: false,
// // //     message: "",
// // //     severity: "success",
// // //   });

// // //   //  const fetchUsers = async () => {
// // //   //     try {
// // //   //       setLoading(true);
// // //   //       setError(null);
// // //   //       const response = await adminService.getAllUsers();

// // //   //       // Ensure we always get an array
// // //   //       const usersData = Array.isArray(response)
// // //   //         ? response
// // //   //         : response.users || response.data?.users || [];

// // //   //       setUsers(usersData);
// // //   //     } catch (err) {
// // //   //       console.error("Error fetching users:", err);
// // //   //       setError(err.message || "Failed to fetch users");
// // //   //       showSnackbar(err.message || "Failed to fetch users", "error");
// // //   //     } finally {
// // //   //       setLoading(false);
// // //   //     }
// // //   //   };

// // //   const fetchUsers = async () => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);

// // //       const usersData = await adminService.getAllUsers();
// // //       setUsers(usersData);
// // //     } catch (err) {
// // //       console.error("Error fetching users:", err);
// // //       setError(err.message || "Failed to fetch users");
// // //       showSnackbar(err.message || "Failed to fetch users", "error");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchUsers();
// // //   }, []);

// // //   const handleOpenAddDialog = () => {
// // //     setCurrentUser(null);
// // //     setDialogOpen(true);
// // //   };

// // //   const handleOpenEditDialog = (user) => {
// // //     setCurrentUser(user);
// // //     setDialogOpen(true);
// // //   };

// // //   const handleCloseDialog = () => {
// // //     setDialogOpen(false);
// // //     setCurrentUser(null);
// // //   };

// // //   const handleSubmit = async (userData) => {
// // //     try {
// // //       if (currentUser) {
// // //         await adminService.updateUser(currentUser.id, userData);
// // //         showSnackbar("User updated successfully", "success");
// // //       } else {
// // //         await adminService.addUser(userData);
// // //         showSnackbar("User added successfully", "success");
// // //       }
// // //       fetchUsers();
// // //       handleCloseDialog();
// // //     } catch (error) {
// // //       showSnackbar(error.message || "Operation failed", "error");
// // //     }
// // //   };

// // //   const handleDeleteUser = async (userId) => {
// // //     if (window.confirm("Are you sure you want to delete this user?")) {
// // //       try {
// // //         await adminService.deleteUser(userId);
// // //         showSnackbar("User deleted successfully", "success");
// // //         fetchUsers();
// // //       } catch (error) {
// // //         showSnackbar(error.message || "Failed to delete user", "error");
// // //       }
// // //     }
// // //   };

// // //   const showSnackbar = (message, severity) => {
// // //     setSnackbar({ open: true, message, severity });
// // //   };

// // //   const handleCloseSnackbar = () => {
// // //     setSnackbar({ ...snackbar, open: false });
// // //   };

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
// // //         <Typography variant="h4" component="h1">
// // //           User Management
// // //         </Typography>
// // //         <Button
// // //           variant="contained"
// // //           color="primary"
// // //           startIcon={<AddIcon />}
// // //           onClick={handleOpenAddDialog}
// // //         >
// // //           Add User
// // //         </Button>
// // //       </Box>

// // //       {loading ? (
// // //         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
// // //           <CircularProgress />
// // //         </Box>
// // //       ) : error ? (
// // //         <Alert severity="error" sx={{ mb: 2 }}>
// // //           {error}
// // //         </Alert>
// // //       ) : (
// // //         <TableContainer component={Paper}>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow>
// // //                 <TableCell>ID</TableCell>
// // //                 <TableCell>Name</TableCell>
// // //                 <TableCell>Email</TableCell>
// // //                 <TableCell>Role</TableCell>
// // //                 <TableCell>Actions</TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {users.length > 0 ? (
// // //                 users.map((user) => (
// // //                   <TableRow key={user.id}>
// // //                     <TableCell>{user.id}</TableCell>
// // //                     <TableCell>{user.name}</TableCell>
// // //                     <TableCell>{user.email}</TableCell>
// // //                     <TableCell>{user.role}</TableCell>
// // //                     <TableCell>
// // //                       <IconButton
// // //                         color="primary"
// // //                         onClick={() => handleOpenEditDialog(user)}
// // //                       >
// // //                         <Edit />
// // //                       </IconButton>
// // //                       <IconButton
// // //                         color="error"
// // //                         onClick={() => handleDeleteUser(user.id)}
// // //                       >
// // //                         <Delete />
// // //                       </IconButton>
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 ))
// // //               ) : (
// // //                 <TableRow>
// // //                   <TableCell colSpan={5} align="center">
// // //                     No users found
// // //                   </TableCell>
// // //                 </TableRow>
// // //               )}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       )}

// // //       <AddEditUserDialog
// // //         open={dialogOpen}
// // //         onClose={handleCloseDialog}
// // //         onSubmit={handleSubmit}
// // //         user={currentUser}
// // //       />

// // //       <Snackbar
// // //         open={snackbar.open}
// // //         autoHideDuration={6000}
// // //         onClose={handleCloseSnackbar}
// // //       >
// // //         <Alert
// // //           onClose={handleCloseSnackbar}
// // //           severity={snackbar.severity}
// // //           sx={{ width: "100%" }}
// // //         >
// // //           {snackbar.message}
// // //         </Alert>
// // //       </Snackbar>
// // //     </Box>
// // //   );
// // // };

// // // export default UserManagement;
// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Box,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// //   IconButton,
// // } from "@mui/material";
// // import { Add as AddIcon, Edit, Delete } from "@mui/icons-material";
// // import adminService from "../../services/adminService";
// // import EditUserDialog from "./EditUserDialog";
// // import AddUserDialog from "./AddUserDialog";

// // const UserManagement = () => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [editDialogOpen, setEditDialogOpen] = useState(false);
// //   const [addDialogOpen, setAddDialogOpen] = useState(false);
// //   const [currentUser, setCurrentUser] = useState(null);
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success",
// //   });

// //   const fetchUsers = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const usersData = await adminService.getAllUsers();
// //       setUsers(usersData);
// //     } catch (err) {
// //       console.error("Error fetching users:", err);
// //       setError(err.message || "Failed to fetch users");
// //       showSnackbar(err.message || "Failed to fetch users", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   const handleOpenAddDialog = () => {
// //     setAddDialogOpen(true);
// //   };

// //   const handleOpenEditDialog = (user) => {
// //     setCurrentUser(user);
// //     setEditDialogOpen(true);
// //   };

// //   const handleCloseAddDialog = () => {
// //     setAddDialogOpen(false);
// //   };

// //   const handleCloseEditDialog = () => {
// //     setEditDialogOpen(false);
// //     setCurrentUser(null);
// //   };

// //   const handleAddUser = async (userData) => {
// //     try {
// //       await adminService.addUser(userData);
// //       showSnackbar("User added successfully", "success");
// //       fetchUsers();
// //       handleCloseAddDialog();
// //     } catch (error) {
// //       showSnackbar(error.message || "Failed to add user", "error");
// //     }
// //   };

// //   const handleEditUser = async (userId, userData) => {
// //     try {
// //       await adminService.updateUser(userId, userData);
// //       showSnackbar("User updated successfully", "success");
// //       fetchUsers();
// //       handleCloseEditDialog();
// //     } catch (error) {
// //       showSnackbar(error.message || "Failed to update user", "error");
// //     }
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     if (window.confirm("Are you sure you want to delete this user?")) {
// //       try {
// //         await adminService.deleteUser(userId);
// //         showSnackbar("User deleted successfully", "success");
// //         fetchUsers();
// //       } catch (error) {
// //         showSnackbar(error.message || "Failed to delete user", "error");
// //       }
// //     }
// //   };

// //   const showSnackbar = (message, severity) => {
// //     setSnackbar({ open: true, message, severity });
// //   };

// //   const handleCloseSnackbar = () => {
// //     setSnackbar({ ...snackbar, open: false });
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
// //         <Typography variant="h4" component="h1">
// //           User Management
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           startIcon={<AddIcon />}
// //           onClick={handleOpenAddDialog}
// //         >
// //           Add User
// //         </Button>
// //       </Box>

// //       {loading ? (
// //         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
// //           <CircularProgress />
// //         </Box>
// //       ) : error ? (
// //         <Alert severity="error" sx={{ mb: 2 }}>
// //           {error}
// //         </Alert>
// //       ) : (
// //         <TableContainer component={Paper}>
// //           <Table>
// //             <TableHead>
// //               <TableRow>
// //                 <TableCell>ID</TableCell>
// //                 <TableCell>Name</TableCell>
// //                 <TableCell>Email</TableCell>
// //                 <TableCell>Role</TableCell>
// //                 <TableCell>Actions</TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {users.length > 0 ? (
// //                 users.map((user) => (
// //                   <TableRow key={user.id}>
// //                     <TableCell>{user.id}</TableCell>
// //                     <TableCell>{user.name}</TableCell>
// //                     <TableCell>{user.email}</TableCell>
// //                     <TableCell>{user.role}</TableCell>
// //                     <TableCell>
// //                       <IconButton
// //                         color="primary"
// //                         onClick={() => handleOpenEditDialog(user)}
// //                       >
// //                         <Edit />
// //                       </IconButton>
// //                       <IconButton
// //                         color="error"
// //                         onClick={() => handleDeleteUser(user.id)}
// //                       >
// //                         <Delete />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={5} align="center">
// //                     No users found
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       )}

// //       <AddUserDialog
// //         open={addDialogOpen}
// //         onClose={handleCloseAddDialog}
// //         onSubmit={handleAddUser}
// //       />

// //       <EditUserDialog
// //         open={editDialogOpen}
// //         onClose={handleCloseEditDialog}
// //         user={currentUser}
// //         onEditUser={handleEditUser}
// //       />

// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={6000}
// //         onClose={handleCloseSnackbar}
// //       >
// //         <Alert
// //           onClose={handleCloseSnackbar}
// //           severity={snackbar.severity}
// //           sx={{ width: "100%" }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default UserManagement;
// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   IconButton,
// } from "@mui/material";
// import { Add as AddIcon, Edit, Delete } from "@mui/icons-material";
// import adminService from "../../services/adminService";
// import EditUserDialog from "./EditUserDialog";
// import AddUserDialog from "./AddUserDialog";

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [addDialogOpen, setAddDialogOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const usersData = await adminService.getAllUsers();
//       setUsers(usersData);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError(err.message || "Failed to fetch users");
//       showSnackbar(err.message || "Failed to fetch users", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleOpenAddDialog = () => {
//     setAddDialogOpen(true);
//   };

//   const handleOpenEditDialog = (user) => {
//     setCurrentUser(user);
//     setEditDialogOpen(true);
//   };

//   const handleCloseAddDialog = () => {
//     setAddDialogOpen(false);
//   };

//   const handleCloseEditDialog = () => {
//     setEditDialogOpen(false);
//     setCurrentUser(null);
//   };

//   const handleAddUser = async (userData) => {
//     try {
//       await adminService.addUser(userData);
//       showSnackbar("User added successfully", "success");
//       fetchUsers();
//       handleCloseAddDialog();
//     } catch (error) {
//       showSnackbar(error.message || "Failed to add user", "error");
//     }
//   };

//   const handleEditUser = async (userId, userData) => {
//     try {
//       await adminService.updateUser(userId, userData);
//       showSnackbar("User updated successfully", "success");
//       fetchUsers();
//       handleCloseEditDialog();
//     } catch (error) {
//       showSnackbar(error.message || "Failed to update user", "error");
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await adminService.deleteUser(userId);
//         showSnackbar("User deleted successfully", "success");
//         fetchUsers();
//       } catch (error) {
//         showSnackbar(error.message || "Failed to delete user", "error");
//       }
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <Typography variant="h4" component="h1">
//           User Management
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleOpenAddDialog}
//         >
//           Add User
//         </Button>
//       </Box>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleOpenEditDialog(user)}
//                       >
//                         <Edit />
//                       </IconButton>
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteUser(user.id)}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No users found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <AddUserDialog
//         open={addDialogOpen}
//         onClose={handleCloseAddDialog}
//         onSubmit={handleAddUser}
//       />

//       <EditUserDialog
//         open={editDialogOpen}
//         onClose={handleCloseEditDialog}
//         user={currentUser}
//         onEditUser={handleEditUser}
//       />

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManagement;
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit, Delete } from "@mui/icons-material";
import adminService from "../services/adminService";
import EditUserDialog from "./EditUserDialog";
import AddUserDialog from "./AddUserDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await adminService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
      showSnackbar(err.message || "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleOpenEditDialog = (user) => {
    setCurrentUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentUser(null);
  };

  const handleAddUser = async (userData) => {
    try {
      await adminService.addUser(userData);
      await fetchUsers(); // جلب جميع المستخدمين من السيرفر (يشمل الجديد)

      showSnackbar("User added successfully", "success");
      handleCloseAddDialog();
    } catch (error) {
      showSnackbar(error.message || "Failed to add user", "error");
    }
  };
  // const handleEditUser = async (userId, userData) => {
  //   try {
  //     const updatedUser = await adminService.updateUser(userId, userData);

  //     // Make sure we have the updated data
  //     const fullUpdatedUser = await adminService.getUserById(userId);

  //     setUsers(prevUsers =>
  //       prevUsers.map(user =>
  //         user.id === userId ? fullUpdatedUser : user
  //       )
  //     );
  //     showSnackbar("User updated successfully", "success");
  //     handleCloseEditDialog();
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     showSnackbar(error.message || "Failed to update user", "error");
  //   }
  // };
  const handleEditUser = async (userId, userData) => {
    try {
      // Optimistically update local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...userData } : user
        )
      );

      // Then try to update on server
      await adminService.updateUser(userId, userData);

      showSnackbar("User updated successfully", "success");
      handleCloseEditDialog();
    } catch (error) {
      // Revert optimistic update if failed
      fetchUsers(); // Refetch original data

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update user";

      showSnackbar(errorMessage, "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await adminService.deleteUser(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        showSnackbar("User deleted successfully", "success");
      } catch (error) {
        showSnackbar(error.message || "Failed to delete user", "error");
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
        >
          Add User
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => user.id !== undefined && user.id !== null)
                .map((user) => (
                  <TableRow key={`user-${user.id}`}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditDialog(user)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <AddUserDialog
        open={addDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddUser}
      />

      <EditUserDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        user={currentUser}
        onEditUser={handleEditUser}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
