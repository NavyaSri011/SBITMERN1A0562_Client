import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const StudentTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Correct form fields
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    cgpa: "",
  });

  let userRole = "student";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userRole = decoded.role?.toLowerCase() || "student";
    }
  } catch (err) {
    console.error("JWT decode error:", err);
  }

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://sbitmern1a0562-server-3.onrender.com/api/students")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = () => {
    if (editingStudent) {
      // Update Student
      axios
        .put(`https://sbitmern1a0562-server-3.onrender.com/api/students/${editingStudent._id}`, formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      // Add Student
      axios
        .post("https://sbitmern1a0562-server-3.onrender.com/api/students", formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  // Edit Button
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      branch: student.Branch, // backend returns Branch
      cgpa: student.CGPA,
    });
    setOpenDialog(true);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`https://sbitmern1a0562-server-3.onrender.com/api/students/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

  // Close Dialog
  const handleClose = () => {
    setOpenDialog(false);
    setEditingStudent(null);

    // FIXED RESET
    setFormData({
      name: "",
      branch: "",
      cgpa: "",
    });
  };

  const canEdit = userRole === "staff" || userRole === "management";
  const canAdd = userRole === "staff" || userRole === "management";
  const canDelete = userRole === "staff" || userRole === "management";

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 4,
        borderRadius: "16px",
        boxShadow: "0px 4px 25px rgba(0,0,0,0.1)",
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          Student Details
        </Typography>

        {canAdd && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add Student
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81ff" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Branch</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CGPA</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((student, index) => (
              <TableRow
                key={student._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb", transition: "0.2s" },
                }}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.Branch}</TableCell>
                <TableCell>{student.CGPA}</TableCell>

                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => canEdit && handleEdit(student)}
                    disabled={!canEdit}
                  >
                    <Edit sx={{ opacity: canEdit ? 1 : 0.4 }} />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => canDelete && handleDelete(student._id)}
                    disabled={!canDelete}
                  >
                    <Delete sx={{ opacity: canDelete ? 1 : 0.4 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingStudent ? "Edit Student" : "Add New Student"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Branch"
            name="branch"
            fullWidth
            value={formData.branch}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="CGPA"
            name="cgpa"
            fullWidth
            value={formData.cgpa}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingStudent ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StudentTable;
