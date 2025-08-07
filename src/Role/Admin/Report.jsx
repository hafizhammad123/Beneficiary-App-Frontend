// pages/Reports.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import AdminLayout from "../../Components/AdminLayout";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import Cookies from "js-cookie";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const Reports = () => {

    let [data, setData] = useState([])
    let [complete, setComplete] = useState([])
    let [pending, setPending] = useState([])

    useEffect(() => {
        getTokens()
    }, [])

    const getTokens = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/genToken/getTokens`, {
                headers: {
                    "Authorization": `Bearer ${Cookies.get("token")}`
                }
            })

            console.log(result.data.result)
            alert(result.data.message)
            setData(result.data.result)



            const completedTokens = result.data.result.filter(token => token.status === "Completed");
            const pendingTokens = result.data.result.filter(token => token.status !== "Completed");

            setComplete(completedTokens);
            setPending(pendingTokens);



        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        }
    }

    
    const todayDate = new Date().toLocaleDateString();

    const totalUsers = localStorage.getItem('length');
    
    

    const tokenStatusData = {
        labels: ["In Progress", "Completed"],
        datasets: [
            {
                label: "Token Status",
                data: [pending.length, complete.length],
                backgroundColor: ["#ffc107", "#28a745"],
                borderRadius: 10,
            },
        ],
    };


    return (
        <AdminLayout>
            <Box sx={{ p: 3 }}>
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
                    Reports Summary
                </Typography>

                
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: "#e6f4ea", textAlign: "center" }}>
                            <Typography variant="h6" color="#28a745">Total Users</Typography>
                            <Typography variant="h4" fontWeight="bold">{totalUsers}</Typography>
                        </Paper>
                    </Grid>
                   
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: "#fff3cd", textAlign: "center" }}>
                            <Typography variant="h6" color="#ffc107">Pending Tokens</Typography>
                            <Typography variant="h4" fontWeight="bold">{pending.length}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2, bgcolor: "#e2f7e1", textAlign: "center" }}>
                            <Typography variant="h6" color="#28a745">Completed Tokens</Typography>
                            <Typography variant="h4" fontWeight="bold">{complete.length}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Charts */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" mb={2} color="#28a745">
                                Token Status Chart
                            </Typography>
                            <Doughnut data={tokenStatusData} />
                        </Paper>
                    </Grid>

                    
                </Grid>
            </Box>
        </AdminLayout>
    );
};

export default Reports;