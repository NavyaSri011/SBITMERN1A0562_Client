import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          "https://sbitmern1a0562-server-3.onrender.com/api/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ CORRECT LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #478a71ff, #003437)",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} />
      </Box>
    );
  }

  if (!user) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #478a71ff, #003437)",
        color: "white",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, p: 4, borderRadius: 3 }}>
        <Avatar
          sx={{
            bgcolor: "rgba(255,255,255,0.2)",
            width: 70,
            height: 70,
            m: "auto",
            mb: 2,
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome, {user.username} 👋
        </Typography>

        <Typography sx={{ mb: 3, color: "#ddd" }}>
          Role: <strong>{user.role}</strong>
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            py: 1.2,
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "rgba(0,0,0,0.6)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

