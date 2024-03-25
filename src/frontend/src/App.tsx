import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {FlowchartProvider} from './Context/FlowchartProvider';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<FlowchartProvider><Home/></FlowchartProvider>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
