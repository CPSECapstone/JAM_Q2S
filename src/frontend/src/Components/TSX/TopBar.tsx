import React, {useContext} from 'react';
import '../CSS/TopBar.css';
import TitleBar from "./TitleBar";
import EditBar from "./EditBar";
import {FlowchartContext, FlowchartProvider} from "../../Context/FlowchartProvider";


function TopBar() : JSX.Element{
    return (
        <div className='topBar'>
            <div className='titleBar'>
                <TitleBar></TitleBar>
            </div>
            <div className='editBar'>
                <EditBar></EditBar>
            </div>
        </div>
    )
}

export default TopBar;