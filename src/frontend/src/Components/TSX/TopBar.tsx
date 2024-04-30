import React from 'react';
import '../CSS/TopBar.css';
import TitleBar from "./TitleBar";
import EditBar from "./EditBar";
import UserMenu from "./UserMenu";


function TopBar(): JSX.Element {
    return (
        <div className='topBar'>
            <div className='profile'>
                <UserMenu></UserMenu>
            </div>
            <div className="flowchartInfo">
                <div className='titleBar'>
                    <TitleBar></TitleBar>
                </div>
                <div className='editBar'>
                    <EditBar></EditBar>
                </div>
            </div>
        </div>
    )
}

export default TopBar;