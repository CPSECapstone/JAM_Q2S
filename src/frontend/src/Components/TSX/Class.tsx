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
}

function Class({ index, classData }: classProps) {
  const data: QuarterClassData = classData.classData;
  const { clicked, setClicked, coords, setCoords } = useContextMenu();
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
                setClicked(true)
                setCoords({ x: e.pageX, y: e.pageY })
              }}>

              {clicked && (
                <ContextMenu top={coords.y} left={coords.x} ></ContextMenu>
              )}
              <div className='courseCode'>
                <p>{data.id + ' (' + data.units + ')'}</p>
              </div>
              <div className='courseName'>
                <p>{data.displayName}</p>
              </div>
            </StyledClass>
            <ClassInfoDialog
              classData={data}
              open={open}
              onClose={handleClose}
            />
          </div>)}
      </Draggable>
  );
}

export default Class;
