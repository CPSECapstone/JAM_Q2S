import React, {useContext, useState} from "react";
import {FlowchartData, FlowchartResponse} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";
import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css'
import {IconButton, Tooltip} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";


interface TestSideBarProps {
    allFlowcharts: FlowchartResponse[];
    setAllFlowcharts: (allFlowcharts: FlowchartResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const SideBar = ({allFlowcharts, setLoading, setAllFlowcharts}: TestSideBarProps) => {
    const {setFlowchart} = useContext(FlowchartContext);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelectedClick = (flowchart: FlowchartData) => {
        if (!selected || selected !== flowchart.name) {
            setLoading(true);
            setFlowchart(flowchart);
            setSelected(flowchart.name);
        }
    };

    const handleFavoriteClick = (current: FlowchartResponse) => {
        const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts];
        const currentIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart === current);
        updatedAllFlowcharts[currentIndex].favorite = !current.favorite;
        setAllFlowcharts(updatedAllFlowcharts);
    };

    const handleMainClick = (current: FlowchartResponse) => {
        const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts];
        const currentIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart === current);
        const currentMainIndex: number = allFlowcharts.findIndex((flowchart: FlowchartResponse) => flowchart.main);
        if (currentMainIndex !== -1) {
            updatedAllFlowcharts[currentMainIndex].main = false;

        }
        updatedAllFlowcharts[currentIndex].main = true;
        setAllFlowcharts(updatedAllFlowcharts);
    };

    const renderFlowchartItems = (filterCondition: (current: FlowchartResponse) => boolean) => {
        return allFlowcharts
            .filter(filterCondition)
            .map((current: FlowchartResponse) => {
                const flowchartData: FlowchartData = JSON.parse(current.flowchart);
                return (
                    <SideBarItem
                        key={flowchartData.id}
                        handleSelectedClick={handleSelectedClick}
                        handleMainClick={handleMainClick}
                        responseData={current}
                        handleFavoriteClick={handleFavoriteClick}
                        data={flowchartData}
                        selected={selected === flowchartData.name}
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
                {renderFlowchartItems((current: FlowchartResponse) => true)}
            </div>
        </div>
    );
};
