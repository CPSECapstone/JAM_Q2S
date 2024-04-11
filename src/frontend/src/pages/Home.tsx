import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import {FlowchartContext} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import axios, {AxiosResponse} from "axios";
import {FlowchartResponse} from "../Interfaces/Interfaces";
import {SideBar} from "../Components/TSX/SideBar";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allFlowchartData, setAllFlowcharts] = useState<FlowchartResponse[]>([]);
    const {flowchart} = useContext(FlowchartContext);
    const [loading, setLoading] = useState<boolean>(true);

    let getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartResponse[]> = await axios.get("http://localhost:8080/api/FlowchartTemplates");
        setAllFlowcharts(res.data)

    }
    useEffect(() => {
        getFlowcharts().catch(console.error);
    }, []);
    return (
        <div className='Home'>
            <div className='sideBar'>
                <SideBar allFlowcharts={allFlowchartData} setLoading={setLoading}
                         setAllFlowcharts={setAllFlowcharts}></SideBar>
            </div>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <div className='grid'>
                {flowchart ? (
                    <><Grid setTotalUnits={setTotalUnits} loading={loading} setLoading={setLoading}/>
                        <div className="totalUnits">
                            Total Units: {totalUnits}
                        </div>
                    </>
                ) : (
                    <div className='noFlowchartMessage'>
                        <h3>No flowchart selected</h3>
                        <p>Please select or create a flowchart</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;