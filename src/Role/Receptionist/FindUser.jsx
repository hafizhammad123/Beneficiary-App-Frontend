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
    Divider,
} from "@mui/material";
import ReceptionLayout from "../../Components/ReceptionLayout";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import cookie from "js-cookie";
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
            default: "#f9f9f9",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        fontWeightBold: 600,
    },
});

const FindUser = () => {

    const navigate = useNavigate()

    const [cnic, setCnic] = useState("");
    const [user, setUser] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [purpose, setPurpose] = useState("");

    const handleFindUser = async () => {
        try {
            if (!cnic) {
                return alert("please enter beneficiary Cnic.")
            }

            let result = await axios.post(`${BASE_URL}/reception/beneficiary-find`, { cnic }, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("token")}`
                }
            })

            console.log(result.data)
            alert(result.data.message)
            
            localStorage.setItem("currentBeneficiary", JSON.stringify(result.data.result))
            if (result.data.result) {
                setUser(result.data.result)
                setNotFound(false)

            } else {
                setNotFound(true)
                setUser(null)
            }
        }
        catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
                setNotFound(true)
                setUser(null)
            } else {
                alert(error.message)
                setNotFound(true)
                setUser(null)
            }
        }
    };


    const addPurpose = async () => {
        try {
            let cnic = user.cnic

            let purposeObj = {
                cnic,
                purpose
            }

            let result = await axios.post(`${BASE_URL}/reception/beneficiary-addPurpose`, purposeObj, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("token")}`
                }
            })
            console.log(result.data)
            alert(result.data.message)
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }


    return (
        <ReceptionLayout>
            <ThemeProvider theme={saylaniTheme}>
                <Box
                    sx={{
                        minHeight: "100vh",
                        backgroundColor: "background.default",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                            <Typography
                                variant="h5"
                                align="center"
                                gutterBottom
                                sx={{ color: "primary.main", fontWeight: "bold" }}
                            >
                                Find Beneficiary by CNIC
                            </Typography>

                            <Box display="flex" gap={2} mt={2}>
                                <TextField
                                    fullWidth
                                    label="Enter CNIC"
                                    variant="outlined"
                                    value={cnic}
                                    onChange={(e) => setCnic(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFindUser}
                                >
                                    Find
                                </Button>
                            </Box>

                            {user && (
                                <Box mt={4}>
                                    <Typography variant="h6" color="secondary">
                                        Beneficiary Details:
                                    </Typography>
                                    <Typography>Name: {user.fullName}</Typography>
                                    <Typography>CNIC: {user.cnic}</Typography>
                                    <Typography>Phone: {user.phoneNumber}</Typography>

                                    <Divider sx={{ my: 2 }} />

                                    <Typography variant="h6" color="secondary">
                                        Purposes:
                                    </Typography>
                                    <List dense>
                                        {user.purpose.map((purpose, index) => (
                                            <ListItem key={index}>- {purpose}</ListItem>
                                        ))}
                                    </List>

                                    <Box display="flex" gap={2} mt={2}>
                                        <TextField
                                            label="Add New Purpose"
                                            variant="outlined"
                                            fullWidth
                                            value={purpose}
                                            onChange={(e) => setPurpose(e.target.value)}
                                        />

                                    </Box>

                                    <Button
                                        sx={{ mt: 2 }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={addPurpose}
                                    >
                                        Add New Purpose
                                    </Button>
                                    <Button
                                        sx={{ mt: 2, ml: '10px' }}
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => navigate("/receptionist/GenrateToken")}
                                    >
                                        Genrate Token
                                    </Button>
                                </Box>


                            )}

                            {notFound && (
                                <Typography
                                    mt={4}
                                    color="error"
                                    fontWeight="bold"
                                    textAlign="center"
                                >
                                    User not found. Please register the beneficiary.
                                </Typography>
                            )}

                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        </ReceptionLayout>

    );
};

export default FindUser;
