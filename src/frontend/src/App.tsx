import React from 'react';
import './App.css';
import Grid from './Componenets/Grid';
import SideBar from './Componenets/SideBar';
import { exampleTermData } from './JSON/TermData';
import TopBar from "./Componenets/TopBar";


function App() {

  return (
    <div className='App'>
      <div className='sideBar'>
        <SideBar></SideBar>
      </div>
      <div className="rightPanel">
          <div className='topBar'>
              <TopBar></TopBar>
          </div>
          <div className='grid'>
              <Grid termData={exampleTermData}></Grid>
          </div>
      </div>
    </div>
  );
}

export default App;
