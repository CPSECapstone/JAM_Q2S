import React from 'react';
import Grid from '../Components/Grid';
import SideBar from '../Components/SideBar';
import { exampleTermData } from '../JSON/TermData';
import { FlowchartProvider } from '../Context/FlowchartProvider';

const Home = () => {
    return(
        <div className='App'>
          <div className='sideBar'>
            <SideBar></SideBar>
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