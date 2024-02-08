import React from 'react';
import './Term.css';
import { Droppable } from '@hello-pangea/dnd';
import Class from './Class';

interface ClassData {
  courseCode: string;
  units: string;
  courseName: string;
}

type Props = {
  year: string;
  classList: ClassData[];
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
            {classList.map((currentClass: ClassData, i: number) => {
              return <Class key={i}
                            index={i}
                            courseCode={currentClass.courseCode}
                            units={currentClass.units}
                            courseName={currentClass.courseName} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Term;
