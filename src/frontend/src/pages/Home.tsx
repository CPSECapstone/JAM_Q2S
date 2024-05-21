import React, {useContext, useEffect, useState} from 'react'; // Removed unused imports
import Grid from '../Components/TSX/Grid';
import '../Components/CSS/Home.css';
import TopBar from '../Components/TSX/TopBar';
import {ClassDisplayInformation, FlowchartMetaData, QuarterClassData} from '../Interfaces/Interfaces'; // Removed unused imports
import {SideBar} from '../Components/TSX/SideBar';
import {Loader} from '../Components/TSX/Loader';
import {AuthContext} from "../Context/AuthContext";
import {useLocalStorage} from "../Hooks/useLocalStorage";
import axios from 'axios';
import {StyledSideBar} from '../Components/StyledComponents/SideBarStyle';

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [selectedUserFlowchart, setSelectedUserFlowchart] = useState<FlowchartMetaData | null>(null); // Removed explicit type as it's inferred
    const [loading, setLoading] = useState<boolean>(true);
    const [quarterClassCache, setQuarterClassCache] = useState<{ [classId: string]: QuarterClassData }>({});
    const [flowchartClassCache, setFlowchartClassCache] = useState<{
        [classUUID: string]: ClassDisplayInformation
    }>({})
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);


    let getUser = async () => {
        const storedUser = getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }

    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    useEffect(() => {
        getUser().catch(console.error);
        const loadClassCache = async () => {
            try {
                const quarterClassesResponse = await axios.get("http://localhost:8080/getAllQuarterClasses");
                const tempCache: { [classId: string]: QuarterClassData } = {};
                quarterClassesResponse.data.forEach((quarterClass: QuarterClassData) => {
                    tempCache[quarterClass.id] = quarterClass;
                });
                setQuarterClassCache(tempCache);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        loadClassCache();
    }, []);

    const toggleSideBar = () => {
        setSidebarVisible(!sidebarVisible);
    }

    return (
        loading ? <Loader/> : (
            <div className='Home'>
                <div className='sideBar'>
                    <SideBar
                        quarterClassCache={quarterClassCache}
                        selectedUserFlowchart={selectedUserFlowchart}
                        setSelectedUserFlowchart={setSelectedUserFlowchart}
                        setFlowchartClassCache={setFlowchartClassCache}/>
                </div>
                <div className='topBar'>
                    <TopBar/>
                </div>
                <div className='grid'>
                    {selectedUserFlowchart ? (
                        <>
                            <Grid setTotalUnits={setTotalUnits}
                                  selectedUserFlowchart={selectedUserFlowchart}
                                  setSelectedUserFlowchart={setSelectedUserFlowchart}
                                  flowchartClassCache={flowchartClassCache}/>
                        </>
                    ) : (
                        <div className='noFlowchartMessage'>
                            <p>No flowchart selected, please select or create a flowchart</p>
                        </div>
                    )}
                <div className='topBar'>
                    <TopBar toggleSideBar={toggleSideBar}/>
                </div>
                <div className="bottom-screen">

                    <StyledSideBar $open={sidebarVisible}>
                        <SideBar
                            quarterClassCache={quarterClassCache}
                            selectedUserFlowchart={selectedUserFlowchart}
                            setSelectedUserFlowchart={setSelectedUserFlowchart}
                            setFlowchartClassCache={setFlowchartClassCache}/>
                    </StyledSideBar>

                    <div className='grid'>
                        {selectedUserFlowchart ? (
                            <>
                                <Grid setTotalUnits={setTotalUnits}
                                      selectedUserFlowchart={selectedUserFlowchart}
                                      setSelectedUserFlowchart={setSelectedUserFlowchart}
                                      flowchartClassCache={flowchartClassCache}/>
                            </>
                        ) : (
                            <div className='noFlowchartMessage'>
                                <h3>No flowchart selected</h3>
                                <p>Please select or create a flowchart</p>
                            </div>
                        )}
                    </div>
                </div>
                {selectedUserFlowchart ? (
                    <div className="totalUnits">
                        Total Units: {totalUnits}
                    </div>
                ) : null}
            </div>
        )
    );
};

export default Home;
