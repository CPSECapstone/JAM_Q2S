import React from 'react';
import Grid from '../Components/Grid';
import SideBar from '../Components/SideBar';
import { exampleTermData } from '../JSON/TermData';

const Home = () => {
    return(
        <div className='App'>
          <div className='sideBar'>
            <SideBar></SideBar>
          </div>
          <div className='grid'>
            <Grid termData={exampleTermData}></Grid>
          </div>

        </div>
    )
}

export default Home;