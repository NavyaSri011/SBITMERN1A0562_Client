import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const pages = ["Faculty", "Staff", "Management", "Students", "Feedback"];
const settings = ["Profile", "Dashboard", "Login", "Logout"];

export default function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase() || "guest";

  const permissions = {
    student: {
      canManageStudents: false,
      canManageStaff: false,
      canManageFaculty: false,
      canManageManagement: false,
    },
    staff: {
      canManageStudents: true,
      canManageStaff: false,
      canManageFaculty: false,
      canManageManagement: false,
    },
    faculty: {
      canManageStudents: false,
      canManageStaff: true,
      canManageFaculty: false,
      canManageManagement: false,
    },
    management: {
      canManageStudents: true,
      canManageStaff: true,
      canManageFaculty: true,
      canManageManagement: true,
    },
  };

  React.useEffect(() => {
    if (role !== "guest") {
      localStorage.setItem("permissions", JSON.stringify(permissions[role]));
    }
  }, [role]);

  const handlePageChange = (page) => {
    navigate(`/${page.toLowerCase()}`);
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No active session found.");

      const res = await axios.post(
        "http://localhost:3001/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        // clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");

        // show success
        setSnack({
          open: true,
          message: "Logged out successfully!",
          severity: "success",
        });

        // redirect after short delay
        setTimeout(() => navigate("/login"), 1500);
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setSnack({
        open: true,
        message: "Logout failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleUserMenuClick = (setting) => {
    setAnchorElUser(null);
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Login":
        navigate("/login");
        break;
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#003437",
          color: "#ffffff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo (desktop) */}
            <Box
              component="img"
              src="/sbit.jpg"
              alt="SbitChatBot Logo"
              onClick={handleLogoClick}
              sx={{
                display: { xs: "none", md: "flex" },
                height: 40,
                width: 40,
                borderRadius: "50%",
                mr: 1,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              onClick={handleLogoClick}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "crimson",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              SBITCHATBOT
            </Typography>

            {/* Menu icon (mobile) */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={(e) => setAnchorElNav(e.currentTarget)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageChange(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo (mobile) */}
            <Box
              component="img"
              src="/sbit.jpg"
              alt="SbitChatBot Logo"
              onClick={handleLogoClick}
              sx={{
                display: { xs: "flex", md: "none" },
                height: 35,
                width: 35,
                borderRadius: "50%",
                mr: 1,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h5"
              noWrap
              onClick={handleLogoClick}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "slabo",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              SBITCHATBOT
            </Typography>

            {/* Navbar pages (desktop) */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "Barlow",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* User Menu */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleUserMenuClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {role !== "guest" && (
              <Typography sx={{ ml: 2, fontWeight: 600 }}>
                {role.toUpperCase()}
              </Typography>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Snackbar feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
