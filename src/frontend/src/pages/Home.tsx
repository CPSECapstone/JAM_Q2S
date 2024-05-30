import React, {useContext, useEffect, useState} from 'react';
import Grid from '../Components/TSX/Grid';
import {FlowchartContext} from '../Context/FlowchartProvider';
import '../Components/CSS/Home.css'
import TopBar from '../Components/TSX/TopBar';
import {FlowchartResponse} from "../Interfaces/Interfaces";
import {SideBar} from "../Components/TSX/SideBar";
import {AuthContext} from "../Context/AuthContext";
import {useLocalStorage} from "../Hooks/useLocalStorage";
import {AccountInfo} from "@azure/msal-common";
import {useIsAuthenticated} from "@azure/msal-react";
import axios from "axios";
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
    }, []);

    console.log("ACTIVE ACCOUNT IN HOME3: " + activeAccount);

    if (!loadingUser) { 
        return(<div></div>) // [TO DO] add a message here that the account is not active and you have to login
    } else {
        console.log("LOADING USER: " + loadingUser);
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
}

export default Home;