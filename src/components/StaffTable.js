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

const StaffTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    sname: "",
    department: "",
    technology: "",
    skills: "",
  });

  
  let userRole = "student";
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userRole = decoded.role?.toLowerCase() || "student";
    }
  } catch (error) {
    console.error("JWT decode failed:", error);
  }

 
  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://sbitmern1a0562-server-3.onrender.com/api/staff")
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
    if (editingStaff) {
      axios
        .put(`https://sbitmern1a0562-server-3.onrender.com/api/staff/${editingStaff._id}`, formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("https://sbitmern1a0562-server-3.onrender.com/api/staff", formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };


  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setFormData({
      sname: staff.sname,
      department: staff.department,
      technology: staff.technology,
      skills: staff.skills,
    });
    setOpenDialog(true);
  };


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      axios
        .delete(`https://sbitmern1a0562-server-3.onrender.com/api/staff/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };


  const handleClose = () => {
    setOpenDialog(false);
    setEditingStaff(null);
    setFormData({
      sname: "",
      department: "",
      technology: "",
      skills: "",
    });
  };


  const canEdit = userRole === "management" || userRole === "faculty";
  const canAdd = userRole === "management" || userRole === "faculty";
  const canDelete = userRole === "management" || userRole === "faculty";


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
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#2c3e50" }}
        >
          Staff Details
        </Typography>

       
        {canAdd && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add Staff
          </Button>
        )}
      </Box>

      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81ff" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Technology</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Skills</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((staff, index) => (
              <TableRow
                key={staff._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e3f2fd",
                  "&:hover": {
                    backgroundColor: "#bbdefb",
                    transition: "0.2s",
                  },
                }}
              >
                <TableCell>{staff.sname}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.technology}</TableCell>
                <TableCell>{staff.skills}</TableCell>

               
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => canEdit && handleEdit(staff)}
                    disabled={!canEdit}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => canDelete && handleDelete(staff._id)}
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

  
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="sname"
            fullWidth
            value={formData.sname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Department"
            name="department"
            fullWidth
            value={formData.department}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Technology"
            name="technology"
            fullWidth
            value={formData.technology}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Skills"
            name="skills"
            fullWidth
            value={formData.skills}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingStaff ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StaffTable;
