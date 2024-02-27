import React from 'react';
import Grid from '../Components/Grid';
import SideBar from '../Components/SideBar';
import { FlowchartProvider } from '../Context/FlowchartProvider';
import './Home.css'
import TopBar from '../Components/TopBar';

const Home = () => {
    return(
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
    )
}

export default Home;