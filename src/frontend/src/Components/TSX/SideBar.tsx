import React from "react";
import {FlowchartData, FlowchartMetaData} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";
import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css'
import {IconButton, Tooltip} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";


interface SideBarProps {
    allFlowcharts: FlowchartMetaData[];
    setLoading: (loading: boolean) => void;
    selectedUserFlowchart: FlowchartMetaData | null;
    setSelectedUserFlowchart: (selected: FlowchartMetaData) => void;
}

export const SideBar = ({
                            allFlowcharts,
                            setLoading,
                            setSelectedUserFlowchart,
                            selectedUserFlowchart
                        }: SideBarProps) => {

    const handleSelectedClick = (flowchart: FlowchartMetaData) => {
        if (!selectedUserFlowchart || selectedUserFlowchart.name !== flowchart.name) {
            setLoading(true);
            setSelectedUserFlowchart(flowchart);

        }
    };

    // const handleFavoriteClick = (current: FlowchartResponse) => {
    //     const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts];
    //     const currentIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart === current);
    //     updatedAllFlowcharts[currentIndex].favorite = !current.favorite;
    //     setAllFlowcharts(updatedAllFlowcharts);
    // };

    // const handleMainClick = (current: FlowchartResponse) => {
    //     const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts];
    //     const currentIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart === current);
    //     const currentMainIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart.main);
    //     if (currentMainIndex !== -1) {
    //         updatedAllFlowcharts[currentMainIndex].main = false;
    //
    //     }
    //     updatedAllFlowcharts[currentIndex].main = true;
    //     setAllFlowcharts(updatedAllFlowcharts);
    // };

    const renderFlowchartItems = (filterCondition: (current: FlowchartMetaData) => boolean) => {
        return allFlowcharts
            .filter(filterCondition)
            .map((current: FlowchartMetaData) => {
                return (
                    <SideBarItem
                        key={current.id}
                        handleSelectedClick={handleSelectedClick}
                        // handleMainClick={handleMainClick}
                        // responseData={current}
                        // handleFavoriteClick={handleFavoriteClick}
                        data={current}
                        selected={selectedUserFlowchart ? selectedUserFlowchart.name === current.name : false}
                    />
                );
            });
    };

    return (
        <div className="sideBar">
            <div className="sidebarRow" id="main">
                <p>Main</p>
                {/*{renderFlowchartItems((current: FlowchartResponse) => current.main)}*/}

            </div>
            <div className="sidebarRow" id="favorites">
                <p>Favorites</p>
                {/*{renderFlowchartItems((current: FlowchartResponse) => current.favorite && !current.main)}*/}
            </div>
            <div className="sidebarRow" id="all">
                <div id="allFlowchartsHeader">
                    <p>All Flowcharts</p>
                    <Tooltip title="Create a new Flow" placement="right" arrow>
                        <IconButton aria-label="favorite flowchart" size="small">
                            <AddBoxOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                {renderFlowchartItems(() => true)}
            </div>
        </div>
    );
};
