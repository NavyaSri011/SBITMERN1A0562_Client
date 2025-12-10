import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        backgroundColor: "#003437",
        color: "white",
        textAlign: "center",
        width: "100%",
        position: "fixed",   
        bottom: 0,           
        left: 0,
        zIndex: 1200,        
      }}
    >
      <Typography variant="body2">
        © 2025 SBIT Chatbot | All Rights Reserved
      </Typography>
    </Box>
  );
}

export default Footer;
