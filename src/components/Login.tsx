import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Paper, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Whenever user comes to /login, log them out
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (username === "" || password === "") {
            setError("Username and password are required.");
            return;
        }
        try {
            const response = await axios.post(
                "http://52.172.171.41/ccu/companies/login",
                { userId: username, password }, 
                {
                    withCredentials: false,
                    headers: {
                        'Content-Type': 'application/json',
                        'client-type': '2',
                        'signature': 'null'
                    }
                }
            );
            // If login is successful, save token and username
            if (
                response.status === 200 &&
                response.headers &&
                response.headers['signature']
            ) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", response.headers['signature']);
                localStorage.setItem("username", username);
                // Save user details
                if (response.data && response.data.userDetails) {
                    localStorage.setItem("userDetails", JSON.stringify(response.data.userDetails));
                }
                navigate("/");
            } else {
                setError(response.data?.message || "Invalid username or password.");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f2f5" }}>
            <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                    <img
                        src="/ondc-dashboard/logo.png"
                        alt="Logo"
                        style={{ width: 120, height: 60, marginBottom: 8 }}
                    />
                </Box>
                <Typography variant="h5" mb={2} align="center">Login</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error">{error}</Typography>}
                        <Button type="submit" variant="contained" fullWidth sx={{ background: '#1576BD' }}>
                            Login
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;