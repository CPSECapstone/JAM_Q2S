import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from "./Context/AuthContext";
import { useAuth } from "./Hooks/useAuth";

function App() {
    const { user, login, logout, setUser } = useAuth();

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
