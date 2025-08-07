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
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../Utils";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie"


const saylaniTheme = createTheme({
  palette: {
    primary: {
      main: "#0D6EFD",
    },
    secondary: {
      main: "#28a745",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    fontWeightBold: 600,
  },
});

const Login = () => {

  const naviagte = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let [loder ,setLoder] = useState(false)

  const handelSubmit = async () => {
    try {
      if (!email || !password) {
        return alert("please enter all field")
      }
      setLoder(true)
      let response = await axios.post(`${BASE_URL}/auth/staffLogin`, {
        email,
        password
      })

      console.log(response.data)
      alert(response.data.message)
      const token = response.data.token
      
      cookie.set("token", token)
      if (response.data.type === "Admin") {
        naviagte("/admin-report")
      } else if (response.data.type === "Staff") {
        naviagte("/staff")
      } else if (response.data.type === "Receptionist") {
        naviagte("/receptionist/findUser")
      }

      setLoder(false)

      localStorage.setItem("currentType", response.data.type)
    } catch (error) {
      setLoder(false)
      console.log(error)
      alert(error.message)
    }
  }
  return (
    <ThemeProvider theme={saylaniTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f2f2f2",
        }}
      >
        <Container maxWidth="xs">
          
          <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{ color: "secondary.main", fontWeight: "bold" }}
            >
              Welcome to Saylani Staff Login
            </Typography>

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handelSubmit}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 1 }}
            >
              Login
            </Button>
            {loder && <h1>Loading..</h1>}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
