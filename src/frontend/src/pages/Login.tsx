import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import { useState } from "react";
import {Link, Link as RouterLink} from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {    };

    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">Welcome Back!</Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2}} //add bgcolor: '' here to change button color
                            onClick={handleLogin}
                            component={RouterLink}
                            to='/'
                        >
                            Login
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link to="/register">Don't have an account? Register</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Login;