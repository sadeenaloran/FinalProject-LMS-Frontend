// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
//   Divider,
//   FormHelperText,
// } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// const CourseForm = ({ course, onSubmit, onCancel }) => {
//   const [thumbnail, setThumbnail] = useState(null);
//   const [thumbnailPreview, setThumbnailPreview] = useState(
//     course?.thumbnailUrl || null
//   );

//   // Form validation schema
//   const validationSchema = Yup.object({
//     title: Yup.string().required("Title is required"),
//     description: Yup.string().required("Description is required"),
//     category: Yup.string().required("Category is required"),
//     level: Yup.string().required("Level is required"),
//     price: Yup.number().min(0, "Price cannot be negative"),
//   });

//   // Formik form handling
//   const formik = useFormik({
//     initialValues: {
//       title: course?.title || "",
//       description: course?.description || "",
//       category: course?.category || "",
//       level: course?.level || "beginner",
//       price: course?.price || 0,
//       isPublished: course?.isPublished || false,
//     },
//     validationSchema,
//     onSubmit: (values) => {
//       const formData = new FormData();
//       formData.append("title", values.title);
//       formData.append("description", values.description);
//       formData.append("category", values.category);
//       formData.append("level", values.level);
//       formData.append("price", values.price);
//       formData.append("isPublished", values.isPublished);
//       if (thumbnail) {
//         formData.append("thumbnail", thumbnail);
//       }
//       onSubmit(formData);
//     },
//   });

//   // Handle thumbnail change
//   const handleThumbnailChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setThumbnail(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setThumbnailPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
//       <Grid container spacing={3}>
//         {/* Thumbnail Upload */}
//         <Grid item xs={12} md={4}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: 2,
//             }}
//           >
//             {thumbnailPreview ? (
//               <img
//                 src={thumbnailPreview}
//                 alt="Course thumbnail"
//                 style={{
//                   width: "100%",
//                   maxHeight: 200,
//                   objectFit: "cover",
//                   borderRadius: 8,
//                 }}
//               />
//             ) : (
//               <Box
//                 sx={{
//                   width: "100%",
//                   height: 200,
//                   bgcolor: "grey.100",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: 8,
//                 }}
//               >
//                 <Typography color="textSecondary">
//                   No thumbnail selected
//                 </Typography>
//               </Box>
//             )}
//             <Button variant="contained" component="label">
//               Upload Thumbnail
//               <input
//                 type="file"
//                 hidden
//                 accept="image/*"
//                 onChange={handleThumbnailChange}
//               />
//             </Button>
//             <FormHelperText>Recommended size: 1280x720 pixels</FormHelperText>
//           </Box>
//         </Grid>

//         {/* Course Details */}
//         <Grid item xs={12} md={8}>
//           <TextField
//             fullWidth
//             id="title"
//             name="title"
//             label="Course Title"
//             value={formik.values.title}
//             onChange={formik.handleChange}
//             error={formik.touched.title && Boolean(formik.errors.title)}
//             helperText={formik.touched.title && formik.errors.title}
//             sx={{ mb: 2 }}
//           />

//           <TextField
//             fullWidth
//             id="description"
//             name="description"
//             label="Course Description"
//             multiline
//             rows={4}
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.description && Boolean(formik.errors.description)
//             }
//             helperText={formik.touched.description && formik.errors.description}
//             sx={{ mb: 2 }}
//           />

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 id="category"
//                 name="category"
//                 label="Category"
//                 value={formik.values.category}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.category && Boolean(formik.errors.category)
//                 }
//                 helperText={formik.touched.category && formik.errors.category}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="level-label">Level</InputLabel>
//                 <Select
//                   labelId="level-label"
//                   id="level"
//                   name="level"
//                   value={formik.values.level}
//                   onChange={formik.handleChange}
//                   error={formik.touched.level && Boolean(formik.errors.level)}
//                 >
//                   <MenuItem value="beginner">Beginner</MenuItem>
//                   <MenuItem value="intermediate">Intermediate</MenuItem>
//                   <MenuItem value="advanced">Advanced</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 id="price"
//                 name="price"
//                 label="Price ($)"
//                 type="number"
//                 value={formik.values.price}
//                 onChange={formik.handleChange}
//                 error={formik.touched.price && Boolean(formik.errors.price)}
//                 helperText={formik.touched.price && formik.errors.price}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth>
//                 <InputLabel id="publish-label">Publish Status</InputLabel>
//                 <Select
//                   labelId="publish-label"
//                   id="isPublished"
//                   name="isPublished"
//                   value={formik.values.isPublished}
//                   onChange={formik.handleChange}
//                 >
//                   <MenuItem value={true}>Publish Now</MenuItem>
//                   <MenuItem value={false}>Save as Draft</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       {/* Form Actions */}
//       <Box display="flex" justifyContent="flex-end" gap={2}>
//         <Button variant="outlined" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit" variant="contained" color="primary">
//           {course ? "Update Course" : "Create Course"}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CourseForm;
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category is required"),
  duration: Yup.number().required("Duration is required").positive(),
});

const CourseForm = ({ course, onSubmit, onCancel }) => {
  const [thumbnail, setThumbnail] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: course?.title || "",
      description: course?.description || "",
      category_id: course?.category_id || "",
      duration: course?.duration || 0,
      thumbnail: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);
      formData.append("duration", values.duration);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      onSubmit(formData);
    },
  });

  const handleFileChange = (event) => {
    setThumbnail(event.target.files[0]);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={formik.values.category_id}
              onChange={formik.handleChange}
              label="Category"
            >
              <MenuItem value="1">Programming</MenuItem>
              <MenuItem value="2">Design</MenuItem>
              <MenuItem value="3">Business</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Duration (hours)"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />
        </Grid>

        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="thumbnail-upload"
          />
          <label htmlFor="thumbnail-upload">
            <Button variant="contained" component="span">
              Upload Thumbnail
            </Button>
          </label>
          {thumbnail && <Typography>{thumbnail.name}</Typography>}
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {course ? "Update Course" : "Create Course"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseForm;
