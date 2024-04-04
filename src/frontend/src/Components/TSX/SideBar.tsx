import React, {useContext, useState} from "react";
import {FlowchartData, FlowchartResponse} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";
import React, { useState, ChangeEvent, useEffect } from 'react';
import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css'
import {IconButton, Tooltip} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import '../CSS/SideBar.css';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { IconButton, Stack, Tooltip } from "@mui/material";


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
                        key={flowchartData.name}
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

    const handleAddClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmitForm = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            const newFlowchart = {
                id: BigInt(Date.now()),
                name: inputValue.trim(),
            };

            // Create a new array with the new flowchart added
            const updatedFlowcharts = [...flowcharts.all_flowcharts, newFlowchart];

            // Update the state with the new array
            setFlowcharts(prevFlowcharts => ({
                ...prevFlowcharts,
                all_flowcharts: updatedFlowcharts,
            }));

            handleCloseForm();
        }
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
                <NewFlowForm isOpen={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm} />
            </div>
        </div>
    );
};
}
export interface flowchartProps {
    flowcharts: { id: bigint; name: string }[];
    group: string;
    onFavoriteClick: (id: bigint) => void;
    onStarClick: (id: bigint) => void;
}
function AllFlowcharts(props: flowchartProps): JSX.Element  {
    const sideBarItems = props.flowcharts.map(({id, name}) => {
        return(
            <SideBarItem key={id} id={id} name={name} group={props.group} onFavoriteClick={props.onFavoriteClick} onStarClick={props.onStarClick}/>
        );
    });
    return <>{sideBarItems}</>;
}

interface NewFlowFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (inputValue: string) => void;
}

function NewFlowForm({ isOpen, onClose, onSubmit }: NewFlowFormProps) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className={`custom-popup ${isOpen ? 'open' : 'closed'}`}>
            <div className="custom-popup-content">
                <IconButton aria-label="close-btn" size="small"
                            onClick={onClose}>
                    <IndeterminateCheckBoxOutlinedIcon/>
                </IconButton>
                <text className="popup-text">ENTER NEW FLOW NAME</text>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default SideBarTab;
