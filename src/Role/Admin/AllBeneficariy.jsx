// pages/ViewAllBeneficiaries.jsx
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminLayout from "../../Components/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";



const AllBeneficiaries = () => {

    let navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/reception/beneficiary`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(result.data)
            alert(result.data.message)
            setData(result.data.result)
            
           
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }

     localStorage.setItem("length",data.length)

    return (
        <AdminLayout>
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3,
                        fontWeight: "bold",
                        color: "#28a745",
                        borderBottom: "3px solid #28a745",
                        display: "inline-block",
                        pb: 0.5,
                    }}
                >
                    All Beneficiaries
                </Typography>

                <TableContainer component={Paper}>
                    <Table aria-label="beneficiaries table">
                        <TableHead sx={{ bgcolor: "#e6f4ea" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>CNIC</TableCell>
                            
                                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.fullName}</TableCell>
                                    <TableCell>{row.cnic}</TableCell>
                                   
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            startIcon={<VisibilityIcon />}
                                            sx={{ borderColor: "#28a745", color: "#28a745" }}
                                            onClick={() => navigate(`/admin-allBeneficarit/${row.cnic}`)}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </AdminLayout>

    );
};

export default AllBeneficiaries;
