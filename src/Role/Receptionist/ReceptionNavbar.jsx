// components/Navbar.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  useMediaQuery,
  useTheme,
  IconButton,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const ReceptionNavbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showNavLinks, setShowNavLinks] = useState(false); // Jahil btn toggle

  const handleLogout = () => {

    localStorage.removeItem("currentType")
    navigate("/")


  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "white", boxShadow: 3 }}>
      <Toolbar sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box>
          <Box
            component="img"
            width={isMobile ? "150px" : "180px"}
            src="../../../logo_saylaniwelfareuk.22bf709605809177256c.png"
            alt="Saylani Logo"
          />
        </Box>

        {/* Jahil Toggle Button */}
        {isMobile ? (
          <IconButton onClick={() => setShowNavLinks(!showNavLinks)}>
            {showNavLinks ? <CloseIcon sx={{ color: "#28a745" }} /> : <MenuIcon sx={{ color: "#28a745" }} />}
          </IconButton>
        ) : (
          // Desktop nav buttons
          <Stack direction="row" spacing={2}>
            <Button sx={{ color: "#28a745" }} startIcon={<PersonAddIcon />} onClick={() => navigate("/receptionist/RegisterBeneficiary")}>
              Register
            </Button>
            <Button sx={{ color: "#28a745" }} startIcon={<SearchIcon />} onClick={() => navigate("/receptionist/findUser")}>
              Find User
            </Button>
            <Button sx={{ color: "#28a745" }} startIcon={<LogoutIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>

      {/* Mobile nav buttons (collapse below toolbar) */}
      {isMobile && (
        <Collapse in={showNavLinks}>
          <Stack direction="column" spacing={1} sx={{ p: 2 }}>
            <Button fullWidth sx={{ color: "#28a745", justifyContent: "flex-start" }} startIcon={<PersonAddIcon />} onClick={() => {
              navigate("/receptionist/RegisterBeneficiary");
              setShowNavLinks(false);
            }}>
              Register
            </Button>
            <Button fullWidth sx={{ color: "#28a745", justifyContent: "flex-start" }} startIcon={<SearchIcon />} onClick={() => {
              navigate("/receptionist/findUser");
              setShowNavLinks(false);
            }}>
              Find User
            </Button>
            <Button fullWidth sx={{ color: "#28a745", justifyContent: "flex-start" }} startIcon={<LogoutIcon />} onClick={() => {
              handleLogout();
              setShowNavLinks(false);
            }}>
              Logout
            </Button>
          </Stack>
        </Collapse>
      )}
    </AppBar>
  );
};

export default ReceptionNavbar;
