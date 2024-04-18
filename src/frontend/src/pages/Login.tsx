import {
    Grid,
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {Link, Link as RouterLink} from "react-router-dom";
import axios from "axios";
import '../Components/CSS/Login.css';
import {AuthContext} from "../Context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(AuthContext);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/login', {
                email: email,
                password: password,
            });
            setUser({
                user_name: "test.user",
                id: "1",
                first_name: "Test",
                last_name: "Tester",
                email: "test@example.com",
                term_admitted: "Fall 2022",
                admit_type: "Freshman",
                catalog_year: "2022-2026",
                major: "SE",
                concentration: "",
                minor: ""
            });
            console.log(response);
            window.location.href = '/home';
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

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