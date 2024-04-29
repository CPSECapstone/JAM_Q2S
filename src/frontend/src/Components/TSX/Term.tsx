import React from 'react';
import '../CSS/Term.css';
import {Droppable} from '@hello-pangea/dnd';
import Class from './Class';
import {ClassDBClass} from '../../Interfaces/Interfaces';
import Grid from "./Grid";

type Props = {
    year: number;
    classList: ClassDBClass[];
    id: string;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    totalUnits: number;
};

function Term({year, classList, id, handleRightClick, totalUnits}: Props): JSX.Element {
    const termType = year < 2026 ? "Q" : "S";

    return (
        <div className='term'>
            <div className='title'>
                <div className="centered">
                    <p style={{margin: 0}}>{year.toString()}</p>
                </div>
                <div className="right-aligned">
                    <p style={{margin: 0}}>{termType}</p>
                </div>
            </div>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div className='body'
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                        {classList.map((currentClass: ClassDBClass, i: number) => (
                            <Class key={i}
                                   index={i}
                                   classData={currentClass}
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
