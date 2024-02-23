import React from 'react';
import './App.css';
import Grid from './Componenets/Grid';
import SideBar from './Componenets/SideBar';
import TopBar from './Componenets/TopBar';
import { FlowchartProvider } from './Context/FlowchartProvider';

function App() {
  return (
    <div className='App'>
        <div className='sideBar'>
          <SideBar></SideBar>
        </div>
        <div className='topBar'>
          <TopBar></TopBar>
        </div>
      <FlowchartProvider>
        <div className='grid'>
          <Grid></Grid>
        </div>
      </FlowchartProvider>
    </div>
  );
}

export default App;
