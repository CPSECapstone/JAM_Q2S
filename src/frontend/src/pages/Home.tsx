import React, {useEffect, useState} from 'react'; // Removed unused imports
import Grid from '../Components/TSX/Grid';
import '../Components/CSS/Home.css';
import TopBar from '../Components/TSX/TopBar';
import axios from 'axios'; // Removed AxiosResponse import as it's not needed
import {ClassDisplayInformation, FlowchartMetaData, QuarterClassData} from '../Interfaces/Interfaces'; // Removed unused imports
import {SideBar} from '../Components/TSX/SideBar';
import {Loader} from '../Components/TSX/Loader'; // Assuming you have a Loader component
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

        loadClassCache();
    }, []);

    const toggleSideBar = () => {
        setSidebarVisible(!sidebarVisible);
    }

    // const validateRequirements = async () => {
    //     if (!selectedUserFlowchart) {
    //         alert('No flowchart selected');
    //         return;
    //     }
    //
    //     const courses = selectedUserFlowchart.courses.map(course => course.id); // Assuming 'courses' is an array of course objects with 'id'
    //     try {
    //         const response = await axios.get('http://localhost:8080/checkRequirement', {
    //             params: {
    //                 courses: courses
    //             }
    //         });
    //         console.log('Validation response:', response.data);
    //     } catch (error) {
    //         console.error('Error validating requirements:', error);
    //     }
    // };

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
                                <button className='validateButton'>Validate</button>
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
