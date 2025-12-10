import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Logout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ uname: "", password: "" });
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [snack, setSnack] = useState({ open: false, severity: "info" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setFormData({ uname: storedUser.uname, password: "" });
    setRole(storedUser.role);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in!");
      setSnack({ open: true, severity: "error" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/api/logout",
        {
          uname: formData.uname,
          password: formData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
        setMessage(res.data.message || "Logout successful!");
        setSnack({ open: true, severity: "success" });

        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error(res.data.message || "Logout failed.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setError(
        err.response?.data?.message ||
          "Logout failed. Please check your password."
      );
      setSnack({ open: true, severity: "error" });
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
          width: "90%",
          maxWidth: 400,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 3,
          p: 4,
          textAlign: "center",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
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
          <LogoutIcon fontSize="large" />
        </Avatar>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
          Confirm Logout
        </Typography>

        {role && (
          <Typography variant="body2" sx={{ mb: 3, color: "#ddd" }}>
            Logged in as <strong>{formData.uname}</strong> ({role})
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="uname"
            fullWidth
            required
            disabled
            margin="normal"
            value={formData.uname}
            InputProps={{
              style: {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
              },
            }}
            InputLabelProps={{ style: { color: "#ccc" } }}
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
            InputLabelProps={{ style: { color: "#ccc" } }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1, mb: 1, fontWeight: 500 }}>
              {error}
            </Typography>
          )}

          {message && (
            <Typography color="success.main" sx={{ mt: 1, mb: 1, fontWeight: 500 }}>
              {message}
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
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,1)",
              },
            }}
          >
            LOGOUT
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/profile")}
                sx={{ color: "#fff" }}
              >
                Cancel and go back
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error || message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
