// pages/BeneficiaryDetail.jsx
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AdminLayout from "../../Components/AdminLayout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import Cookies from "js-cookie";



const BeneficiaryDetail = () => {

    let { cnic } = useParams()

    let [beneficiaryDetail, setBeneficiaryDetail] = useState({})
    let [tokens, setTokens] = useState([])
    let [loder, setLoder] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoder(true)
            let result = await axios.get(`${BASE_URL}/reception/beneficiar/${cnic}`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(result.data.detailBeneficiary)
            setBeneficiaryDetail(result.data.detailBeneficiary.findBeneficiary)
            setTokens(result.data.detailBeneficiary.beneficiaryTokens)
            console.log(beneficiaryDetail)
            alert(result.data.message)
            setLoder(false)
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
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {loder ? <h3 style={{ textAlign: "center", marginTop: "30px" }}>Loading ..</h3>

                    : <>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "#28a745",
                                borderBottom: "3px solid #28a745",
                                display: "inline-block",
                                mb: 3,
                            }}
                        >
                            Beneficiary Details
                        </Typography>


                        <Paper sx={{ p: 3, mb: 4 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography><strong>Name:</strong> {beneficiaryDetail.fullName}</Typography>
                                    <Typography><strong>Phone:</strong> {beneficiaryDetail.phoneNumber}</Typography>
                                    <Typography><strong>CNIC:</strong> {beneficiaryDetail.cnic}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>

                                    <Typography><strong>Total Visits:</strong> {tokens.length}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Divider sx={{ mb: 2 }} />

                        {/* Token List Table */}
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#28a745", mb: 2 }}>
                            All Tokens
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ bgcolor: "#e6f4ea" }}>
                                    <TableRow>
                                        <TableCell><strong>Token ID</strong></TableCell>

                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Remarks</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tokens.map((token, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{token.tokenId}</TableCell>

                                            <TableCell>{token.status}</TableCell>
                                            <TableCell>{token.remarks}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>}
            </Box>
        </AdminLayout>

    );
};

export default BeneficiaryDetail;
