import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
} from '@mui/material';
import AdminLayout from '../../Components/AdminLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Utils';

const VerifyOtpPage = () => {

    let location = useLocation()
    let email = location.state.email
    let naviagte = useNavigate()

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleVerify = async () => {
        try {
            if (otp.length !== 6) {
                setError('OTP must be 6 digits');
                return;
            }

            let response = await axios.post(`${BASE_URL}/auth/verfiyOtp`, {
                otp,
                email
            })

            console.log(response.data)
            alert(response.data.message)
            if (response.data.success) {
                naviagte("/admin-report")
            }

            setError('');
        } catch (error) {
            console.log(error)

            if(error.response && error.response.data){
                alert(error.response.data.message)
            }else{
                alert(error.message)
            }
        }

    };

    return (
        <AdminLayout>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: '#f9f9f9' }}>
                    <Typography variant="h4" fontWeight="bold" color="#0A75AD" gutterBottom>
                        Saylani Welfare
                    </Typography>
                    <Typography variant="h6" mb={2} color="text.secondary">
                        Verify Staff OTP
                    </Typography>

                    <TextField
                        label="Enter OTP"
                        fullWidth
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        error={!!error}
                        helperText={error}
                        inputProps={{ maxLength: 6 }}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleVerify}
                        sx={{
                            bgcolor: '#3aca3eff',
                            '&:hover': { bgcolor: '#095b85' },
                            py: 1.2,
                            fontWeight: 'bold',
                        }}
                    >
                        Verify OTP
                    </Button>
                </Paper>
            </Container>
        </AdminLayout>

    );
};

export default VerifyOtpPage;
