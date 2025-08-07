// pages/AdminLayout.jsx
import React from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Divider,
    Stack,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();

    const menuItems = [
        { text: "View All Beneficiary", icon: <PeopleIcon />, path: "/admin-allBeneficarit" },
        { text: "View All Token", icon: <AssignmentIcon />, path: "/admin-allToken" },
        { text: "Create Staff", icon: <GroupAddIcon />, path: "/admin-createStaff" },
        { text: "View Reports", icon: <DashboardIcon />, path: "/admin-report" },
        { text: "New Beneficiary", icon: <AddBoxIcon />, path: "/admin-newBeneficarit" },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* Top Navbar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    bgcolor: "white",
                    boxShadow: "none",
                    borderBottom: "1px solid #eee",
                }}
            >
                <Toolbar>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                            component="img"
                            src="../../../logo_saylaniwelfareuk.22bf709605809177256c.png"
                            alt="Saylani Logo"
                            sx={{ height: 50 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{ color: "#1f75edff", fontWeight: "bold", fontSize: "20px" }}
                        >
                            Admin Panel - Saylani Welfare Beneficiary App
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "#f9f9f9",
                        borderRight: "1px solid #ddd",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto", pt: 2 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    "&:hover": {
                                        bgcolor: "#e6f4ea",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "#28a745" }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>

            {/* Page Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f5f5f5",
                    p: 3,
                    minHeight: "100vh",
                }}
            >
                <Toolbar />
                {children ? children : <Typography>Welcome to the Admin Dashboard</Typography>}
            </Box>
        </Box>
    );
};

export default AdminLayout;
