import React from 'react';
import '../CSS/Term.css';
import {Droppable} from '@hello-pangea/dnd';
import Class from './Class';
import {ClassDisplayInformation, FlowchartClass} from '../../Interfaces/Interfaces';

type Props = {
    year: string;
    classList: FlowchartClass[];
    id: string;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    totalUnits: number;
    flowchartClassCache: { [classId: string]: ClassDisplayInformation };
};

function Term({year, classList, id, handleRightClick, totalUnits, flowchartClassCache}: Props): JSX.Element {
    return (
        <div className='term'>
            <div className='title'>
                <p>{year}</p>
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
            <div className="termTotalUnits" style={{textAlign: 'center', margin: 0}}>
                <p style={{margin: 0}}>{totalUnits}</p>
            </div>
        </div>
    );
}

export default Term;
