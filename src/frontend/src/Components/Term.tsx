import React from 'react';
import './Term.css';
import { Droppable } from '@hello-pangea/dnd';
import Class from './Class';
import { ClassDBClass, QuarterClassData } from '../Interfaces/Interfaces';

type Props = {
  year: string;
  classList: ClassDBClass[];
  id : string;
  totalUnits: number;
};

function Term({ year, classList, id, totalUnits }: Props): JSX.Element {
  return (
    <div className='term'>
      <div className='title'>
        <p>{year}</p>
          <p>{ totalUnits}</p>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className='body'
               ref={provided.innerRef}
               {...provided.droppableProps}>
            {classList.map((currentClass: ClassDBClass, i: number) => {
              return <Class key={i}
                            index={i}
                            classData={currentClass} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Term;
