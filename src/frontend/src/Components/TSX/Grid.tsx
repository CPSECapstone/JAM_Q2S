import React, {useContext, useEffect, useState} from 'react';
import '../CSS/Grid.css';
import Term from './Term';
import {DragDropContext, DropResult} from '@hello-pangea/dnd';
import axios, {AxiosResponse} from 'axios';
import {
    ClassDBClass,
    ContextMenuData,
    FlowchartClass, FlowchartTermData,
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
    selectedTermData: FlowchartTermData[];
    quarterClassCache: { [classId: string]: QuarterClassData };
}

function Grid({setTotalUnits, loading, setLoading, selectedTermData, quarterClassCache}: GridProps) {
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

    useEffect((): void => {

    }, []);


    return (
        <div className='grid'>
            {clicked && (
                <ContextMenu top={coords.y} left={coords.x} classData={contextMenuClass}></ContextMenu>
            )}
            <DragDropContext onDragEnd={onDragEnd}
                             onDragStart={() => setClicked(false)}>
                {selectedTermData && selectedTermData.map((term: TermData) => {
                    return (
                        <div className='term' key={term.tIndex}>
                            <Term year={term.tIndex.toString()} classList={term.courses}
                                  totalUnits={Number(term.tUnits) || 0}
                                  id={term.tIndex.toString()} handleRightClick={handleRightClick}
                                  quarterClassCache={quarterClassCache}/>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default Grid;
