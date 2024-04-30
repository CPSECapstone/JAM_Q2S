import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import {FlowchartContext} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import axios, {AxiosResponse} from "axios";
import {FlowchartResponse} from "../Interfaces/Interfaces";
import {SideBar} from "../Components/TSX/SideBar";
import {AuthContext} from "../Context/AuthContext";
import {useLocalStorage} from "../Hooks/useLocalStorage";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allFlowchartData, setAllFlowcharts] = useState<FlowchartResponse[]>([]);
    const {flowchart} = useContext(FlowchartContext);
    const {setUser} = useContext(AuthContext);
    const {getItem} = useLocalStorage();
    const [loading, setLoading] = useState<boolean>(true);

    let getFlowcharts = async () => {
        //let res: AxiosResponse<FlowchartResponse[]> = await axios.get("http://localhost:8080/api/FlowchartTemplates");
        //setAllFlowcharts(res.data)

    }

    let getUser = async () => {
        const storedUser = getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }

    useEffect(() => {
        getFlowcharts().catch(console.error);
        getUser().catch(console.error);
    }, []);

    return (
        <div className='Home'>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <div className="bottom-screen">
                <div className='sideBar'>
                    <SideBar allFlowcharts={allFlowchartData} setLoading={setLoading}
                             setAllFlowcharts={setAllFlowcharts}></SideBar>
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
        </div>
    )
}

export default Home;