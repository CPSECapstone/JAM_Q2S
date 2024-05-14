import React, {useContext, useEffect, useState} from 'react'; // Removed unused imports
import Grid from '../Components/TSX/Grid';
import '../Components/CSS/Home.css';
import TopBar from '../Components/TSX/TopBar';
import axios from 'axios'; // Removed AxiosResponse import as it's not needed
import {ClassDisplayInformation, FlowchartMetaData, QuarterClassData} from '../Interfaces/Interfaces'; // Removed unused imports
import {SideBar} from '../Components/TSX/SideBar';
import {Loader} from '../Components/TSX/Loader'; // Assuming you have a Loader component
import {StyledSideBar} from '../Components/StyledComponents/SideBarStyle';
import {AuthContext} from "../Context/AuthContext";

const Home = () => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [selectedUserFlowchart, setSelectedUserFlowchart] = useState<FlowchartMetaData | null>(null); // Removed explicit type as it's inferred
    const [loading, setLoading] = useState<boolean>(true);
    const [quarterClassCache, setQuarterClassCache] = useState<{ [classId: string]: QuarterClassData }>({});
    const [flowchartClassCache, setFlowchartClassCache] = useState<{
        [classUUID: string]: ClassDisplayInformation
    }>({})
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
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

        setUser({
            admit_type: 'Freshman',
            catalog_year: '2022-26',
            concentration: 'None',
            email: 'mdpar',
            first_name: 'Mitashi',
            last_name: 'Parikh',
            major: 'Software Engineering',
            minor: 'None',
            password: 'gfds',
            term_admitted: '2022',
            userId: 2002,
            user_name: 'mdparikh',
            id: 'wert'
        })

        console.log(user);
        loadClassCache();
    }, []);

    const toggleSideBar = () => {
        setSidebarVisible(!sidebarVisible);
    }
    return (
        loading ? <Loader/> : (
            <div className='Home'>
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
            </div>
        )
    );
};

export default Home;
