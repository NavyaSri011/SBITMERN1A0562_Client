import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/Responsiveappbar";
import FeedbackForm from "./components/FeedbackForm";
import Home from "./components/Home";
import Students from "./components/Students";
import StudentCode from "./components/StudentCode";
import StaffTable from "./components/StaffTable";
import ManagementTable from "./components/ManagementTable";
import FacultyTable from "./components/FacultyTable";
import Faculty from "./components/Faculty";
import Login from "./components/Login";
import Staff from "./components/Staff";
import Management from "./components/Management";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Profile from "./components/Profile";

function App() {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ResponsiveAppBar handleLogout={handleLogout} />
        <Container sx={{ flex: 1, py: 4, textAlign: "center" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/faculty"
              element={
                <>
                  <FacultyTable />
                  <Box mt={3}>
                    <Faculty />
                  </Box>
                </>
              }
            />
            <Route
              path="/staff"
              element={
                <>
                  <StaffTable />
                  <Box mt={3}>
                    <Staff />
                  </Box>
                </>
              }
            />
            <Route path="/management" element={
                <>
                  <ManagementTable />
                  <Box mt={3}>
                    <Management />
                  </Box>
                </>
              }
            />
            <Route path="/students" element={
                <>
                  <Students />
                  <Box mt={3}>
                    <StudentCode />
                  </Box>
                </>
              }
            />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Container>

        
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
