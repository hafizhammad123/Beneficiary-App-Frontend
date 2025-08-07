// pages/ViewAllTokens.jsx
import React from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminLayout from "../../Components/AdminLayout";

const dummyTokens = [
    {
        id: "TKN001",
        cnic: "42101-1234567-1",
        name: "Ali Raza",
        date: "2025-08-01",
        status: "Completed",
        remarks: "Medical aid given",
    },
    {
        id: "TKN002",
        cnic: "42101-4567890-1",
        name: "Ahmed Khan",
        date: "2025-08-03",
        status: "Pending",
        remarks: "Waiting for approval",
    },
    {
        id: "TKN003",
        cnic: "42101-1111111-1",
        name: "Sana Fatima",
        date: "2025-08-04",
        status: "In Progress",
        remarks: "Token being processed",
    },
];

const AllTokens = () => {
    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
                {/* Page Title */}
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
                    All Tokens
                </Typography>

                {/* Token Table */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#e6f4ea" }}>
                            <TableRow>
                                <TableCell><strong>Token ID</strong></TableCell>
                                <TableCell><strong>CNIC</strong></TableCell>
                                <TableCell><strong>Name</strong></TableCell>
                                <TableCell><strong>Date</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell><strong>Remarks</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dummyTokens.map((token, index) => (
                                <TableRow key={index}>
                                    <TableCell>{token.id}</TableCell>
                                    <TableCell>{token.cnic}</TableCell>
                                    <TableCell>{token.name}</TableCell>
                                    <TableCell>{token.date}</TableCell>
                                    <TableCell>{token.status}</TableCell>
                                    <TableCell>{token.remarks}</TableCell>
                                    <TableCell>

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

export default AllTokens;
