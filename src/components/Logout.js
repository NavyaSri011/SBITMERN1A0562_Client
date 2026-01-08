import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // if already logged out, redirect
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("https://sbitmern1a0562-server-3.onrender.com/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");

    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
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

        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Confirm Logout
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.2,
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "rgba(0,0,0,0.8)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,1)",
            },
          }}
          onClick={handleLogout}
        >
          LOGOUT
        </Button>
      </Box>
    </Box>
  );
}
