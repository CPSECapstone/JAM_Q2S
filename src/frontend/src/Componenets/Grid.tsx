import React, { useEffect, useState } from 'react';
import './Grid.css';
import Term from './Term';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios, { AxiosResponse } from 'axios';
import { exampleTermData } from '../JSON/TermData';


export interface QuarterClassData {
  id: string;
  displayName: string;
  units: string;
  desc: string;
  addl: string;
  gwrCourse: boolean;
  uscpCourse: boolean;
}

interface TermData {
  termName: string;
  classes: string[];
}

interface Props {
  termData: TermData[];
}

function Grid({ termData }: Props) {
  const [terms, setTerms] = useState<TermData[]>(exampleTermData)
  const [classDB, setClassDB] = useState<{ [classId: string]: QuarterClassData }>({});
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  let onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }
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

    setTerms(updatedTerms);
  };

    // Fetch quarter class data for each term
    useEffect(() => {

      const fetchQuarterClassData = async () => {
        try {
          const termClassData: { [ClassId: string]: QuarterClassData } = {};

          const promises = termData.map(async (term) => {
            await Promise.all(
              term.classes.map(async (classId: string) => {
                const response: AxiosResponse<QuarterClassData> = await axios.get('http://localhost:8080/get/QuarterClass/' + classId);
                termClassData[response.data.id] = response.data;
              })
            );
          });

          await Promise.all(promises);
          setClassDB(termClassData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching QuarterClass:', error);
        }
      };
      if (termData.length > 0) {
        fetchQuarterClassData();
      }
    }, []); // Ensure useEffect runs whenever termData changes


    return (
      <div className='grid'>
        <DragDropContext onDragEnd={onDragEnd}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            terms.map((term: TermData) => {
              const classes = term.classes.map((classId: string) => classDB[classId]);
              return (
                <div className='term' key={term.termName}>
                  <Term year={term.termName} classList={classes} id={term.termName}></Term>
                </div>
              );
            })
          )}
        </DragDropContext>
      </div>

    );
}

export default Grid;