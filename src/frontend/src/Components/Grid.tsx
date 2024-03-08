import React, { useContext, useEffect, useState } from 'react';
import './Grid.css';
import Term from './Term';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import axios, { AxiosResponse } from 'axios';
import { ClassDBClass, FlowchartClass, QuarterClassData, TermData } from '../Interfaces/Interfaces';
import { FlowchartContext } from '../Context/FlowchartProvider';

function Grid() {
  const [classDB, setClassDB] = useState<{ [ClassId: string]: ClassDBClass }>({});
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const { flowchart, setFlowchart } = useContext(FlowchartContext);
  let onDragEnd = (result: DropResult): void => {
    if (!flowchart) {
      return;
    }


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
    const newFlowchartClass : FlowchartClass = {
      id : draggableId,
      color : classDB[draggableId].color
    }
    if (start === finish) {
      let newClasses: FlowchartClass[] = Array.from(start.classes);
      newClasses.splice(source.index, 1);
      newClasses.splice(destination.index, 0, newFlowchartClass);
      start.classes = newClasses;
    } else {
      let startClasses: FlowchartClass[] = Array.from(start.classes);
      startClasses.splice(source.index, 1);
      let finishClasses: FlowchartClass[] = Array.from(finish.classes);
      finishClasses.splice(destination.index, 0, newFlowchartClass);
      start.classes = startClasses;
      finish.classes = finishClasses;
    }

    setFlowchart(updatedTerms);

  };

  const calculateTotalUnits = () => {
    let total = 0;
    if (flowchart) {
      flowchart.forEach((term) => {
        total += term.totalUnits || 0;
      });
    }
    return total;
  };

  useEffect((): void => {
    const fetchQuarterClassData = async () => {
      if (!flowchart) {
        return null;
      }
      try {
        const termClassData: { [ClassId: string]: ClassDBClass } = {};
        const promises = flowchart.map(async (term) => {
          let termTotalUnits = 0;
          await Promise.all(
            term.classes.map(async (flowchartClass: FlowchartClass) => {
              const response: AxiosResponse<QuarterClassData> =
                await axios.get('http://localhost:8080/get/QuarterClass/' + flowchartClass.id);
              termTotalUnits += Number(response.data.units);
              termClassData[response.data.id] = {
                classData: response.data,
                color: flowchartClass.color
              };
            })
          );
          term.totalUnits = termTotalUnits;
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
  }, [flowchart]);


  return (
    <div className='grid'>
      <DragDropContext onDragEnd={onDragEnd}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          flowchart ? (
            flowchart.map((term: TermData, index: number) => {
              const classes: ClassDBClass[] =
                term.classes.map((flowchartClass: FlowchartClass) => classDB[flowchartClass.id]);
              return (
                <div className='term' key={term.termName}>
                  <Term year={term.termName} classList={term.classes.map((flowchartClass: FlowchartClass) => classDB[flowchartClass.id])} totalUnits={term.totalUnits || 0} id={term.termName} />
                  {index === flowchart.length - 1 && (
                      <div className="total-units">
                        Total Units: {calculateTotalUnits()}
                      </div>
                  )}
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