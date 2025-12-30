import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uname: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://sbitmern1a0562-server-2.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uname: formData.uname,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError("Server error. Please try again later.");
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
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          p: 3,
        }}
      >
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
          Sign In
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

          {/* Role Dropdown */}
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

          {error && (
            <Typography
              color="error"
              sx={{ mt: 1, mb: 1, fontSize: "0.9rem", fontWeight: 500 }}
            >
              {error}
            </Typography>
          )}

          <FormControlLabel
            control={<Checkbox color="default" sx={{ color: "#fff" }} />}
            label="Remember me"
            sx={{ mt: 1 }}
          />

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
            Sign In
          </Button>

 
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/signup")}
                sx={{ color: "#fff" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
      
        </Box>
      </Box>
    </Box>
  );
}
