import React, {useState} from 'react';
import Grid from '../Components/TSX/Grid';
import SideBar from '../Components/TSX/SideBar';
import {FlowchartProvider} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);

    return (
        <div className='Home'>
            <div className='sideBar'>
                <SideBar></SideBar>
            </div>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <FlowchartProvider>
                <div className='grid'>
                    <Grid setTotalUnits={setTotalUnits}></Grid>
                </div>
            </FlowchartProvider>
            <div className="totalUnits">
                Total Units: {totalUnits}
            </div>
        </div>
    )
}

export default Home;