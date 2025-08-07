import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    Paper,
    createTheme,
    ThemeProvider,
    List,
    ListItem,
    MenuItem,
} from "@mui/material";
import ReceptionLayout from "../../Components/ReceptionLayout";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import cookie from "js-cookie"
import { useNavigate } from "react-router-dom";

const saylaniTheme = createTheme({
    palette: {
        primary: {
            main: "#0D6EFD",
        },
        secondary: {
            main: "#28a745",
        },
        background: {
            default: "#f4f6f8",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
    },
});

const RegisterBeneficiaryPage = () => {

    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [cnic, setCnic] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [city, setCity] = useState('')
    const [purpose, setPurpose] = useState('')


    const handleSubmit = async () => {
        try {
            if (!fullName || !cnic || !city || !phoneNumber || !purpose) {
                return alert("enter all fields.")
            }

            let beneficiaryData = {
                fullName, cnic, city, phoneNumber, purpose
            }

            let result = await axios.post(`${BASE_URL}/reception/beneficiary`, beneficiaryData, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("token")}`
                }
            })

            console.log(result.data)
            alert(result.data.message)

            localStorage.setItem("currentBeneficiary", JSON.stringify(result.data.result))
            navigate("/receptionist/GenrateToken")


        }
        catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    };

    return (
        <ReceptionLayout>


            <ThemeProvider theme={saylaniTheme}>
                <Box
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "background.default",
                        p: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                sx={{ color: "secondary.main", fontWeight: "bold", mb: 2 }}
                            >
                                Register New Beneficiary
                            </Typography>

                            <TextField
                                fullWidth
                                label="Full Name"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="CNIC"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={cnic}
                                onChange={(e) => setCnic(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Phone Number"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="City"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />

                            <Box display="flex" gap={2} mb={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Purpose"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                >
                                    <MenuItem value="Education">Education</MenuItem>
                                    <MenuItem value="Medical">Medical</MenuItem>
                                    <MenuItem value="Finance">Finance</MenuItem>
                                </TextField>

                            </Box>



                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Register Beneficiary
                            </Button>
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        </ReceptionLayout>
    );
};

export default RegisterBeneficiaryPage;
