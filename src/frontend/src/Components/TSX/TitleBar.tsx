import React, {useContext} from 'react';
import '../CSS/TitleBar.css';
import {Typography} from "@mui/material";
import {AuthContext} from "../../Context/AuthContext";
import {FlowchartMetaData} from "../../Interfaces/Interfaces";

interface TitleBarProps {
    selectedUserFlowchart: FlowchartMetaData | null
}
function TitleBar({selectedUserFlowchart}: TitleBarProps) : JSX.Element{

    const {user} = useContext(AuthContext);


    return (
        <div className="titleBar">
            <div className='degreeMajor'>
                <p>{selectedUserFlowchart ? selectedUserFlowchart.major : ""}</p>
            </div>
            <div className='flowName'>
                <p>{selectedUserFlowchart ? selectedUserFlowchart.name : "Welcome To Q2S Planner"}</p>
            </div>
            <div className='catalog'>
                <p>{selectedUserFlowchart ? selectedUserFlowchart.catalogYear + " catalog" : ""} </p>
            </div>
        </div>
    )
}

export default TitleBar