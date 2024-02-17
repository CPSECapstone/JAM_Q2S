import React from 'react';
import './App.css';
import Grid from './Componenets/Grid';
import SideBar from './Componenets/SideBar';
import Login from './Login'
import { exampleTermData } from './JSON/TermData';


function App() {

  return (
      <div className = 'Login'>
          <Login></Login>
      </div>
      // <div className='App'>
      //   <div className='sideBar'>
      //     <SideBar></SideBar>
      //   </div>
      //   <div className='grid'>
      //     <Grid termData={exampleTermData}></Grid>
      //   </div>
      //
      // </div>
  );
}

export default App;
