import React, { useEffect, useState } from "react";
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
import api from "../api/api"; // ✅ axios instance

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

  // 🔐 Role check
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userRole = decoded?.role?.toLowerCase();
  const canEdit = userRole === "management";

  // 📥 Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/management");
      setData(res.data);
    } catch (err) {
      console.error("Error fetching management:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingManagement) {
        await api.put(`/management/${editingManagement._id}`, formData);
      } else {
        await api.post("/management", formData);
      }
      fetchData();
      handleClose();
    } catch (err) {
      console.error("Save failed:", err);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await api.delete(`/management/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Management Details
        </Typography>

        {canEdit && (
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Add Management
          </Button>
        )}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2f7c81" }}>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Department</TableCell>
              <TableCell sx={{ color: "#fff" }}>Skills</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id}>
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
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item._id)}
                    disabled={!canEdit}
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
          {editingManagement ? "Edit Management" : "Add Management"}
        </DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="mname" value={formData.mname} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Role" name="role" value={formData.role} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Department" name="department" value={formData.department} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
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

