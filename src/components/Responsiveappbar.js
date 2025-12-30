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

const pages = ["Faculty", "Staff", "Management", "Students", "Feedback"];
const settings = ["Profile", "Dashboard", "Logout"];

export default function ResponsiveAppBar() {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role?.toLowerCase() || "guest";

  // ✅ FRONTEND-ONLY LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");

    setAnchorElUser(null);
    window.location.href = "/login";
  };

  const handlePageChange = (page) => {
    setAnchorElNav(null);
    navigate(`/${page.toLowerCase()}`);
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
      case "Logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#003437" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo (desktop) */}
          <Box
            component="img"
            src="/sbit.jpg"
            alt="SBIT Logo"
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
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
          >
            SBITCHATBOT
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => handlePageChange(page)}
                >
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo (mobile) */}
          <Typography
            variant="h6"
            noWrap
            onClick={handleLogoClick}
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              cursor: "pointer",
            }}
          >
            SBITCHATBOT
          </Typography>

          {/* Desktop Pages */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                sx={{ my: 2, color: "white" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleUserMenuClick(setting)}
                >
                  <Typography>{setting}</Typography>
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
  );
}

