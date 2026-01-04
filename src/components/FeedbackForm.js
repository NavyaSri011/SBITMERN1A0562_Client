import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "info" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://sbitmern1a0562-server-3.onrender.com/api/send", form);
      setSnack({ open: true, message: res.data.message, severity: "success" });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSnack({ open: true, message: "Failed to send feedback. Try again.", severity: "error" });
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #478a71ff, #003437)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 600,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <FeedbackIcon
          sx={{
            color: "#003437",
            fontSize: 50,
            mb: 2,
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: "#003437" }}>
          Feedback Form
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Your Name"
            name="name"
            fullWidth
            required
            margin="normal"
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Your Feedback"
            name="message"
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
            value={form.message}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              fontWeight: 600,
              borderRadius: 2,
              backgroundColor: "#003437",
            }}
          >
            Submit Feedback
          </Button>
        </Box>
      </Paper>

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
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FeedbackForm;
