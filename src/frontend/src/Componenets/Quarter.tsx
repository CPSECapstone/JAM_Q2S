import React from 'react';
import './Quarter.css';
import TempClass from './TempClass';
import { Droppable } from '@hello-pangea/dnd';

type Props = {
  year: string;
  classList: string[];
  id : string;
};

function Quarter({ year, classList, id }: Props): JSX.Element {

  return (
    <div className='quarter'>
      <div className='title'>
        <p>{year}</p>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className='body'
               ref={provided.innerRef}
               {...provided.droppableProps}>
            {classList.map((tempClass: string, index: number) => {
              let id = JSON.parse(tempClass).id;
              return <TempClass index={index} key={id} content={tempClass} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Quarter;
