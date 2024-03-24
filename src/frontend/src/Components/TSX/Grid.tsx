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

interface GridProps {
    setTotalUnits: (units: number) => void;
}

function Grid({setTotalUnits}: GridProps) {
    const [classDB, setClassDB] = useState<{
        [ClassId: string]: ClassDBClass
    }>({});
    const [loading, setLoading] = useState<boolean>(true); // State to track loading
    const {flowchart, setFlowchart} = useContext(FlowchartContext);
    const {clicked, setClicked, coords, setCoords} = useContextMenu();
    const [contextMenuClass, setContextMenuClass] = useState<ContextMenuData>({classId: "", termId: ""});

    const handleRightClick = (term: string, classId: string, x: number, y: number) => {
        setContextMenuClass({
            classId: classDB[classId].classData.id,
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
        let updatedTerms = [...flowchart];

        // Find the source and destination terms
        let start: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === source.droppableId);
        let finish: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === destination.droppableId);
        if (!start || !finish) return;
        const newFlowchartClass: FlowchartClass = {
            id: draggableId,
            color: classDB[draggableId].color,
            taken: classDB[draggableId].taken
        }
        if (source.droppableId === destination.droppableId) {
            let newClasses: FlowchartClass[] = Array.from(start.classes);
            newClasses.splice(source.index, 1);
            newClasses.splice(destination.index, 0, newFlowchartClass);
            start.classes = newClasses;
        } else {
            let startClasses: FlowchartClass[] = Array.from(start.classes);
            startClasses.splice(source.index, 1);
            let finishClasses: FlowchartClass[] = Array.from(finish.classes);
            finishClasses.splice(destination.index, 0, newFlowchartClass);
            start.classes = startClasses;
            finish.classes = finishClasses;
        }

        setFlowchart(updatedTerms);

    };

    const calculateTotalUnits = () => {
        let total = 0;
        if (flowchart) {
            flowchart.forEach((term) => {
                total += term.totalUnits || 0;
            });
        }
        setTotalUnits(total);
    };

    useEffect(() => {
        const fetchQuarterClassData = async () => {
            if (!flowchart) {
                return null;
            }
            try {
                const termClassData: {
                    [ClassId: string]: ClassDBClass
                } = {};
                const promises = flowchart.map(async (term) => {
                    let termTotalUnits = 0;
                    await Promise.all(
                        term.classes.map(async (flowchartClass: FlowchartClass) => {
                            if (flowchartClass.id in classDB) {
                                termClassData[flowchartClass.id] = {
                                    classData: classDB[flowchartClass.id].classData,
                                    color: flowchartClass.color,
                                    taken: flowchartClass.taken
                                };
                            } else {
                                const response: AxiosResponse<QuarterClassData> =
                                    await axios.get('http://localhost:8080/get/QuarterClass/' + flowchartClass.id);
                                termTotalUnits += Number(response.data.units);
                                termClassData[response.data.id] = {
                                    classData: response.data,
                                    color: flowchartClass.color,
                                    taken: flowchartClass.taken
                                };
                            }
                        })
                    );
                    term.totalUnits = termTotalUnits;
                });

                await Promise.all(promises);
                setClassDB(termClassData);
                setLoading(false);
                calculateTotalUnits(); // Call calculateTotalUnits after updating flowchart data
            } catch (error) {
                console.error('Error fetching QuarterClass:', error);
            }
        };

        if (flowchart && flowchart.length > 0) {
            fetchQuarterClassData();
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
                    <p>Loading...</p>
                ) : (
                    flowchart ? (
                        flowchart.map((term: TermData) => {
                            const classes: ClassDBClass[] =
                                term.classes.map((flowchartClass: FlowchartClass) => classDB[flowchartClass.id]);
                            return (
                                <div className='term' key={term.termName}>
                                    <Term year={term.termName} classList={classes} totalUnits={term.totalUnits || 0}
                                          id={term.termName} handleRightClick={handleRightClick}/>
                                </div>
                            );
                        })
                    ) : (
                        <p>No Flowchart Selected</p>
                    )
                )}
            </DragDropContext>
        </div>

    );
}

export default Grid;