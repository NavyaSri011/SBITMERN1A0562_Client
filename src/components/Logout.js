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
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");

    // Redirect to login
    navigate("/login");
  }, [navigate]);

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
      <Box sx={{ textAlign: "center" }}>
        <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", m: "auto", mb: 2 }}>
          <LogoutIcon />
        </Avatar>

        <Typography variant="h6">
          Logging you out...
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
}
