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
//   IconButton,
//    Box,
//   Typography,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { Delete, Edit, Add } from "@mui/icons-material";
// // import { useAuth } from "../../../contexts/AuthContext/AuthContext";
// import CategoryService from "../../../services/CategoryService";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [categoryName, setCategoryName] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // const { user } = useAuth();
  
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

//   const handleDialogOpen = (category = null) => {
//     setCurrentCategory(category);
//     setCategoryName(category ? category.name : "");
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setCurrentCategory(null);
//     setCategoryName("");
//   };

//   const handleSubmit = async () => {
//     try {
//       if (currentCategory) {
//         // Update existing category
//         await CategoryService.updateCategory(currentCategory.id, categoryName);
//         showSnackbar("Category updated successfully", "success");
//       } else {
//         await CategoryService.createCategory(categoryName);
//         showSnackbar("Category created successfully", "success");
//       }
//       fetchCategories();
//       handleDialogClose();
//     } catch (error) {
//       showSnackbar(
//         error.response?.data?.message ||
//           "Operation failed. Please check your permissions.",
//         "error"
//       );
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await CategoryService.deleteCategory(id);
//       showSnackbar("Category deleted successfully", "success");
//       fetchCategories();
//     } catch (error) {
//       showSnackbar(
//         error.response?.data?.message || "Failed to delete category",
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
//     <div>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<Add />}
//           onClick={() => handleDialogOpen()}
//           sx={{ mb: 2 }}
//         >
//           Add Category
//         </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category.id}>
//                 <TableCell>{category.id}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>
//                   <IconButton
//                     color="primary"
//                     onClick={() => handleDialogOpen(category)}
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     color="error"
//                     onClick={() => handleDelete(category.id)}
//                   >
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>
//           {currentCategory ? "Edit Category" : "Add New Category"}
//         </DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button onClick={handleSubmit}>
//             {currentCategory ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default CategoryManagement;


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
//   Typography
// } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import CategoryService from "../../../services/CategoryService";

// const CategoryManagement = () => {
//   const [categories, setCategories] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [categoryName, setCategoryName] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

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
//     <Box>
//       <Button
//         variant="contained"
//         color="primary"
//         startIcon={<Add />}
//         onClick={handleDialogOpen}
//         sx={{ mb: 2 }}
//       >
//         Add Category
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {categories.map((category) => (
//               <TableRow key={category.id}>
//                 <TableCell>{category.id}</TableCell>
//                 <TableCell>{category.name}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add New Category</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Category Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose}>Cancel</Button>
//           <Button onClick={handleSubmit}>Create</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
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
  CardContent
} from "@mui/material";
import { Add } from "@mui/icons-material";
import CategoryService from "../../../../services/CategoryService";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      showSnackbar("Failed to fetch categories", "error");
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3} sx={{ mb: 3 }}>
        <CardContent>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2
            }}
          >
            <Typography variant="h5" component="h2">
              Category Management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleDialogOpen}
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Add Category
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 'none' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow 
                    key={category.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            width: '100%',
            maxWidth: '500px'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Add New Category
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleDialogClose}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              color: 'text.secondary'
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: '8px',
            alignItems: 'center'
          }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;