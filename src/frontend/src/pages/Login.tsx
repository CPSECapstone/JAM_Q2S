import {
    Grid,
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {Link, Link as RouterLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {loginRequest} from "../authConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import '../Components/CSS/Login.css';
import {AuthContext} from "../Context/AuthContext";
import { useMsal } from '@azure/msal-react';
import {AccountInfo, IPublicClientApplication} from "@azure/msal-browser";

interface loginProps {
    setLoadingUser: React.Dispatch<React.SetStateAction<Boolean>>;
    setActiveAccount: React.Dispatch<React.SetStateAction<AccountInfo | null>>;
    instance: IPublicClientApplication;
}
const Login = ({setLoadingUser, setActiveAccount, instance}: loginProps) => {
    const currentYear = new Date().getFullYear();

    const handleLoginRedirect = async () => {
        instance
            .loginRedirect({
                ...loginRequest,
                prompt: 'create',
            })
            .catch((error) => console.log(error));
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/login', {
                email: email,
                password: password,
            });
            if (response.status === 200) {
                setLoadingUser(true);
                setUser(response.data);
                navigate("/home");
            } else {
                // Handle unsuccessful login [ TO DO ]
            }
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
            </form>
            <hr className="divider"/> {/* Divider with custom class */}
            <button onClick={handleLoginRedirect}> {/* Adjust variant as needed */}
                <FontAwesomeIcon icon={faMicrosoft}/>
                <span className="microsoft-sign-in">Sign in with Microsoft</span>
            </button>
            <Grid container>
                <Grid item>
                    <Link to="/register">Don't have an account? Register</Link>
                </Grid>
            </Grid>
            {/*<footer style={{position: 'fixed', bottom: 9, color: 'grey', fontSize: '3', padding: "1%"}}>*/}
            {/*    <text>&copy; 2023-{currentYear} PolyPlannerPro | All rights reserved.</text>*/}
            {/*</footer>*/}
        </div>
    );
};


export default Login;