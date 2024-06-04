import React, {useEffect, useState} from 'react';
import '../CSS/Grid.css';
import Term from './Term';
import {DragDropContext, DropResult} from '@hello-pangea/dnd';
import {
    ClassDisplayInformation,
    ContextMenuData,
    FlowchartClass, FlowchartMetaData,
    TermData
} from '../../Interfaces/Interfaces';
import {useContextMenu} from '../../Hooks/useContextMenu';
import ContextMenu from './ContextMenu';

interface GridProps {
    setTotalUnits: (units: number) => void;
    selectedUserFlowchart: FlowchartMetaData;
    setSelectedUserFlowchart: (newFlowchart: FlowchartMetaData) => void;
    flowchartClassCache: {
        [classUUID: string]: ClassDisplayInformation
    }

}

function Grid({setTotalUnits, setSelectedUserFlowchart, selectedUserFlowchart, flowchartClassCache}: GridProps) {
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
        if (!selectedUserFlowchart) {
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
        let updatedTerms: TermData[] = JSON.parse(selectedUserFlowchart.termData)

        let start: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === source.droppableId);
        let finish: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === destination.droppableId);
        if (!start || !finish) return;
        const newFlowchartClass: FlowchartClass = {
            id: flowchartClassCache[draggableId].id,
            color: flowchartClassCache[draggableId].color,
            taken: flowchartClassCache[draggableId].taken,
            uuid: flowchartClassCache[draggableId].uuid
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
            start.tUnits = String(Number(start.tUnits) - Number(flowchartClassCache[start.courses[source.index].uuid].units))
            start.courses = startClasses;
            finish.courses = finishClasses;
            finish.tUnits = String(Number(finish.tUnits) + Number(flowchartClassCache[finish.courses[destination.index].uuid].units))

        }

        setSelectedUserFlowchart({...selectedUserFlowchart, termData: JSON.stringify(updatedTerms)});
    };


    const calculateTotalUnits = () => {
        let total = 0;
        if (selectedUserFlowchart) {
            let parsedTermData: TermData[] = JSON.parse(selectedUserFlowchart.termData)
            console.log(parsedTermData)
            parsedTermData.forEach((term: TermData) => {
                total += Number(term.tUnits) || 0;
            });
        }
        setTotalUnits(total);
    };

    useEffect((): void => {
        calculateTotalUnits()
    }, [selectedUserFlowchart]);


    return (
        <div className='grid'>
            {clicked && (
                <ContextMenu top={coords.y} left={coords.x} classData={contextMenuClass}
                             flowchartClassCache={flowchartClassCache} selectedUserFlowchart={selectedUserFlowchart}
                             setSelectedUserFlowchart={setSelectedUserFlowchart}></ContextMenu>
            )}
            <DragDropContext onDragEnd={onDragEnd}
                             onDragStart={() => setClicked(false)}>
                {selectedUserFlowchart && JSON.parse(selectedUserFlowchart.termData).map((term: TermData) => {
                    return (
                        <div className='term' key={term.termName}>
                            <Term year={term.termName} classList={term.courses}
                                  totalUnits={Number(term.tUnits) || 0}
                                  id={term.termName} handleRightClick={handleRightClick}
                                  flowchartClassCache={flowchartClassCache}
                                  termName={term.termName} termType={term.termType}/>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

export default Grid;
