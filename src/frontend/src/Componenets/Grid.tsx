import React, { useState } from 'react';
import './Grid.css';
import './TestData';
import { testData } from './TestData';
import Quarter from './Quarter';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';

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
    let quarter = quarters.quarters[source.droppableId];
    let newClasses = Array.from(quarter.classes);
    newClasses.splice(source.index, 1);
    newClasses.splice(destination.index, 0, draggableId);

    let newQuarter = {
      ...quarter,
      'classes' : newClasses
    }

    let newState = {
      ...quarters,
      quarters: {
        ...quarters.quarter,
        [newQuarter.id] : newQuarter
      }
    }
    setQuarters(newState);
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