import React from 'react';
import './Term.css';
import { Droppable } from '@hello-pangea/dnd';
import Class from './Class';
import { QuarterClassData } from './Class'

type Props = {
  year: string;
  classList: QuarterClassData[];
  id : string;
};

function Term({ year, classList, id }: Props): JSX.Element {

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
            {classList.map((currentClass: QuarterClassData, i: number) => {
              return <Class key={i}
                            index={i}
                            data={currentClass} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Term;
