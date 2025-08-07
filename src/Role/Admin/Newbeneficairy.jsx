// pages/ViewAllBeneficiaries.jsx
import React from "react";
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

const dummyData = [
    { id: 1, name: "Ali Raza", cnic: "42101-1234567-1", visits: 2 },
    { id: 2, name: "Ayesha Khan", cnic: "42201-7654321-9", visits: 3 },
    { id: 3, name: "Usman Ghani", cnic: "42104-4567890-0", visits: 1 },
];

const NewBeneficiaries = () => {
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
                    Today Beneficiaries
                </Typography>

                <TableContainer component={Paper}>
                    <Table aria-label="beneficiaries table">
                        <TableHead sx={{ bgcolor: "#e6f4ea" }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>CNIC</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Visits</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.cnic}</TableCell>
                                    <TableCell>{row.visits} {row.visits > 1 ? "times" : "time"}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            startIcon={<VisibilityIcon />}
                                            sx={{ borderColor: "#28a745", color: "#28a745" }}
                                            onClick={() => alert(`View details for ${row.name}`)}
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

export default NewBeneficiaries;
