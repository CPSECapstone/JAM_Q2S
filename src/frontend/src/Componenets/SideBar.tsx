import React from 'react';
import SideBarItem from "./SideBarItem";
import './SideBar.css';

function SideBarTab () : JSX.Element {
    return (
        <div className="sideBar">
            <div className="sideBarItems">
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> MAIN FLOWCHART </span>
                    <SideBarItem id={BigInt(11)} name={"Main Flowchart"}/>

                </div>
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> FAVORITES </span>
                    <SideBarItem id={BigInt(121)} name={"Favorites 1"}/>
                    <SideBarItem id={BigInt(122)} name={"Favorites 2"}/>
                </div>
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> ALL FLOWCHARTS </span>
                    <SideBarItem id={BigInt(1231)} name={"All Flowcharts 1"}/>
                    <SideBarItem id={BigInt(1232)} name={"All Flowcharts 2"}/>
                    <SideBarItem id={BigInt(1233)} name={"All Flowcharts 3 Extra LongExtraLongExtra Long Name"}/>
                </div>
            </div>
        </div>
    );
}

export default SideBarTab

