import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import Cookies from "js-cookie";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StaffPage = () => {
  let navigate = useNavigate()

  const [tokenId, setTokenId] = useState("");
  const [tokenData, setTokenData] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");


  const handleSave = async () => {
    try {
      const result = await axios.post(`${BASE_URL}/genToken/tokenDetail`, { tokenId }, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })

      console.log(result.data)
      alert(result.data.message)

      setTokenData(result.data.tokeAllDetail)
      setStatus(result.data.tokeAllDetail.findTOken.status)
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert(error.message)
      }
    }
  };

  const UpdateStatus = async () => {
    try {

      let tokenUpdateObj = {
        tokenId: tokenData.findTOken.tokenId,
        remarks: remarks,
        status: status
      }



      let result = await axios.post(`${BASE_URL}/genToken/tokenUpdate`, tokenUpdateObj, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`
        }
      })

      console.log(result.data)
      alert(result.data.message)

      setTokenData(null)
      setTokenId("")


    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        alert(error.response.data.message)
      } else {
        alert(error.message)
      }
    }
  }

  let  logout = () => {
    localStorage.removeItem("currentType")
    navigate("/")
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ width: { xs: "100%", sm: "150px", }, mt:"20px", ml:"20px"}}
        onClick={logout}
        
      >
        LogOut
      </Button>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          p: 2,
        }}
      >

        <Box sx={{ width: "100%", maxWidth: 700 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 4,
              color: "#28a745",
              textShadow: "1px 1px 1px #ccc",
            }}
          >
            Staff Token Panel
          </Typography>

          {/* Search Area */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4}>
            <TextField
              label="Enter Token ID"
              variant="outlined"
              fullWidth
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ width: { xs: "100%", sm: "150px" } }}
              onClick={handleSave}
            >
              Search
            </Button>
          </Stack>

          {/* Token Data Section */}
          {tokenData && (
            <Paper elevation={3} sx={{ p: 3, bgcolor: "white" }}>
              <Typography variant="h6" mb={2} sx={{ color: "#333" }}>
                Token Details
              </Typography>

              <Typography><strong>Name:</strong> {tokenData.findBeneficiary.fullName}</Typography>
              <Typography><strong>Token ID:</strong> {tokenData.findTOken.tokenId}</Typography>
              <Typography><strong>Beneficiary CNIC:</strong> {tokenData.findBeneficiary.cnic}</Typography>
              <Typography><strong>Current Token Status:</strong> {tokenData.findTOken.status}</Typography>
              <Typography><strong>Remarks :</strong> {tokenData.findTOken?.remarks || ""}</Typography>

              <Box mt={3}>
                <TextField
                  select
                  fullWidth
                  label={"Update Status"}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>

                <TextField
                  label="Add Remarks"
                  multiline
                  rows={3}
                  fullWidth
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={UpdateStatus}
                >
                  Save Status & Remarks
                </Button>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </>
  );
};

export default StaffPage;
