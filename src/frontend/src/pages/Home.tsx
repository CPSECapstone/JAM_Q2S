import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import {FlowchartContext} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import axios, {AxiosResponse} from "axios";
import {FlowchartMetaData, QuarterClassData} from "../Interfaces/Interfaces";
import {SideBar} from "../Components/TSX/SideBar";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allUserFlowcharts, setAllUserFlowcharts] = useState<FlowchartMetaData[]>([]);
    const [selectedUserFlowchart, setSelectedUserFlowchart] = useState<FlowchartMetaData | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [quarterClassCache, setQuarterClassCache] = useState<{ [classId: string]: QuarterClassData }>({})
    let getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartMetaData[]> = await axios.get("http://localhost:8080/api/UserFlowcharts");
        console.log(res.data)
        setAllUserFlowcharts(res.data);
    }

    let loadClassCache = async () => {
        let tempCache = {}
        let quarterClassesResponse: AxiosResponse<QuarterClassData[]> = await axios.get("http://localhost:8080/getAllQuarterClasses");
        quarterClassesResponse.data.forEach((quarterClass: QuarterClassData) => {
            quarterClassCache[quarterClass.id] = quarterClass
        })
        setQuarterClassCache(tempCache);
    }
    useEffect(() => {
        getFlowcharts().catch(console.error);
        loadClassCache().catch(console.error);
    }, []);
    return (
        <div className='Home'>
            <div className='sideBar'>
                <SideBar allFlowcharts={allUserFlowcharts} setLoading={setLoading}
                         selectedUserFlowchart={selectedUserFlowchart}
                         setSelectedUserFlowchart={setSelectedUserFlowchart}/>
            </div>
            <div className='topBar'>
                <TopBar></TopBar>
            </div>
            <div className='grid'>
                {selectedUserFlowchart ? (
                    <p>something selected</p>
                    // <Grid setTotalUnits={setTotalUnits} loading={loading} setLoading={setLoading}
                    //       selectedTermData={JSON.parse(selectedUserFlowchart.termData)}
                    //       quarterClassCache={quarterClassCache}/>
                ) : (
                    <div className='noFlowchartMessage'>
                        <p>No flowchart selected, please select or create a flowchart</p>
                    </div>
                )}
            </div>
            {/*<div className="totalUnits">*/}
            {/*    Total Units: {totalUnits}*/}
            {/*</div>*/}
        </div>
    )
}

export default Home;