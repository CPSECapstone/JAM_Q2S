import React, {useContext} from 'react';
import '../CSS/TitleBar.css';
import {Typography} from "@mui/material";
import {AuthContext} from "../../Context/AuthContext";
import {FlowchartContext} from "../../Context/FlowchartProvider";


function TitleBar() : JSX.Element{
    const {flowchart} = useContext(FlowchartContext);
    const {user} = useContext(AuthContext);


    return (
        <div className="titleBar">
            <div className='flowName'>
                <Typography>{flowchart?.name}</Typography>
            </div>
            <div className='degreeMajor'>
                <Typography>{user?.major}</Typography>
            </div>
            <div className='catalog'>
                <Typography>{user?.catalog_year} Catalog</Typography>
            </div>
        </div>
    )
}

export default TitleBar