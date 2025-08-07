import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Container,
    createTheme,
    Divider,
    MenuItem,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
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

const GenerateToken = () => {
    let loacaldata = localStorage.getItem("currentBeneficiary")
    let beneficiaryData = JSON.parse(loacaldata)

    const navigate = useNavigate()

    const [tokenId, setTokenId] = useState('')
    const [department, setDepartment] = useState('')
    const [status, setStatus] = useState('Pending')
    const [beneficiaryCnic, setBeneficiaryCnic] = useState(beneficiaryData?.cnic)
    const [tokenData, setTokenData] = useState({})

    const [tokenGenerated, setTokenGenerated] = useState(false);
    const qrRef = useRef();





    const handleGenerateToken = async () => {
        try {
            if (!tokenId || !department || !status || !beneficiaryCnic) {
                return alert("enter all field")
            }

            let tokenObj = { tokenId, department, status, beneficiaryCnic }

            const result = await axios.post(`${BASE_URL}/genToken/createToken`, tokenObj, {
                headers: {
                    "Authorization": `Bearer ${cookie.get("token")}`
                }
            })

            console.log(result.data)
            alert(result.data.message)

            setTokenData(result.data.result)
            setTokenGenerated(true)
            localStorage.removeItem("currentBeneficiary")
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    };

    const handlePrint = () => {
        const printContent = qrRef.current;
        const newWindow = window.open("", "", "width=600,height=600");
        newWindow.document.write("<html><head><title>Print QR</title></head><body>");
        newWindow.document.write(printContent.innerHTML);
        newWindow.document.write("</body></html>");
        newWindow.document.close();
        newWindow.print();
    };

    const qrData = tokenData


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
                                sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}
                            >
                                Generate Token & QR
                            </Typography>

                            <TextField
                                fullWidth
                                label="Token ID"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={tokenId}
                                onChange={(e) => setTokenId(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                select
                                label="Department"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <MenuItem value="Education">Education</MenuItem>
                                <MenuItem value="Medical">Medical</MenuItem>
                                <MenuItem value="Finance">Finance</MenuItem>
                            </TextField>

                            <TextField
                                fullWidth
                                label="Status"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Beneficiary CNIC"
                                variant="outlined"
                                sx={{ mb: 2 }}
                                value={beneficiaryCnic}
                                onChange={(e) => setBeneficiaryCnic(e.target.value)}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleGenerateToken}
                            >
                                Generate Token
                            </Button>

                            {tokenGenerated && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Box
                                        ref={qrRef}
                                        sx={{
                                            textAlign: "center",
                                            background: "#fff",
                                            p: 2,
                                            border: "1px solid #eee",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ mb: 2, color: "secondary.main" }}>
                                            Token QR Code
                                        </Typography>
                                        <QRCodeSVG value={qrData} size={200} includeMargin={true} />
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            Token ID: {tokenData.tokenId}
                                        </Typography>
                                        <Typography variant="body2">Dept: {tokenData.department}</Typography>
                                        <Typography variant="body2">Status: {tokenData.status}</Typography>
                                        <Typography variant="body2">Beneficiary ID: {tokenData.beneficiaryCnic}</Typography>
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={handlePrint}
                                        sx={{ mt: 3 }}
                                    >
                                        Print QR Code
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => navigate("/receptionist/RegisterBeneficiary")}
                                        sx={{ mt: 3 }}
                                        
                                    >
                                        Go to Home
                                    </Button>
                                </>
                            )}
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        </ReceptionLayout>
    );
};

export default GenerateToken;
