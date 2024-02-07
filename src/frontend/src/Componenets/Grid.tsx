import React, { useState } from 'react';
import './Grid.css';
import './TestData';
import { testData } from './TestData';
import Quarter from './Quarter';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { getEventClientOffset } from 'react-dnd-html5-backend/dist/OffsetUtils';

function Grid() {
  const [quarters, setQuarters] = useState(JSON.parse(testData));
  let onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
    let start = quarters.quarters[source.droppableId];
    let finish = quarters.quarters[destination.droppableId];
    if (start === finish) {
      let newClasses = Array.from(start.classes);
      newClasses.splice(source.index, 1);
      newClasses.splice(destination.index, 0, draggableId);

      let newQuarter = {
        ...start,
        'classes': newClasses
      };
      let newState = {
        ...quarters,
        quarters: {
          ...quarters.quarters,
          [newQuarter.id]: newQuarter
        }
      };

      setQuarters(newState);
      return;
    } else {
      let startClasses = Array.from(start.classes);
      startClasses.splice(source.index, 1);
      let newStart = {
        ...start,
        classes : startClasses,
      };

      let finishClasses = Array.from(finish.classes);
      finishClasses.splice(destination.index, 0, draggableId);
      let newFinish = {
        ...finish,
        classes : finishClasses,
      };

      let newState = {
        ...quarters,
        quarters: {
          ...quarters.quarters,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      };
      setQuarters(newState);

    }

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='grid'>
        {quarters.quarterOrder.map((quarterId: string) => {
          let quarter = quarters.quarters[quarterId];
          let classes = quarter.classes.map((classId: string) => JSON.stringify(quarters.classes[classId]));
          return <Quarter key={quarterId} year={quarter.title} classList={classes} id={quarter.id}></Quarter>;
        })}
      </div>
    </DragDropContext>
  );
  // <div className = "grid" >
  //   <div className="year">
  //     <Quarter year={"Fall 2027"}></Quarter>
  //     <Quarter year={"Winter 2027"}></Quarter>
  //     <Quarter year={"Spring 2027"}></Quarter>
  //   </div>
  //   <div className="year">
  //     <Quarter year={"Fall 2028"}></Quarter>
  //     <Quarter year={"Winter 2028"}></Quarter>
  //     <Quarter year={"Spring 2028"}></Quarter>
  //   </div>
  //   <div className="year">
  //     <Quarter year={"Fall 2029"}></Quarter>
  //     <Quarter year={"Winter 2029"}></Quarter>
  //     <Quarter year={"Spring 2029"}></Quarter>
  //   </div>
  //   <div className="year">
  //     <Quarter year={"Fall 2030"}></Quarter>
  //     <Quarter year={"Winter 2030"}></Quarter>
  //     <Quarter year={"Spring 2030"}></Quarter>
  //   </div>
  //</div>
}

export default Grid;