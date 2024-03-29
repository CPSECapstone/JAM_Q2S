import React from 'react';
import '../CSS/Term.css';
import { Droppable } from '@hello-pangea/dnd';
import Class from './Class';
import { ClassDBClass } from '../../Interfaces/Interfaces';

type Props = {
  year: string;
  classList: ClassDBClass[];
  id : string;
  handleRightClick: (classId: string, x: number, y: number) => void;
  totalUnits: number;
};
function Term({ year, classList, id, handleRightClick, totalUnits }: Props): JSX.Element {
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
                    {classList.map((currentClass: ClassDBClass, i: number) => (
                        <Class key={i}
                               index={i}
                               classData={currentClass}
                               handleRightClick={handleRightClick}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
      <div className="termTotalUnits" style={{ textAlign: 'center', margin: 0 }}>
        <p style={{ margin: 0 }}>{totalUnits}</p>
      </div>
    </div>
  );
}

export default Term;
