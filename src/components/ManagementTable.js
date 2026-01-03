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
import {jwtDecode} from "jwt-decode";

const ManagementTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingManagement, setEditingManagement] = useState(null);
  const [formData, setFormData] = useState({
    mname: "",
    role: "",
    department: "",
    skills: "",
  });

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userRole = decoded?.role?.toLowerCase();

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://sbitmern1a0562-server-3.onrender.com/api/management")
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
    if (editingManagement) {
      axios
        .put(`https://sbitmern1a0562-server-3.onrender.com/api/management/${editingManagement._id}`, formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("https://sbitmern1a0562-server-3.onrender.com/api/management", formData)
        .then(() => {
          fetchData();
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (item) => {
    setEditingManagement(item);
    setFormData({
      mname: item.mname,
      role: item.role,
      department: item.department,
      skills: item.skills,
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios
        .delete(`https://sbitmern1a0562-server-3.onrender.com/api/management/${id}`)
        .then(() => fetchData())
        .catch((err) => console.error(err));
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setEditingManagement(null);
    setFormData({
      mname: "",
      role: "",
      department: "",
      skills: "",
    });
  };

  const canEdit = userRole === "management";

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
    <Paper elevation={4} sx={{ padding: 4, borderRadius: "16px", mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2c3e50" }}>
          Management Details
        </Typography>

        {canEdit && (
          <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Add Management
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81ff" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Department</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Skills</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb", transition: "0.2s" },
                }}
              >
                <TableCell>{item.mname}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.skills}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(item)}
                    disabled={!canEdit}
                  >
                    <Edit sx={{ opacity: canEdit ? 1 : 0.4 }} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item._id)}
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
        <DialogTitle>{editingManagement ? "Edit Management" : "Add New Management"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="mname"
            fullWidth
            value={formData.mname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            value={formData.role}
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
            {editingManagement ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManagementTable;
