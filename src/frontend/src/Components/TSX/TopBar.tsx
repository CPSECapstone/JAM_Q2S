import React from 'react';
import '../CSS/TopBar.css';
import TitleBar from "./TitleBar";
import EditBar from "./EditBar";
import UserMenu from "./UserMenu";

interface TopBarProps {
    toggleSideBar: () => void;
}
function TopBar({toggleSideBar} : TopBarProps): JSX.Element {
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
                    <EditBar toggleSideBar={toggleSideBar}></EditBar>
                </div>
            </div>
        </div>
    )
}

export default TopBar;