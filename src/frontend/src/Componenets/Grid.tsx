import React, { useState } from 'react';
import './Grid.css';
import { exampleTermData } from '../JSON/TermData';
import { dummyClassDatabase } from '../JSON/DummyClassDatabase';
import Term from './Term';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';


interface ClassData {
  courseCode: string;
  units: string;
  courseName: string;
}

interface TermData {
  termName: string;
  classes: string[];
}

interface Props {
  termData: TermData[];
}

function Grid({ termData }: Props) {
  const [terms, setTerms] = useState(exampleTermData);
  let classDB = JSON.parse(dummyClassDatabase);
  let onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    // Create a shallow copy of the termData array
    let updatedTerms = [...termData];

    // Find the source and destination terms
    let start = updatedTerms.find((term) => term.termName === source.droppableId);
    let finish = updatedTerms.find((term) => term.termName === destination.droppableId);
    if (!start || !finish) return;

    if (start === finish) {
      // If the source and destination terms are the same
      let newClasses = Array.from(start.classes);
      newClasses.splice(source.index, 1);
      newClasses.splice(destination.index, 0, draggableId);
      // Update the classes array of the source term
      start.classes = newClasses;
    } else {
      // If the source and destination terms are different
      let startClasses = Array.from(start.classes);
      startClasses.splice(source.index, 1);
      let finishClasses = Array.from(finish.classes);
      finishClasses.splice(destination.index, 0, draggableId);
      // Update the classes arrays of the source and destination terms
      start.classes = startClasses;
      finish.classes = finishClasses;
    }

    // Set the state with the updated terms array
    console.log(updatedTerms)
    setTerms(updatedTerms);


  // if (start === finish) {
    //   let newClasses = Array.from(start.classes);
    //   newClasses.splice(source.index, 1);
    //   newClasses.splice(destination.index, 0, draggableId);
    //
    //   let newQuarter = {
    //     ...start,
    //     'classes': newClasses
    //   };
    //   let newState = {
    //     ...quarters,
    //     quarters: {
    //       ...quarters.quarters,
    //       [newQuarter.id]: newQuarter
    //     }
    //   };
    //
    //   setQuarters(newState);
    //   return;
    // } else {
    //   let startClasses = Array.from(start.classes);
    //   startClasses.splice(source.index, 1);
    //   let newStart = {
    //     ...start,
    //     classes: startClasses,
    //   };
    //
    //   let finishClasses = Array.from(finish.classes);
    //   finishClasses.splice(destination.index, 0, draggableId);
    //   let newFinish = {
    //     ...finish,
    //     classes: finishClasses,
    //   };
    //
    //   let newState = {
    //     ...quarters,
    //     quarters: {
    //       ...quarters.quarters,
    //       [newStart.id]: newStart,
    //       [newFinish.id]: newFinish
    //     }
    //   };
    //   setQuarters(newState);
    //
    // }

  };

  return (
    <div className='grid'>
      <DragDropContext onDragEnd={onDragEnd}>
        {terms.map((term: TermData) => {
          let classes: ClassData[] = term.classes.map((classId: string) => classDB[classId]);
          return <div className='term' key={term.termName}>
            <Term year={term.termName} classList={classes} id={term.termName}></Term>
          </div>;

        })}
      </DragDropContext>
    </div>
  );

}

export default Grid;