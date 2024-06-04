import React from 'react';
import '../CSS/TopBar.css';
import TitleBar from "./TitleBar";
import EditBar from "./EditBar";
import UserMenu from "./UserMenu";
import {FlowchartMetaData} from "../../Interfaces/Interfaces";

interface TopBarProps {
    toggleSideBar: () => void;
    selectedUserFlowchart: FlowchartMetaData | null
}
function TopBar({toggleSideBar, selectedUserFlowchart} : TopBarProps): JSX.Element {
    return (
        <div className='topBar'>
            <div className='profile'>
                <UserMenu></UserMenu>
            </div>
            <div className="flowchartInfo">
                <div className='titleBar'>
                    <TitleBar selectedUserFlowchart={selectedUserFlowchart}></TitleBar>
                </div>
                <div className='editBar'>
                    <EditBar toggleSideBar={toggleSideBar}></EditBar>
                </div>
            </div>
        </div>
    )
}

export default TopBar;