import React from 'react';
import './TopBar.css';
import TitleBar from "./TitleBar";
import EditBar from "./EditBar";

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