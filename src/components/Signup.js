import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    try {
     
      const res = await axios.post("http://localhost:3001/api/register", {
        uname: formData.uname,
        password: formData.password,
        role: formData.role,
      });

      console.log("Signup success:", res.data);
      setSuccess("Registered successfully! Redirecting to login...");
      setError("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #478a71ff, #003437)",
        color: "white",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, textAlign: "center", p: 3 }}>
        <Avatar
          sx={{
            bgcolor: "rgba(255,255,255,0.2)",
            width: 60,
            height: 60,
            margin: "auto",
            mb: 2,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>

        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, fontWeight: 600, color: "#fff" }}
        >
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="uname"
            fullWidth
            required
            margin="normal"
            value={formData.uname}
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            required
            margin="normal"
            value={formData.role}
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="faculty">Faculty</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="management">Management</MenuItem>
          </TextField>

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            required
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
            InputLabelProps={{ style: { color: "#ddd" } }}
          />

          {error && (
            <Typography
              color="error"
              sx={{ mt: 1, mb: 1, fontSize: "0.9rem", fontWeight: 500 }}
            >
              {error}
            </Typography>
          )}
          {success && (
            <Typography
              color="success.main"
              sx={{ mt: 1, mb: 1, fontSize: "0.9rem", fontWeight: 500 }}
            >
              {success}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/login")}
                sx={{ color: "#fff" }}
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
