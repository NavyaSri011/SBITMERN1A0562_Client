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

  
  const [formData, setFormData] = useState({
    name: "",
    Branch: "",
    CGPA: "",
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

  const canEdit = userRole === "staff" || userRole === "management";
  const canAdd = canEdit;
  const canDelete = canEdit;


  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://sbitmern1a0562-server-4.onrender.com/api/students")
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
    if (!formData.name || !formData.Branch || !formData.CGPA) {
      alert("All fields are required");
      return;
    }

    if (editingStudent) {
    
      axios
        .put(
          `https://sbitmern1a0562-server-3.onrender.com/api/students/${editingStudent._id}`,
          formData
        )
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
    
      axios
        .post(
          "https://sbitmern1a0562-server-3.onrender.com/api/students",
          formData
        )
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  
  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      Branch: student.Branch,
      CGPA: student.CGPA,
    });
    setOpenDialog(true);
  };

  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(
          `https://sbitmern1a0562-server-3.onrender.com/api/students/${id}`
        )
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

 
  const handleClose = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    setFormData({
      name: "",
      Branch: "",
      CGPA: "",
    });
  };

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
    <Paper sx={{ p: 4, mt: 3, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Student Details
        </Typography>

        {canAdd && (
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Add Student
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81" }}>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Branch</TableCell>
              <TableCell sx={{ color: "white" }}>CGPA</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((student, index) => (
              <TableRow
                key={student._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e3f2fd",
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
                    <Edit />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => canDelete && handleDelete(student._id)}
                    disabled={!canDelete}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingStudent ? "Edit Student" : "Add Student"}
        </DialogTitle>

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
            name="Branch"
            fullWidth
            value={formData.Branch}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="CGPA"
            name="CGPA"
            fullWidth
            value={formData.CGPA}
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

