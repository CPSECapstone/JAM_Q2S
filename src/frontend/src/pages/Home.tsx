import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import {FlowchartContext} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import {ClassDisplayInformation, FlowchartMetaData, QuarterClassData} from '../Interfaces/Interfaces'; // Removed unused imports
import {SideBar} from '../Components/TSX/SideBar';
import {Loader} from '../Components/TSX/Loader';
import {FlowchartResponse} from "../Interfaces/Interfaces";
import {SideBar} from "../Components/TSX/SideBar";
import {AuthContext} from "../Context/AuthContext";
import {useLocalStorage} from "../Hooks/useLocalStorage";
import axios from 'axios';
import {StyledSideBar} from '../Components/StyledComponents/SideBarStyle';
import {AccountInfo} from "@azure/msal-common";
import {useIsAuthenticated} from "@azure/msal-react";
import {useNavigate} from "react-router-dom";

interface homeProps {
    loadingUser: Boolean;
    activeAccount: AccountInfo | null;
    setLoadingUser: React.Dispatch<React.SetStateAction<Boolean>>;
}

const Home = ({loadingUser, activeAccount, setLoadingUser}: homeProps) => {
    const [totalUnits, setTotalUnits] = useState<number>(0);
    const [allFlowchartData, setAllFlowcharts] = useState<FlowchartResponse[]>([]);
    const {flowchart} = useContext(FlowchartContext);
    const {setUser} = useContext(AuthContext);
    const {getItem} = useLocalStorage();
    const [loading, setLoading] = useState<boolean>(true);
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [selectedUserFlowchart, setSelectedUserFlowchart] = useState<FlowchartMetaData | null>(null); // Removed explicit type as it's inferred
    const [quarterClassCache, setQuarterClassCache] = useState<{ [classId: string]: QuarterClassData }>({});
    const [flowchartClassCache, setFlowchartClassCache] = useState<{
        [classUUID: string]: ClassDisplayInformation
    }>({})
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

    console.log("ACTIVE ACCOUNT IN HOME: " + activeAccount);
    if (isAuthenticated && !activeAccount) {
        window.location.reload();
    }

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

    /*
    const authenticateUser = async () => {
        if (activeAccount) {
            const email = activeAccount.username;
            const name = activeAccount.name || '';

            const response = await axios.post('/api/user/loginMicrosoftUser', {
                user_name: email.substring(0, email.indexOf('@')),
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[2],
                email: email,
                password: "microsoft-user"
            });

            console.log("RESPONSE DATA: " + response.data);
            if (response.status === 200 && response.data.statusCode === 'OK') {
                setLoadingUser(true);
                if (!response.data.major) { // checking if first time registering
                    navigate('/newUserForm', {state: {userId: response.data.id}});
                }
            }
        }
    }*/

    useEffect(() => {
        /*
        if (!loadingUser) {
            authenticateUser().catch(console.error);
        }*/
        getFlowcharts().catch(console.error);
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

    console.log("ACTIVE ACCOUNT IN HOME3: " + activeAccount);

    if (!loadingUser) {
        return(<div></div>) // [TO DO] add a message here that the account is not active and you have to login
    } else {
        console.log("LOADING USER: " + loadingUser);

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
                    {selectedUserFlowchart ? (
                        <div className="totalUnits">
                            Total Units: {totalUnits}
                        </div>
                    ) : null}
                </div>
            )
        )
    }
}

export default Home;
