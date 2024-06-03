import React, {useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {AccountInfo, PublicClientApplication} from "@azure/msal-browser";
import { UserAuthProvider } from "./Context/AuthContext";
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import NewUserForm from "./pages/NewUserForm";

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
    const [activeAccount, setActiveAccount] = useState<AccountInfo | null>(instance.getActiveAccount());
    const [loadingUser, setLoadingUser] = useState<Boolean>(false);

    console.log("MICROSOFT ACCOUNT: " + activeAccount);
    console.log("LOGGED IN: " + loadingUser);
    return (
        <div className="App">
            <UserAuthProvider>
                <Routes>
                    <Route path='/' element={<Login setLoadingUser={setLoadingUser} setActiveAccount={setActiveAccount} instance={instance}/>}/>
                    <Route path='/register' element={<Register setLoadingUser={setLoadingUser}/>}/>
                    <Route path='/newUserForm' element={<NewUserForm/>}/>
                    <Route path='/home' element={<Home loadingUser={loadingUser} setLoadingUser={setLoadingUser} activeAccount={instance.getActiveAccount()}/>}/>
                </Routes>
            </UserAuthProvider>
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
};

export default App;
