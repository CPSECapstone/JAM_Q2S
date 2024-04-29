import React, {useContext, useEffect, useState} from 'react';
import '../CSS/Grid.css';
import Term from './Term';
import {DragDropContext, DropResult} from '@hello-pangea/dnd';
import axios, {AxiosResponse} from 'axios';
import {
    ClassDBClass,
    ContextMenuData,
    FlowchartClass,
    QuarterClassData,
    TermData
} from '../../Interfaces/Interfaces';
import {FlowchartContext} from '../../Context/FlowchartProvider';
import {useContextMenu} from '../../Hooks/useContextMenu';
import ContextMenu from './ContextMenu';
import {Loader} from "./Loader";

interface GridProps {
    setTotalUnits: (units: number) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

function Grid({setTotalUnits, loading, setLoading}: GridProps) {
    const [classDB, setClassDB] = useState<{ [ClassId: string]: ClassDBClass }>({});
    const {flowchart, setFlowchart} = useContext(FlowchartContext);
    const {clicked, setClicked, coords, setCoords} = useContextMenu();
    const [contextMenuClass, setContextMenuClass] = useState<ContextMenuData>({classUUID: "", termId: ""});

    const handleRightClick = (term: string, classId: string, x: number, y: number) => {
        setContextMenuClass({
            classUUID: classId,
            termId: term
        });
        setClicked(true);
        setCoords({x, y});
    }

    let onDragEnd = (result: DropResult): void => {
        if (!flowchart) {
            return;
        }

        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }
        let updatedTerms = [...flowchart.termData];

        let start: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.tIndex.toString() === source.droppableId);
        let finish: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.tIndex.toString() === destination.droppableId);
        if (!start || !finish) return;
        const newFlowchartClass: FlowchartClass = {
            id: classDB[draggableId].classData.id,
            color: classDB[draggableId].color,
            taken: classDB[draggableId].taken,
            uuid: classDB[draggableId].uuid
        }
        if (source.droppableId === destination.droppableId) {
            let newClasses: FlowchartClass[] = Array.from(start.courses);
            newClasses.splice(source.index, 1);
            newClasses.splice(destination.index, 0, newFlowchartClass);
            start.courses = newClasses;
        } else {
            let startClasses: FlowchartClass[] = Array.from(start.courses);
            startClasses.splice(source.index, 1);
            let finishClasses: FlowchartClass[] = Array.from(finish.courses);
            finishClasses.splice(destination.index, 0, newFlowchartClass);
            start.courses = startClasses;
            finish.courses = finishClasses;
        }

        setFlowchart({...flowchart, termData: updatedTerms});
    };

    const calculateTotalUnits = () => {
        let total = 0;
        if (flowchart) {
            flowchart.termData.forEach((term) => {
                total += Number(term.tUnits) || 0;
            });
        }
        setTotalUnits(total);
    };

    const fetchQuarterClassData = async () => {
        if (!flowchart) {
            return null;
        }
        try {
            const termClassData: { [ClassId: string]: ClassDBClass } = {...classDB};
            const promises = flowchart.termData.slice(1).map(async (term: TermData) => {
                let termTotalUnits: number = 0;
                await Promise.all(
                    term.courses.map(async (flowchartClass: FlowchartClass) => {
                        if (flowchartClass.uuid in classDB) {
                            termTotalUnits += Number(classDB[flowchartClass.uuid].classData.units);
                            termClassData[flowchartClass.uuid] = {
                                classData: classDB[flowchartClass.uuid].classData,
                                color: flowchartClass.color,
                                taken: flowchartClass.taken,
                                uuid: flowchartClass.uuid
                            };
                        } else {
                            if (flowchartClass.id) {
                                const response: AxiosResponse<QuarterClassData> =
                                    await axios.get('http://localhost:8080/get/QuarterClass/' + flowchartClass.id);
                                termTotalUnits += Number(response.data.units);
                                termClassData[flowchartClass.uuid] = {
                                    classData: response.data,
                                    color: flowchartClass.color,
                                    taken: flowchartClass.taken,
                                    uuid: flowchartClass.uuid
                                }
                            } else {
                                termTotalUnits += Number(flowchartClass.customUnits);
                                let classData: QuarterClassData = {
                                    id: flowchartClass.customId ? flowchartClass.customId : "",
                                    displayName: flowchartClass.customDisplayName ? flowchartClass.customDisplayName : "",
                                    units: flowchartClass.customUnits ? flowchartClass.customUnits : "",
                                    desc: flowchartClass.customDesc ? flowchartClass.customDesc : "",
                                    addl: "",
                                    gwrCourse: false,
                                    uscpCourse: false
                                }
                                termClassData[flowchartClass.uuid] = {
                                    classData: classData,
                                    color: flowchartClass.color,
                                    taken: flowchartClass.taken,
                                    uuid: flowchartClass.uuid
                                };
                            }
                        }
                    })
                );
                term.tUnits = termTotalUnits.toString();
            });

            await Promise.all(promises);
            setClassDB(termClassData);
            calculateTotalUnits();
            return null;
        } catch (error) {
            console.error('Error fetching QuarterClass:', error);
        }
    };

    useEffect(() => {
        if (flowchart && flowchart.termData.length > 0) {
            fetchQuarterClassData().finally(() => setLoading(false)).catch(console.error);
        }
    }, [flowchart]);


    return (
        <div className='grid'>
            {clicked && (
                <ContextMenu top={coords.y} left={coords.x} classData={contextMenuClass}></ContextMenu>
            )}
            <DragDropContext onDragEnd={onDragEnd}
                             onDragStart={() => setClicked(false)}>
                {loading ? (
                    <Loader/>
                ) : (
                    flowchart && (
                        flowchart.termData.slice(1).map((term: TermData) => {
                            const classes: ClassDBClass[] =
                                term.courses.map((flowchartClass: FlowchartClass) => classDB[flowchartClass.uuid]);
                            return (
                                <div className='term' key={term.tIndex}>
                                    <Term year={term.tIndex} classList={classes}
                                          totalUnits={Number(term.tUnits) || 0}
                                          id={term.tIndex.toString()} handleRightClick={handleRightClick}/>
                                </div>
                            );
                        })
                    )
                )}
            </DragDropContext>
        </div>
    );
}

export default Grid;
