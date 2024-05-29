import React, {useEffect, useRef, useState} from "react";
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
import usePrevious from "../../Hooks/usePrevious";


interface SideBarProps {
    selectedUserFlowchart: FlowchartMetaData | null;
    setSelectedUserFlowchart: (selected: FlowchartMetaData) => void;
    quarterClassCache: { [classId: string]: QuarterClassData };
    setFlowchartClassCache: (newCache: {
        [classUUID: string]: ClassDisplayInformation
    }) => void;
    flowchartClassCache: {
        [classUUID: string]: ClassDisplayInformation
    }
}

export const SideBar = ({
                            setFlowchartClassCache,
                            flowchartClassCache,
                            setSelectedUserFlowchart,
                            selectedUserFlowchart,
                            quarterClassCache,
                        }: SideBarProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [allUserFlowcharts, setAllUserFlowcharts] = useState<FlowchartMetaData[]>([]);
    const [selectedUserFlowchartId, setSelectedUserFlowchartId] = useState<number>(0);
    const selectedUserFlowchartRef = useRef<FlowchartMetaData | null>(null);
    const flowchartClassCacheRef = useRef<{
        [classUUID: string]: ClassDisplayInformation
    }>({});
    const prevSelectedFlowchart = usePrevious({selectedUserFlowchart, flowchartClassCache})
    selectedUserFlowchartRef.current = selectedUserFlowchart
    flowchartClassCacheRef.current = flowchartClassCache
    const getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartMetaData[]> = await axios.get("http://localhost:8080/api/UserFlowcharts");
        setAllUserFlowcharts(res.data);
    }
    const updateFlowchartClassData = (currentSelectedFlowchart: FlowchartMetaData, classCache: {
        [classUUID: string]: ClassDisplayInformation
    }): string => {
        let newTermData: TermData[] = JSON.parse(currentSelectedFlowchart.termData)
        console.log(newTermData)
        newTermData.forEach((term: TermData) => {
            term.courses.forEach((course: FlowchartClass) => {
                course.color = classCache[course.uuid].color;
                course.taken = classCache[course.uuid].taken;
            })
        })
        console.log(newTermData)
        return JSON.stringify(newTermData);
    }
    const handleSelectedClick = (flowchart: FlowchartMetaData) => {
        if (selectedUserFlowchart) {
            // const updatedTermData: string = updateFlowchartClassData(selectedUserFlowchart, flowchartClassCache);
            let newAllUserFlowcharts: FlowchartMetaData[] = allUserFlowcharts;
            let currentFlowchart: FlowchartMetaData | undefined = newAllUserFlowcharts
                .find((flowchart: FlowchartMetaData) => flowchart.id = selectedUserFlowchart.id)
            if(currentFlowchart){
                currentFlowchart.termData = selectedUserFlowchart.termData;
            }
            setAllUserFlowcharts(newAllUserFlowcharts);
        }

        if(!selectedUserFlowchart){
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
        }

        if (!selectedUserFlowchart || selectedUserFlowchart.name !== flowchart.name) {

            setSelectedUserFlowchart(flowchart);

        }
    };


    useEffect(() => {
        getFlowcharts().catch(console.error);
    }, [])

    // const handleUpdatingFlowchartOnNewSelection = async (): Promise<void> => {
    //     if (prevSelectedFlowchart?.selectedUserFlowchart) {
    //         console.log("Updating flowcharts")
    //         axios.patch("http://localhost:8080/api/updateFlowchart/" + prevSelectedFlowchart.selectedUserFlowchart.id, [{
    //                 "op": "replace",
    //                 "path": "/termData",
    //                 "value": updatedFlowchartClassData(prevSelectedFlowchart.selectedUserFlowchart, prevSelectedFlowchart.flowchartClassCache)
    //             }], {
    //                 headers: {
    //                     'Content-Type': 'application/json-patch+json',
    //                 }
    //             }
    //         ).catch(console.error)
    //     }
    // }

    // const handleUpdatingFlowchartBeforeUnload = async () => {
    //     if (selectedUserFlowchartRef.current) {
    //         axios.patch("http://localhost:8080/api/updateFlowchart/" + selectedUserFlowchartRef.current.id, [{
    //                 "op": "replace",
    //                 "path": "/termData",
    //                 "value": updatedFlowchartClassData(selectedUserFlowchartRef.current, flowchartClassCacheRef.current)
    //             }], {
    //                 headers: {
    //                     'Content-Type': 'application/json-patch+json',
    //                 }
    //             }
    //         ).catch(console.error)
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('beforeunload', handleUpdatingFlowchart);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleUpdatingFlowchart);
    //     };
    // }, []);


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

