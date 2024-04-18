import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserAuthProvider } from "./Context/AuthContext";


function App() {
    return (
        <UserAuthProvider>
            <div className='App'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </div>
        </UserAuthProvider>
    );
}

export default App;
