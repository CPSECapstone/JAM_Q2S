import React, {useContext, useEffect, useRef, useState} from "react";
import {
    ClassDisplayInformation,
    FlowchartClass,
    FlowchartMetaData, PatchRequestDTO,
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
import {AuthContext} from "../../Context/AuthContext";


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
    const allUserFlowchartRef = useRef<FlowchartMetaData[]>([]);
    const flowchartClassCacheRef = useRef<{
        [classUUID: string]: ClassDisplayInformation
    }>({});
    const prevSelectedFlowchart = usePrevious({selectedUserFlowchart, flowchartClassCache})
    selectedUserFlowchartRef.current = selectedUserFlowchart
    flowchartClassCacheRef.current = flowchartClassCache
    allUserFlowchartRef.current = allUserFlowcharts
    const { user } = useContext(AuthContext);

    const getFlowcharts = async () => {
        let res: AxiosResponse<FlowchartMetaData[]> = await axios.get("http://localhost:8080/api/AllFlowcharts");
        setAllUserFlowcharts(res.data);
    }
    const updateFlowchartClassData = (currentSelectedFlowchart: FlowchartMetaData, classCache:{
        [classUUID: string]: ClassDisplayInformation
    }): string => {
        let newTermData: TermData[] = JSON.parse(currentSelectedFlowchart.termData)
        newTermData.forEach((term: TermData) => {
            term.courses.forEach((course: FlowchartClass) => {
                course.color = classCache[course.uuid].color;
                course.taken = classCache[course.uuid].taken;
            })
        })
        return JSON.stringify(newTermData);
    }

    const saveFlowchart = () => {
        if (selectedUserFlowchart) {
            const flowchartIndex: number = allUserFlowcharts.findIndex(fc => fc.id === selectedUserFlowchart.id);
            if (flowchartIndex !== -1) {
                const newAllUserFlowcharts: FlowchartMetaData[] = [...allUserFlowcharts];
                newAllUserFlowcharts[flowchartIndex] = {
                    ...newAllUserFlowcharts[flowchartIndex],
                    termData: updateFlowchartClassData(selectedUserFlowchart, flowchartClassCache),
                };
                setAllUserFlowcharts(newAllUserFlowcharts);
            }
        }
    }


    const getNewFlowchart = async (inputValue: string) => {
        console.log(user);
        const userId = user?.userId;
        const newUserFlowchartDTO = {
            flowchartName: inputValue,
            catalogYear: user?.catalog_year,
            major: user?.major,
            concentration: user?.concentration,
            term_admitted: user?.term_admitted
        };
        try {
            let res = await axios.post(`http://localhost:8080/api/user-flowcharts?userId=${userId}`, newUserFlowchartDTO);
            const newFlowchart = res.data;
            const updatedAllFlowcharts = [...allUserFlowcharts, newFlowchart];
            setAllUserFlowcharts(updatedAllFlowcharts);
        } catch (error) {
            console.error("Error adding new flowchart:", error);
        }
    }

    const handleSelectedClick = (flowchart: FlowchartMetaData) => {
        saveFlowchart()
        if (!selectedUserFlowchart || selectedUserFlowchart.name !== flowchart.name) {
            let newClassCache: {
                [classUUID: string]: ClassDisplayInformation
            } = {}
            let termData: TermData[] = JSON.parse(flowchart.termData);
            termData.forEach((term: TermData) => {
                term.courses.forEach((course: FlowchartClass) => {
                    if (course.id && course.id in quarterClassCache) {
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



    const handleUpdatingFlowchart = async () => {
        if (selectedUserFlowchartRef.current != null) {
            const currentFlowchart = selectedUserFlowchartRef.current;
            const patchRequests: PatchRequestDTO[] = [];
            allUserFlowchartRef.current.forEach((flowchart: FlowchartMetaData) => {
                patchRequests.push({
                    flowchartId: flowchart.id.toString(),
                    patchRequest: [{
                        op: "replace",
                        path: "/termData",
                        value: flowchart.id === currentFlowchart.id
                            ? updateFlowchartClassData(currentFlowchart, flowchartClassCacheRef.current)
                            : flowchart.termData
                    }]
                });
            });
            axios.patch("http://localhost:8080/api/updateFlowcharts/" , patchRequests, {
                    headers: {
                        'Content-Type': 'application/json-patch+json',
                    }
                }
            ).catch(console.error)
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleUpdatingFlowchart);
        return () => {
            window.removeEventListener('beforeunload', handleUpdatingFlowchart);
        };
    }, []);


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
        if (inputValue.trim() !== '') {
            console.log(inputValue)
            getNewFlowchart(inputValue).catch(console.error);
        }

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
            <button onClick={() => handleUpdatingFlowchart()}>start</button>
            <div className="sidebarRow" id="all">
                <div id="allFlowchartsHeader">
                    <p>ALL FLOWCHARTS</p>
                    <Tooltip title="Create a new Flow" placement="right" arrow>
                        <IconButton aria-label="favorite flowchart" size="small" onClick={handleAddClick}>
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

