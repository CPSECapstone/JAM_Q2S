import {
    Container,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import React, { useState } from "react";
import {Link, Link as RouterLink} from "react-router-dom";
import axios from "axios";
import './Login.css';
import { useAuth } from '../Hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/login', {
                email: email,
                password: password,
            });
            // login({
            //
            // })
            console.log(response);
            window.location.href = '/home';

        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    return (
        <div className='Login'>
            <h2>Welcome Back!</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'>Email:</label><br/>
                <input type='email' id='email' name='email' value={email}
                       onChange={(event) => setEmail(event.target.value)} required/><br/>

                <label htmlFor='password'>Password:</label><br/>
                <input type='password' id='password' name='password' value={password}
                       onChange={(event) => setPassword(event.target.value)} required/><br/>

                <button type='submit'>Login</button>

                <Grid container>
                    <Grid item>
                        <Link to="/register">Don't have an account? Register</Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Login;