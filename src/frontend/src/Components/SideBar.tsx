import React from 'react';
import SideBarItem from "./SideBarItem";
import './SideBar.css';

function SideBarTab () : JSX.Element {
    return (
        <div className="sideBar">
            <div className="sideBarItems">
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> Main Flowchart </span>
                    <ul className="sideBarList">
                        <SideBarItem id={BigInt(11)} name={"Main Flowchart"}/>
                    </ul>
                </div>
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> Favorites </span>
                    <ul className="sideBarList">
                        <SideBarItem id={BigInt(121)} name={"Favorites 1"}/>
                        <SideBarItem id={BigInt(122)} name={"Favorites 2"}/>
                    </ul>
                </div>
                <div className="sideBarGroup">
                    <span className="sideBarTitle"> All Flowcharts </span>
                    <ul className="sideBarList">
                    <SideBarItem id={BigInt(1231)} name={"All Flowcharts 1"}/>
                    <SideBarItem id={BigInt(1232)} name={"All Flowcharts 2"}/>
                    <SideBarItem id={BigInt(1233)} name={"All Flowcharts 3 Extra Long Name"}/>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBarTab

