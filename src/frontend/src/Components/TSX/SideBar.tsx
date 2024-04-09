import React, {useContext, useState, ChangeEvent} from "react";
import {FlowchartData, FlowchartResponse} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";
import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css'
import {IconButton, Tooltip} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import '../CSS/SideBar.css';


interface TestSideBarProps {
    allFlowcharts: FlowchartResponse[];
    setAllFlowcharts: (allFlowcharts: FlowchartResponse[]) => void;
    setLoading: (loading: boolean) => void;
}

export const SideBar = ({allFlowcharts, setLoading, setAllFlowcharts}: TestSideBarProps) => {
    const {setFlowchart} = useContext(FlowchartContext);
    const [selected, setSelected] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

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
                id: 12345,
                major: "CS",
                catalog: "2022-26",
                flowchart: "new",
                concentration: "AI",
                favorite: false,
                main: false
            };

            // Create a new array with the new flowchart added
            const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts, newFlowchart];

            // Update the state with the new array
            setAllFlowcharts(updatedAllFlowcharts);

            handleCloseForm();
        }
    };

    return (
        <div className="sideBar">
            <div className="sidebarRow" id="main">
                <p>MAIN</p>
                {/*{renderFlowchartItems((current: FlowchartResponse) => current.main)}*/}

            </div>
            <div className="sidebarRow" id="favorites">
                <p>FAVORITES</p>
                {/*{renderFlowchartItems((current: FlowchartResponse) => current.favorite && !current.main)}*/}
            </div>
            <div className="sidebarRow" id="all">
                <div id="allFlowchartsHeader">
                    <p>ALL FLOWCHARTS</p>
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

