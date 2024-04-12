import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {PublicClientApplication} from "@azure/msal-browser";
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import {loginRequest} from "./authConfig";
import { Container, Button } from 'react-bootstrap';
import {IdTokenData} from "./Components/JSX/DataDisplay";

interface AppProps {
    instance: PublicClientApplication;
}

const MainContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance,
     * that tells you what msal is currently doing. For more, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    return (
        <div className="App">
            <AuthenticatedTemplate>
                {activeAccount ? (
                    <Route path='/home' element={<Home/>}/>
                ) : null}
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </UnauthenticatedTemplate>
        </div>
    );
};

const App: React.FC<AppProps> = ({ instance }) => {
    return (
        <MsalProvider instance={instance}>
            <div className='App'>
                    <MainContent />
            </div>
        </MsalProvider>
    );
}

export default App;
