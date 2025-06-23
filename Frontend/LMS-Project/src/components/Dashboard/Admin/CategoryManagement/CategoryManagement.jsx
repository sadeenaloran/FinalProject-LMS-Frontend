// import { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Snackbar,
//   Alert,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   Divider,
//   InputAdornment
// } from "@mui/material";
// import { Add, Search, Category as CategoryIcon } from "@mui/icons-material";
// import CategoryService from "../../../../services/CategoryService";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const data = await CategoryService.getAllCategories();
//       setCategories(data);
//     } catch (error) {
//       showSnackbar("Failed to fetch categories", "error");
//     }
//   };

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.id.toString().includes(searchTerm)
//   );

//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setCategoryName("");
//   };

//   const handleSubmit = async () => {
//     try {
//       await CategoryService.createCategory(categoryName);
//       showSnackbar("Category created successfully", "success");
//       fetchCategories();
//       handleDialogClose();
//     } catch (error) {
//       showSnackbar(
//         error.response?.data?.message || "Operation failed",
//         "error"
//       );
//     }
//   };

//   const showSnackbar = (message, severity) => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   return (
//     <Box sx={{
//       p: 3,
//       background: 'linear-gradient(to bottom, #f8fafc 0%, #e6f0ff 100%)',
//       minHeight: '100vh'
//     }}>
//       <Card sx={{
//         borderRadius: 3,
//         boxShadow: '0 4px 20px rgba(69, 147, 255, 0.1)',
//         border: '1px solid rgba(145, 185, 255, 0.2)',
//         mb: 3,
//         background: 'rgba(255, 255, 255, 0.8)',
//         backdropFilter: 'blur(10px)'
//       }}>
//         <CardContent>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               mb: 3,
//               flexWrap: 'wrap',
//               gap: 2
//             }}
//           >
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <Avatar sx={{
//                 bgcolor: 'primary.light',
//                 color: 'primary.dark',
//                 width: 48,
//                 height: 48
//               }}>
//                 <CategoryIcon />
//               </Avatar>
//               <Typography variant="h5" component="h2" sx={{
//                 fontWeight: 700,
//                 color: 'primary.dark'
//               }}>
//                 Category Management
//               </Typography>
//             </Box>

//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//               <TextField
//                 size="small"
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{
//                   width: 250,
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     bgcolor: 'primary.50',
//                     borderColor: 'primary.100'
//                   }
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={handleDialogOpen}
//                 sx={{
//                   borderRadius: 2,
//                   textTransform: 'none',
//                   bgcolor: 'primary.light',
//                   color: 'primary.dark',
//                   px: 3,
//                   '&:hover': {
//                     bgcolor: 'primary.main',
//                     color: 'white'
//                   }
//                 }}
//               >
//                 Add Category
//               </Button>
//             </Box>
//           </Box>

//           <Divider sx={{ my: 2, borderColor: 'primary.100' }} />

//           <TableContainer component={Paper} sx={{
//             borderRadius: 2,
//             boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//             border: '1px solid rgba(145, 185, 255, 0.2)',
//             background: 'rgba(255, 255, 255, 0.7)'
//           }}>
//             <Table>
//               <TableHead sx={{
//                 backgroundColor: 'primary.light',
//                 '& .MuiTableCell-root': {
//                   color: 'primary.dark',
//                   fontWeight: 600,
//                   fontSize: '0.875rem'
//                 }
//               }}>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Name</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCategories.length > 0 ? (
//                   filteredCategories.map((category) => (
//                     <TableRow
//                       key={category.id}
//                       hover
//                       sx={{
//                         '&:last-child td, &:last-child th': { border: 0 },
//                         '&:nth-of-type(even)': {
//                           backgroundColor: 'primary.50'
//                         },
//                         '&:hover': {
//                           backgroundColor: 'primary.100'
//                         }
//                       }}
//                     >
//                       <TableCell>
//                         <Chip
//                           label={`#${category.id}`}
//                           size="small"
//                           sx={{
//                             bgcolor: 'secondary.50',
//                             color: 'secondary.dark',
//                             fontWeight: 500
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 500 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                           <CategoryIcon fontSize="small" color="primary" />
//                           {category.name}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={2} sx={{
//                       textAlign: 'center',
//                       py: 4,
//                       color: 'text.secondary'
//                     }}>
//                       No categories found matching your search
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       <Dialog
//         open={openDialog}
//         onClose={handleDialogClose}
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             bgcolor: 'background.paper',
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//             border: '1px solid rgba(145, 185, 255, 0.3)',
//             width: '100%',
//             maxWidth: '500px'
//           }
//         }}
//       >
//         <DialogTitle sx={{
//           bgcolor: 'primary.50',
//           color: 'primary.dark',
//           fontWeight: 600,
//           borderBottom: '1px solid',
//           borderColor: 'primary.100'
//         }}>
//           Add New Category
//         </DialogTitle>
//         <DialogContent sx={{ pt: 3 }}>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             sx={{
//               mt: 2,
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: 1,
//                 borderColor: 'primary.100'
//               }
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <CategoryIcon color="primary" />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={handleDialogClose}
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none',
//               color: 'text.secondary',
//               '&:hover': {
//                 color: 'primary.dark'
//               }
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none',
//               bgcolor: 'primary.light',
//               color: 'primary.dark',
//               px: 3,
//               '&:hover': {
//                 bgcolor: 'primary.main',
//                 color: 'white'
//               }
//             }}
//           >
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{
//             width: '100%',
//             borderRadius: 2,
//             alignItems: 'center',
//             bgcolor: snackbar.severity === 'success' ? 'primary.50' : 'error.light',
//             color: snackbar.severity === 'success' ? 'primary.dark' : 'error.dark',
//             border: '1px solid',
//             borderColor: snackbar.severity === 'success' ? 'primary.100' : 'error.200'
//           }}
//           icon={false}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             {snackbar.severity === 'success' ? (
//               <CategoryIcon color="primary" fontSize="small" />
//             ) : (
//               <CategoryIcon color="error" fontSize="small" />
//             )}
//             {snackbar.message}
//           </Box>
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default CategoryManagement;

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  InputAdornment,
  Badge,
  useTheme,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  Add,
  Search,
  Category as CategoryIcon,
  FilterList,
  Close,
  CheckCircle,
  Error,
} from "@mui/icons-material";
import CategoryService from "../../../../services/CategoryService";

const CategoryManagement = () => {
  const theme = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      showSnackbar("Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toString().includes(searchTerm)
  );

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCategoryName("");
  };

  const handleSubmit = async () => {
    try {
      await CategoryService.createCategory(categoryName);
      showSnackbar("Category created successfully", "success");
      fetchCategories();
      handleDialogClose();
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Operation failed",
        "error"
      );
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getRandomGradient = (index) => {
    const gradients = [
      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.main} 100%)`,
      `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.main} 100%)`,
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: theme.palette.background.default,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { md: "center" },
          mb: 4,
          pt: 7,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Category Management
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            Organize and manage your product categories
          </Typography>
        </Box>
        <Button
          variant="gradient"
          startIcon={<Add />}
          onClick={handleDialogOpen}
          sx={{
            height: "fit-content",
            alignSelf: { xs: "flex-start", md: "center" },
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Stats Card */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: theme.shadows[2],
          background: getRandomGradient(0),
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: -50,
            right: -50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          },
        }}
      >
        <CardContent sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
                Total Categories
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                {categories.length}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 64,
                height: 64,
                color: "white",
              }}
            >
              <CategoryIcon fontSize="large" />
            </Avatar>
          </Box>
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Table Header with Search */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            justifyContent: "space-between",
            bgcolor: "background.paper",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mr: 2 }}>
              All Categories
            </Typography>
            
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: { xs: "100%", sm: 280 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "background.default",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm("")}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                display: { xs: "none", sm: "flex" },
              }}
            >
              Filters
            </Button>
            <IconButton
              sx={{
                display: { sm: "none" },
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <FilterList />
            </IconButton>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}></Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  bgcolor: "background.default",
                  "& .MuiTableCell-root": {
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  },
                }}
              >
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category, index) => (
                    <TableRow
                      key={category.id}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <TableCell>
                        <Chip
                          label={`#${category.id}`}
                          sx={{
                            bgcolor: getRandomGradient(index),
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: getRandomGradient(index),
                              width: 36,
                              height: 36,
                              color: "white",
                            }}
                          >
                            <CategoryIcon fontSize="small" />
                          </Avatar>
                          <Typography sx={{ fontWeight: 500 }}>
                            {category.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              minWidth: 90,
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              minWidth: 90,
                              borderColor: "error.main",
                              color: "error.main",
                              "&:hover": {
                                bgcolor: "error.light",
                                borderColor: "error.dark",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      sx={{
                        textAlign: "center",
                        py: 6,
                        color: "text.secondary",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Search
                          sx={{
                            fontSize: 48,
                            color: "text.disabled",
                            opacity: 0.5,
                          }}
                        />
                        <Typography variant="h6">
                          No categories found
                        </Typography>
                        <Typography variant="body2">
                          Try adjusting your search or filter
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* Add Category Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[6],
            width: "100%",
            maxWidth: "500px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            fontWeight: 600,
            py: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 40,
              height: 40,
            }}
          >
            <Add />
          </Avatar>
          Add New Category
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              color: "text.secondary",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="gradient"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Create Category
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Card
          sx={{
            minWidth: 300,
            borderRadius: 2,
            boxShadow: theme.shadows[6],
            bgcolor:
              snackbar.severity === "success" ? "success.light" : "error.light",
            color:
              snackbar.severity === "success"
                ? "success.contrastText"
                : "error.contrastText",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {snackbar.severity === "success" ? (
              <CheckCircle color="success" fontSize="large" />
            ) : (
              <Error color="error" fontSize="large" />
            )}
            <Typography variant="body1">{snackbar.message}</Typography>
          </Box>
        </Card>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;
