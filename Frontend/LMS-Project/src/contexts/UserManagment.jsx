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
  Avatar,
  Chip,
  Card,
  CardHeader,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit,
  Delete,
  Search,
  Person,
  AdminPanelSettings,
  People,
  VerifiedUser,
} from "@mui/icons-material";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleOpenEditDialog = (user) => {
    setCurrentUser(user);
    setEditDialogOpen(true);
  };
  const handleCloseAddDialog = () => setAddDialogOpen(false);
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentUser(null);
  };

  const handleAddUser = async (userData) => {
    try {
      await adminService.addUser(userData);
      await fetchUsers();
      showSnackbar("User added successfully", "success");
      handleCloseAddDialog();
    } catch (error) {
      showSnackbar(error.message || "Failed to add user", "error");
    }
  };

  const handleEditUser = async (userId, userData) => {
    try {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...userData } : user
        )
      );
      await adminService.updateUser(userId, userData);
      showSnackbar("User updated successfully", "success");
      handleCloseEditDialog();
    } catch (error) {
      fetchUsers();
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

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <AdminPanelSettings fontSize="small" />;
      case "user":
        return <Person fontSize="small" />;
      default:
        return <VerifiedUser fontSize="small" />;
    }
  };
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.trim().split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials.toUpperCase();
  };
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        bgcolor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header Card */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(69, 147, 255, 0.1)",
          background: "linear-gradient(135deg, #e6f0ff 0%, #f0f7ff 100%)",
          border: "1px solid rgba(145, 185, 255, 0.2)",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "primary.light",
                width: 56,
                height: 56,
                mr: 2,
              }}
            >
              <People sx={{ fontSize: 32, color: "primary.dark" }} />
            </Avatar>
          }
          title={
            <Typography
              variant="h4"
              sx={{
                color: "primary.dark",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              User Management
            </Typography>
          }
          subheader={
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1rem",
              }}
            >
              Manage all system users and their permissions
            </Typography>
          }
          action={
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontSize: "0.875rem",
                fontWeight: 600,
                boxShadow: "0 2px 10px rgba(69, 147, 255, 0.2)",
                "&:hover": {
                  bgcolor: "primary.light",
                  color: "white",
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleOpenAddDialog}
            >
              Add New User
            </Button>
          }
          sx={{ p: 3 }}
        />
      </Card>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {[
          {
            title: "Total Users",
            value: users.length,
            icon: <People color="primary" />,
            color: "linear-gradient(135deg, #e6f0ff 0%, #d0e3ff 100%)",
          },
          {
            title: "Admins",
            value: users.filter((u) => u.role === "admin").length,
            icon: <AdminPanelSettings color="primary" />,
            color: "linear-gradient(135deg, #e6f9ff 0%, #c2f0ff 100%)",
          },
          {
            title: "Active Users",
            value: users.length, // Replace with actual active count if available
            icon: <VerifiedUser color="primary" />,
            color: "linear-gradient(135deg, #e6fffb 0%, #c2fff5 100%)",
          },
          {
            title: "New This Month",
            // value: 0, // Replace with actual new users count if available
            value: users.filter((u) => {
              const d = new Date(u.createdAt);
              const n = new Date();
              return (
                d.getMonth() === n.getMonth() &&
                d.getFullYear() === n.getFullYear()
              );
            }).length,
            icon: <AddIcon color="primary" />,
            color: "linear-gradient(135deg, #f0e6ff 0%, #e0c2ff 100%)",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            sx={{
              p: 2.5,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              background: stat.color,
              border: "1px solid rgba(145, 185, 255, 0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.7)",
                  mr: 2,
                  width: 48,
                  height: 48,
                }}
              >
                {stat.icon}
              </Avatar>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "primary.dark",
                    fontWeight: 700,
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Search and Table Section */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(69, 147, 255, 0.08)",
          border: "1px solid rgba(145, 185, 255, 0.2)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            justifyContent: "space-between",
            bgcolor: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.dark",
              fontWeight: 600,
              mb: { xs: 2, sm: 0 },
            }}
          >
            All Users ({users.length})
          </Typography>
          <TextField
            size="small"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 300 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "primary.50",
                borderColor: "primary.100",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 6,
              bgcolor: "primary.50",
            }}
          >
            <CircularProgress sx={{ color: "primary.main" }} />
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            sx={{
              m: 3,
              borderRadius: 2,
              bgcolor: "error.light",
              color: "error.dark",
            }}
          >
            {error}
          </Alert>
        ) : (
          <TableContainer>
            <Table
              sx={{
                minWidth: 650,
                "& .MuiTableCell-root": {
                  py: 2,
                  borderColor: "rgba(145, 185, 255, 0.2)",
                },
              }}
            >
              <TableHead
                sx={{
                  bgcolor: "primary.50",
                }}
              >
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "primary.dark",
                      fontSize: "0.875rem",
                    }}
                  >
                    USER
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "primary.dark",
                      fontSize: "0.875rem",
                    }}
                  >
                    EMAIL
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "primary.dark",
                      fontSize: "0.875rem",
                    }}
                  >
                    ROLE
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "primary.dark",
                      fontSize: "0.875rem",
                      textAlign: "right",
                    }}
                  >
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={`user-${user.id}`}
                      sx={{
                        "&:hover": {
                          bgcolor: "primary.50",
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{
                              bgcolor: "primary.light",
                              color: "primary.dark",
                              width: 36,
                              height: 36,
                              mr: 2,
                              fontSize: "0.875rem",
                            }}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Box>
                            <Typography sx={{ fontWeight: 500 }}>
                              {user.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "text.secondary",
                                fontSize: "0.75rem",
                              }}
                            >
                              ID: {user.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          icon={getRoleIcon(user.role)}
                          label={user.role}
                          sx={{
                            textTransform: "capitalize",
                            bgcolor:
                              user.role === "admin"
                                ? "secondary.50"
                                : "primary.50",
                            color:
                              user.role === "admin"
                                ? "secondary.dark"
                                : "primary.dark",
                            fontWeight: 500,
                            px: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              bgcolor: "rgba(69, 147, 255, 0.1)",
                            },
                            mr: 1,
                          }}
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              bgcolor: "rgba(255, 86, 86, 0.1)",
                            },
                          }}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      sx={{
                        textAlign: "center",
                        py: 4,
                        color: "text.secondary",
                      }}
                    >
                      No users found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Dialogs */}
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            alignItems: "center",
            bgcolor:
              snackbar.severity === "success" ? "primary.50" : "error.light",
            color:
              snackbar.severity === "success" ? "primary.dark" : "error.dark",
          }}
          icon={false}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {snackbar.severity === "success" ? (
              <VerifiedUser color="primary" sx={{ mr: 1 }} />
            ) : (
              <Delete color="error" sx={{ mr: 1 }} />
            )}
            {snackbar.message}
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
