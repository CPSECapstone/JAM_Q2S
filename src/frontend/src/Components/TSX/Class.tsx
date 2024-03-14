import React, { useState } from 'react';
import '../CSS/Class.css';
import { Draggable } from '@hello-pangea/dnd';
import { StyledClass } from '../StyledComponents/ClassStyles';
import {ClassDBClass, EmbeddedSemesterClassData, QuarterClassData} from '../../Interfaces/Interfaces';
import EmbeddedClass from "../EmbeddedClass";



interface classProps {
  classData: ClassDBClass;
  index: number;
  handleRightClick: (classId: string, x: number, y: number) => void;
}

const mockData: EmbeddedSemesterClassData = {
  id: "CSC 1001",
  displayName: "Introduction to Computer Science",
  units: "4"
};


function Class({ index, classData, handleRightClick }: classProps) {
  const data: QuarterClassData = classData.classData;
  const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState<boolean>(false);

  const toggleEmbeddedClass = () => {
    setEmbeddedClassOpen(!isEmbeddedClassOpen);
  };

  return (
      <Draggable draggableId={data.id}
                 index={index}
                 key={data.id}>
        {(provided) => (
            <StyledClass
              id={data.id}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              {...provided.draggableProps} style={{ ...provided.draggableProps.style }}
              color={classData.color}
              $expanded = {isEmbeddedClassOpen}
              onContextMenu={(e) => {
                e.preventDefault()
                handleRightClick(data.id, e.pageX, e.pageY)
              }}
              onClick={toggleEmbeddedClass}>

              <div className='courseCode'>
                <p>{data.id + ' (' + data.units + ')'}</p>
              </div>
              <div className='courseName'>
                <p>{data.displayName}</p>
              </div>
              <div className="collapsible">
                <p>{isEmbeddedClassOpen ? '▲' : '▼'}</p>
              </div>
              {isEmbeddedClassOpen && (
                  <div className="embedded-class">
                    <EmbeddedClass data={mockData}/>
                  </div>
              )}
            </StyledClass>)}
      </Draggable>
  );
}

export default Class;
