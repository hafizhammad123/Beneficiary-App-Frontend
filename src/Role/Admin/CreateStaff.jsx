import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Stack,
    Paper,
    InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AdminLayout from "../../Components/AdminLayout";
import { EmailOutlined, Password, PasswordOutlined } from "@mui/icons-material";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import { useNavigate } from "react-router-dom";

const CreateStaff = () => {

    const naviagte = useNavigate()

    const [cnic, setCnic] = useState('')
    const [staffName, setStaffName] = useState('')
    const [staffType, setStaffType] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async () => {
        try {
            if (!cnic || !staffName || !staffType || !email || !password) {
                return alert("enter all fields")
            }

            let response = await axios.post(`${BASE_URL}/auth/staffRegister`, {
                cnic,
                staffName,
                staffType,
                email,
                password
            })

            console.log(response.data)
            let registerEmail = response.data.staffData.email
            alert(response.data.message)

            console.log(registerEmail)

            naviagte("/admin-verfiyOtp", {
                state: { email: registerEmail }
            })

        } catch (error) {

            console.log(error)

            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.massage)
            }
        }
    };

    return (
        <AdminLayout>
            <Box
                sx={{
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                }}
            >
                <Paper
                    elevation={5}
                    sx={{
                        p: 4,
                        maxWidth: 600,
                        width: "100%",
                        borderTop: "8px solid #28a745",
                        borderRadius: "16px",
                        bgcolor: "white",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            color: "#28a745",
                            fontWeight: "bold",
                            mb: 3,
                            textShadow: "1px 1px #ddd",
                        }}
                    >
                        Create New User
                    </Typography>

                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            label="Full Name"
                            // value={form.name}
                            onChange={(e) => setStaffName(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "#28a745" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />


                        <TextField
                            name="cnic"
                            label="CNIC"
                            // value={form.cnic}
                            onChange={(e) => setCnic(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CreditCardIcon sx={{ color: "#28a745" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            name="email"
                            label="Email"
                            // value={form.name}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined sx={{ color: "#28a745" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            name="Password"
                            label="Password"
                            // value={form.name}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PasswordOutlined sx={{ color: "#28a745" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            name="role"
                            label="Role"
                            select
                            // value={form.role}
                            onChange={(e) => setStaffType(e.target.value)}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SupervisorAccountIcon sx={{ color: "#28a745" }} />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="Admin">Admin</MenuItem>
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Receptionist">Receptionist</MenuItem>
                        </TextField>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            fullWidth
                            sx={{ mt: 2, bgcolor: "#0D6EFD" }}
                        >
                            Create User
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        </AdminLayout>
    );
};

export default CreateStaff;
