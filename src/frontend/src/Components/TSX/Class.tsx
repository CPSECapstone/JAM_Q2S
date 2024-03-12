import React, { useState } from 'react';
import '../CSS/Class.css';
import { Draggable } from '@hello-pangea/dnd';
import { StyledClass } from '../StyledComponents/ClassStyles';
import ContextMenu from './ContextMenu';

import { useContextMenu } from '../../Hooks/useContextMenu';

import { ClassDBClass, QuarterClassData } from '../../Interfaces/Interfaces';
import ClassInfoDialog from './ClassInfoDialog';


interface classProps {
  classData: ClassDBClass;
  index: number;
  handleRightClick: (classId: string, x: number, y: number) => void;
}

function Class({ index, classData, handleRightClick }: classProps) {
  const data: QuarterClassData = classData.classData;
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
      <Draggable draggableId={data.id}
                 index={index}
                 key={data.id}>
        {(provided) => (
          <div>
            <StyledClass
              onClick={() => handleClickOpen()}
              id={data.id}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              {...provided.draggableProps} style={{ ...provided.draggableProps.style }}
              $color={classData.color}
              onContextMenu={(e) => {
                e.preventDefault()
                handleRightClick(data.id, e.pageX, e.pageY)
              }}>

              <div className='courseCode'>
                <p>{data.id + ' (' + data.units + ')'}</p>
              </div>
              <div className='courseName'>
                <p>{data.displayName}</p>
              </div>
            </StyledClass>

          </div>)}
      </Draggable>
  );
}

export default Class;
