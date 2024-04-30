import React from 'react';
import '../CSS/Term.css';
import {Droppable} from '@hello-pangea/dnd';
import Class from './Class';
import {ClassDisplayInformation, FlowchartClass} from '../../Interfaces/Interfaces';
import {ClassDBClass} from '../../Interfaces/Interfaces';
import Grid from "./Grid";

type Props = {
    year: string;
    classList: FlowchartClass[];
    id: string;
    termName: string;
    termType: string;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    totalUnits: number;
    flowchartClassCache: { [classId: string]: ClassDisplayInformation };
};

function Term({year, classList, id, handleRightClick, totalUnits, flowchartClassCache}: Props): JSX.Element {
function Term({year, classList, id, termName, termType, handleRightClick, totalUnits}: Props): JSX.Element {
    const termAsLetter = termType.match("Quarter") ? "Q" : "S";

    return (
        <div className='term'>
            <div className='title'>
                <div className="centered">
                    <p style={{margin: 0}}>{termName}</p>
                </div>
                <div className="right-aligned">
                    <p style={{margin: 0}}>{termAsLetter}</p>
                </div>
            </div>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div className='body'
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                        {classList.map((currentClass: FlowchartClass, i: number) => (
                            <Class key={i}
                                   index={i}
                                   classData={flowchartClassCache[currentClass.uuid]}
                                   handleRightClick={handleRightClick}
                                   term={id}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="termTotalUnits">
                <p style={{margin: 0}}>{totalUnits}</p>
            </div>
        </div>
    );
}

export default Term;
