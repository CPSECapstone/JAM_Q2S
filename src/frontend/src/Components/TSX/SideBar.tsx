import React, {ChangeEvent, useEffect, useState} from "react";
import {
    ClassDisplayInformation,
    FlowchartClass,
    FlowchartMetaData,
    QuarterClassData,
    TermData
} from "../../Interfaces/Interfaces";

import SideBarItem from "./SideBarItem";
import '../CSS/SideBar.css'
import {IconButton, Tooltip} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import axios, {AxiosResponse} from "axios";
import '../CSS/SideBar.css';
import NewFlowForm from "./NewFlowForm";


interface SideBarProps {
    selectedUserFlowchart: FlowchartMetaData | null;
    setSelectedUserFlowchart: (selected: FlowchartMetaData) => void;
    quarterClassCache: { [classId: string]: QuarterClassData };
    setFlowchartClassCache: (newCache: {
        [classUUID: string]: ClassDisplayInformation
    }) => void;
}

export const SideBar = ({
                            setFlowchartClassCache,
                            setSelectedUserFlowchart,
                            selectedUserFlowchart,
                            quarterClassCache,
                        }: SideBarProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [allUserFlowcharts, setAllUserFlowcharts] = useState<FlowchartMetaData[]>([]);
    const getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartMetaData[]> = await axios.get("http://localhost:8080/api/UserFlowcharts");
        setAllUserFlowcharts(res.data);
    }
    const handleSelectedClick = (flowchart: FlowchartMetaData) => {
        if (!selectedUserFlowchart || selectedUserFlowchart.name !== flowchart.name) {
            let newClassCache: {
                [classUUID: string]: ClassDisplayInformation
            } = {}
            let termData: TermData[] = JSON.parse(flowchart.termData);
            termData.forEach((term: TermData) => {
                term.courses.forEach((course: FlowchartClass) => {
                    if (course.id) {
                        newClassCache[course.uuid] = {
                            ...quarterClassCache[course.id],
                            color: course.color,
                            taken: course.taken,
                            uuid: course.uuid
                        };
                    } else {
                        newClassCache[course.uuid] = {
                            color: course.color,
                            taken: course.taken,
                            displayName: course.customDisplayName ? course.customDisplayName : "",
                            id: course.customId ? course.customId : "",
                            units: course.customUnits ? course.customUnits : "",
                            desc: course.customDesc ? course.customDesc : "",
                            addl: "",
                            uuid: course.uuid
                        }
                    }
                })
            })
            setFlowchartClassCache(newClassCache)
            setSelectedUserFlowchart(flowchart);

        }
    };
    useEffect(() => {
        getFlowcharts().catch(console.error);
    }, [])

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
        return allUserFlowcharts
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

    const handleAddClick = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmitForm = (inputValue: string) => {
        // if (inputValue.trim() !== '') {
        //     const newFlowchart = {
        //         id: 12345,
        //         major: "CS",
        //         catalog: "2022-26",
        //         flowchart: "new",
        //         concentration: "AI",
        //         favorite: false,
        //         main: false
        //     };
        //
        //     // Create a new array with the new flowchart added
        //     // const updatedAllFlowcharts: FlowchartResponse[] = [...allFlowcharts, newFlowchart];
        //     //
        //     // // Update the state with the new array
        //     // setAllFlowcharts(updatedAllFlowcharts);

        handleCloseForm();
    }

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
                {renderFlowchartItems(() => true)}
                <NewFlowForm isOpen={isFormOpen} onClose={handleCloseForm} onSubmit={handleSubmitForm}/>
            </div>
        </div>
    );
}

