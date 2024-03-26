import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import SideBar from '../Components/TSX/SideBar';
import {FlowchartContext, FlowchartProvider} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import axios, {AxiosResponse} from "axios";
import {FlowchartData, FlowchartResponse } from "../Interfaces/Interfaces";
import {TestSideBar} from "../Components/TSX/TestSideBar";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allFlowchartData, setAllFlowcharts] = useState<FlowchartData[]>([]);
    const {flowchart, setFlowchart} = useContext(FlowchartContext);
    const [loading, setLoading] = useState<boolean>(true);

    let getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartResponse[]> = await axios.get("http://localhost:8080/api/FlowchartTemplates");
        let allFlowcharts: FlowchartData[] = res.data.map((response : FlowchartResponse) => JSON.parse(response.flowchart))
       setAllFlowcharts(allFlowcharts)
        //setFlowchart(termData);
    }
    useEffect(() => {
        getFlowcharts();
    }, []);
    return (
        <div className='Home'>
            <div className='sideBar'>
                {/*<SideBar></SideBar>*/}
                <TestSideBar AllFlowcharts={allFlowchartData} setLoading={setLoading}></TestSideBar>
            </div>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <div className='grid'>
                {flowchart ? (
                    <Grid setTotalUnits={setTotalUnits} loading={loading} setLoading={setLoading}/>
                ) : (
                    <div className='noFlowchartMessage'>
                        No flowchart selected
                    </div>
                )}
            </div>
            <div className="totalUnits">
                Total Units: {totalUnits}
            </div>
        </div>
    )
}

export default Home;