import React from 'react';
import Grid from '../Components/TSX/Grid';
import SideBar from '../Components/TSX/SideBar';
import { FlowchartProvider } from '../Context/FlowchartProvider';
import './Home.css'
import TopBar from '../Components/TSX/TopBar';

const Home = () => {
    return(
        <div className='Home'>
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