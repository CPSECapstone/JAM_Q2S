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


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [major, setMajor] = useState("");
    const [termStarted, setTermStarted] = useState("");

    const handleRegister = () => {    };

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
                    <Typography variant="h5">Sign Up</Typography>
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

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="major"
                            name="major"
                            label="Major"
                            type="major"
                            value={major}
                            onChange={(e) => {
                                setMajor(e.target.value);
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="termStarted"
                            name="termStarted"
                            label="Term Started"
                            type="termStarted"
                            value={termStarted}
                            onChange={(e) => {
                                setTermStarted(e.target.value);
                            }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2}} //add bgcolor: '' here to change button color
                            onClick={handleRegister}
                            component={RouterLink}
                            to='/'
                        >
                            Register
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link to="/login">Already have an account? Login</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;