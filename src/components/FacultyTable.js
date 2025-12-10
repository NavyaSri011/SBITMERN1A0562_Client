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

const FacultyTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    Branch: "",
    designation: "",
    qualification: "",
    Salary: "",
  });

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userRole = decoded?.role?.toLowerCase();

  const fetchData = () => {
    setLoading(true);
    axios
      .get("/api/faculty")
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingFaculty) {
      axios
        .put(`/api/faculty/${editingFaculty._id}`, formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("/api/faculty", formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      fname: faculty.fname,
      Branch: faculty.Branch,
      designation: faculty.designation,
      qualification: faculty.qualification,
      Salary: faculty.Salary,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this faculty?")) {
      axios
        .delete(`/api/faculty/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingFaculty(null);
    setFormData({
      fname: "",
      Branch: "",
      designation: "",
      qualification: "",
      Salary: "",
    });
  };


  const canEdit = userRole === "management";

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={4} sx={{ padding: 4, borderRadius: "16px", mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          Faculty Details 
        </Typography>

        {canEdit && (
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Add Faculty
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81ff" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Branch</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Designation</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Qualification</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Salary</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((faculty, index) => (
              <TableRow
                key={faculty._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb", transition: "0.2s" },
                }}
              >
                <TableCell>{faculty.fname}</TableCell>
                <TableCell>{faculty.Branch}</TableCell>
                <TableCell>{faculty.designation}</TableCell>
                <TableCell>{faculty.qualification}</TableCell>
                <TableCell>{faculty.Salary}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(faculty)}
                    disabled={!canEdit}
                  >
                    <Edit sx={{ opacity: canEdit ? 1 : 0.4 }} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(faculty._id)}
                    disabled={!canEdit}
                  >
                    <Delete sx={{ opacity: canEdit ? 1 : 0.4 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

 
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingFaculty ? "Edit Faculty" : "Add New Faculty"}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" name="fname" fullWidth value={formData.fname} onChange={handleChange} />
          <TextField margin="dense" label="Branch" name="Branch" fullWidth value={formData.Branch} onChange={handleChange} />
          <TextField margin="dense" label="Designation" name="designation" fullWidth value={formData.designation} onChange={handleChange} />
          <TextField margin="dense" label="Qualification" name="qualification" fullWidth value={formData.qualification} onChange={handleChange} />
          <TextField margin="dense" label="Salary" name="Salary" fullWidth value={formData.Salary} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingFaculty ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default FacultyTable;
