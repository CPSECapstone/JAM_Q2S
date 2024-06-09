import React, {useContext, useState} from 'react';
import '../Components/CSS/Register.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AccountInfo, IPublicClientApplication} from "@azure/msal-browser";
import {AuthContext} from "../Context/AuthContext";

interface registerProps {
    setLoadingUser: React.Dispatch<React.SetStateAction<Boolean>>;
}
const Register = ({setLoadingUser}: registerProps) => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);
    const currentYear = new Date().getFullYear();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/user/register', {
                user_name: username,
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password,
            });
            if (response.status === 200) {
                setLoadingUser(true);
                setUser(response.data);
                navigate(`/newUserForm?userId=${response.data.userId}`);
            } else {
                // Handle unsuccessful register [ TO DO ]
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className='Register'>
            <h2>Welcome!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>User Name:</label><br/>
                <input type='username' id='username' name='username' value={username}
                       onChange={(event) => setUsername(event.target.value)} required/><br/>

                <label htmlFor='firstname'>First Name:</label><br/>
                <input type='firstname' id='firstname' name='firstname' value={firstname}
                       onChange={(event) => setFirstname(event.target.value)} required/><br/>

                <label htmlFor='lastname'>Last Name:</label><br/>
                <input type='lastname' id='lastname' name='lastname' value={lastname}
                       onChange={(event) => setLastname(event.target.value)} required/><br/>

                <label htmlFor='email'>Email:</label><br/>
                <input type='email' id='email' name='email' value={email}
                       onChange={(event) => setEmail(event.target.value)} required/><br/>

                <label htmlFor='password'>Password:</label><br/>
                <input type='password' id='password' name='password' value={password}
                       onChange={(event) => setPassword(event.target.value)} required/><br/>

                <button type='submit'>Register</button>
            </form>
            <footer style={{position: "fixed", bottom: '0', color: 'grey', fontSize: '3', padding: "1%"}}>
                <text>&copy; 2023-{currentYear} PolyPlannerPro | All rights reserved.</text>
            </footer>
        </div>
    );
}

export default Register;
