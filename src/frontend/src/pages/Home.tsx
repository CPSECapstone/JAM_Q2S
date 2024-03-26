import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import SideBar from '../Components/TSX/SideBar';
import {FlowchartContext, FlowchartProvider} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import axios, {AxiosResponse} from "axios";
import {FlowchartData, FlowchartResponse} from "../Interfaces/Interfaces";
import {TestSideBar} from "../Components/TSX/TestSideBar";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allFlowchartData, setAllFlowcharts] = useState<FlowchartResponse[]>([]);
    const {flowchart, setFlowchart} = useContext(FlowchartContext);
    const [loading, setLoading] = useState<boolean>(true);

    let getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartResponse[]> = await axios.get("http://localhost:8080/api/FlowchartTemplates");
        setAllFlowcharts(res.data)

    }
    useEffect(() => {
        getFlowcharts();
    }, []);
    return (
        <div className='Home'>
            <div className='sideBar'>
                {/*<SideBar></SideBar>*/}
                <TestSideBar allFlowcharts={allFlowchartData} setLoading={setLoading}
                             setAllFlowcharts={setAllFlowcharts}></TestSideBar>
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