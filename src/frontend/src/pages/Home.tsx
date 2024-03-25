import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import SideBar from '../Components/TSX/SideBar';
import {FlowchartContext, FlowchartProvider} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import {exampleTermData} from "../JSON/TermData";
import axios, {AxiosResponse} from "axios";
import {FlowchartData, FlowchartResponse, TermData} from "../Interfaces/Interfaces";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const {flowchart, setFlowchart} = useContext(FlowchartContext);

    let getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartResponse> = await axios.get("http://localhost:8080/api/FlowchartTemplates/352");
        let temp: FlowchartData = JSON.parse(res.data.flowchart)
        let termData: TermData[] = temp.termData.slice(1);
        setFlowchart(termData);
    }
    useEffect(() => {
        getFlowcharts();
    }, []);
    return (
        <div className='Home'>
            <div className='sideBar'>
                <SideBar></SideBar>
            </div>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <div className='grid'>
                <Grid setTotalUnits={setTotalUnits}></Grid>
            </div>
            <div className="totalUnits">
                Total Units: {totalUnits}
            </div>
        </div>
    )
}

export default Home;