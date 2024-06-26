import React, {useEffect, useState} from 'react';
import '../CSS/Grid.css';
import Term from './Term';
import {DragDropContext, DropResult} from '@hello-pangea/dnd';
import {
    ClassDisplayInformation,
    ContextMenuData,
    FlowchartClass, FlowchartMetaData, QuarterClassData,
    TermData
} from '../../Interfaces/Interfaces';
import {useContextMenu} from '../../Hooks/useContextMenu';
import ClassContextMenu from './ClassContextMenu';
import TermContextMenu from './TermContextMenu';

interface GridProps {
    setTotalUnits: (units: number) => void;
    selectedUserFlowchart: FlowchartMetaData;
    setSelectedUserFlowchart: (newFlowchart: FlowchartMetaData) => void;
    flowchartClassCache: {
        [classUUID: string]: ClassDisplayInformation
    }
    quarterClassCache: {
        [classUUID: string]: QuarterClassData
    }

}


function Grid({setTotalUnits, setSelectedUserFlowchart, selectedUserFlowchart, flowchartClassCache, quarterClassCache}: GridProps) {
    const {classClicked, setClassClicked, termClicked, setTermClicked, coords, setCoords} = useContextMenu();

    const [contextMenuClass, setContextMenuClass] = useState<ContextMenuData>({classUUID: "", termId: ""});

    const handleRightClick = (term: string, classId: string, x: number, y: number) => {
        setContextMenuClass({
            classUUID: classId,
            termId: term
        });
        setCoords({x, y});
        if(classId != ""){
            setClassClicked(true);
            setTermClicked(false);
        }
        else {
            setTermClicked(true);
            setClassClicked(false);
        }
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
        let newFlowchartClass: FlowchartClass;
        if (flowchartClassCache[draggableId].id in quarterClassCache) {
            newFlowchartClass = {
                id: flowchartClassCache[draggableId].id,
                color: flowchartClassCache[draggableId].color,
                taken: flowchartClassCache[draggableId].taken,
                uuid: flowchartClassCache[draggableId].uuid
            }
        } else {
            newFlowchartClass = {
                id: null,
                color: flowchartClassCache[draggableId].color,
                taken: flowchartClassCache[draggableId].taken,
                uuid: flowchartClassCache[draggableId].uuid,
                customDesc: flowchartClassCache[draggableId].desc,
                customDisplayName: flowchartClassCache[draggableId].displayName,
                customId: flowchartClassCache[draggableId].id,
                customUnits: flowchartClassCache[draggableId].units
            }
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

        setSelectedUserFlowchart({...selectedUserFlowchart, termData: JSON.stringify(updatedTerms)});
    };


    const calculateTotalUnits = () => {
        let total = 0;
        if (selectedUserFlowchart) {
            JSON.parse(selectedUserFlowchart.termData).termData.forEach((term: TermData) => {
                total += Number(term.tUnits) || 0;
            });
        }
        setTotalUnits(total);
    };

    useEffect((): void => {
    }, []);


    return (
        <div className='grid'>
            {classClicked && (
                <ClassContextMenu top={coords.y} left={coords.x} classData={contextMenuClass}
                                  flowchartClassCache={flowchartClassCache} selectedUserFlowchart={selectedUserFlowchart}
                                  setSelectedUserFlowchart={setSelectedUserFlowchart}></ClassContextMenu>
            )}
            {termClicked && (
                <TermContextMenu top={coords.y} left={coords.x} classData={contextMenuClass}
                                  flowchartClassCache={flowchartClassCache} selectedUserFlowchart={selectedUserFlowchart}
                                  setSelectedUserFlowchart={setSelectedUserFlowchart}></TermContextMenu>
            )}
            <DragDropContext onDragEnd={onDragEnd}
                             onDragStart={() => {
                                 setClassClicked(false);
                                 setTermClicked(false);
                             }}>
                {selectedUserFlowchart && JSON.parse(selectedUserFlowchart.termData).map((term: TermData) => {
                    return (
                        <div className='term' key={term.termName}>
                            <Term year={term.termName} classList={term.courses}
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
