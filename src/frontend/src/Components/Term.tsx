import React from 'react';
import './Term.css';
import { Droppable } from '@hello-pangea/dnd';
import Class from './Class';
import { QuarterClassData } from './Class'
import {ClassDBClass} from "../Interfaces/Interfaces";

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
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className='body'
               ref={provided.innerRef}
               {...provided.droppableProps}>
            {classList.map((currentClass: ClassDBClass, i: number) => {
              return <Class key={i}
                            index={i}
                            data={currentClass.classData} />;
            })}
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
