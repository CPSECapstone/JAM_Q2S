import React, { useContext, useEffect, useState } from 'react';
import './Grid.css';
import Term from './Term';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios, { AxiosResponse } from 'axios';
import { QuarterClassData, TermData } from '../Interfaces/Interfaces';
import { FlowchartContext } from '../Context/FlowchartProvider';

function Grid() {
  const [classDB, setClassDB] = useState<{ [classId: string]: QuarterClassData }>({});
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const { flowchart, setFlowchart } = useContext(FlowchartContext);
  let onDragEnd = (result: DropResult): void => {
    if (flowchart) {
      const { destination, source, draggableId } = result;
      if (!destination) {
        return;
      }
      if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
        return;
      }
      let updatedTerms = [...flowchart];

      // Find the source and destination terms
      let start: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === source.droppableId);
      let finish: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === destination.droppableId);
      if (!start || !finish) return;
      if (start === finish) {
        let newClasses: string[] = Array.from(start.classes);
        newClasses.splice(source.index, 1);
        newClasses.splice(destination.index, 0, draggableId);
        start.classes = newClasses;
      } else {
        let startClasses: string[] = Array.from(start.classes);
        startClasses.splice(source.index, 1);
        let finishClasses: string[] = Array.from(finish.classes);
        finishClasses.splice(destination.index, 0, draggableId);
        start.classes = startClasses;
        finish.classes = finishClasses;
      }

      setFlowchart(updatedTerms);
    }
  };

  useEffect((): void => {
    const fetchQuarterClassData = async () => {
      if (!flowchart) {
        return null;
      }
      try {
        const termClassData: { [ClassId: string]: QuarterClassData } = {};
        const promises = flowchart.map(async (term) => {
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
    if (flowchart && flowchart.length > 0) {
      fetchQuarterClassData();
    }
  }, []);


  return (
    <div className='grid'>
      <DragDropContext onDragEnd={onDragEnd}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          flowchart ? (
            flowchart.map((term: TermData) => {
              const classes: QuarterClassData[] = term.classes.map((classId: string) => classDB[classId]);
              return (
                <div className='term' key={term.termName}>
                  <Term year={term.termName} classList={classes} id={term.termName}></Term>
                </div>
              );
            })
          ) : (
            <p>No Flowchart Selected</p>
          )
        )}
      </DragDropContext>

    </div>

  );
}

export default Grid;