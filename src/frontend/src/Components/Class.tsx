import React from 'react';
import './Class.css';
import { Draggable } from '@hello-pangea/dnd';
import { StyledClass } from './StyledComponents/ClassStyles';
import ContextMenu from './ContextMenu';

import { useContextMenu } from '../Hooks/useContextMenu';

import { ClassDBClass, QuarterClassData } from '../Interfaces/Interfaces';


interface classProps {
  classData: ClassDBClass;
  index: number;
}

function Class({ index, classData }: classProps) {
  const data: QuarterClassData = classData.classData;
  const { clicked, setClicked, coords, setCoords } = useContextMenu();

  return (
      <Draggable draggableId={data.id}
                 index={index}
                 key={data.id}>
        {(provided) => (
          <div>
            <StyledClass
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
          </div>)}
      </Draggable>
  );
}

export default Class;


// {/*<div>*/
// }
// {/*    <div onContextMenu={(e) => {*/
// }
// {/*        e.preventDefault();*/
// }
// {/*        setClicked(true);*/
// }
// {/*        setPoints({*/
// }
// {/*            x: e.pageX,*/
// }
// {/*            y: e.pageY,*/
// }
// {/*        });*/
// }
// {/*        console.log("Right Click", e.pageX, e.pageY, data.id);*/
// }
// {/*    }}>*/
// }
// {/*        <Draggable draggableId={data.id}*/
// }
// {/*                   index={index}*/
// }
// {/*                   key={data.id}>*/
// }
// {/*            {(provided) => (*/
// }
// {/*              <div className="class" id={data.id}*/
// }
// {/*                   {...provided.dragHandleProps}*/
// }
// {/*                   ref = {provided.innerRef}*/
// }
// {/*                   {...provided.draggableProps} style = {{background: classData.color, ...provided.draggableProps.style}}*/
// }
// {/*              >*/
// }
// {/*                  <div className="courseCode">*/
// }
// {/*                      <p>{data.id + " (" + data.units + ")"}</p>*/
// }
// {/*                  </div>*/
// }
// {/*                  <div className="courseName">*/
// }
// {/*                      <p>{data.displayName}</p>*/
// }
// {/*                  </div>*/
// }
// {/*                  <Tooltip*/
// }
// {/*                    anchorSelect={"#" + data.id}*/
// }
// {/*                    place="right"*/
// }
// {/*                    className="classInfo"*/
// }
// {/*                    delayShow={100}>*/
// }
// {/*                      <b>{data.id + "\n"}</b><br></br>*/
// }
// {/*                      {data.displayName}<br></br>*/
// }
// {/*                      <hr></hr>*/
// }
// {/*                      {data.desc}*/
// }
// {/*                      <hr></hr>*/
// }
// {/*                      {data.addl}*/
// }
// {/*                  </Tooltip>*/
// }
// {/*              </div>*/
// }
//
// {/*            )}*/
// }
// {/*        </Draggable>*/
// }
// {/*    </div>*/
// }
// {/*    {clicked && (*/
// }
// {/*      <ContextMenu top={points.y} left={points.x}>*/
// }
// {/*          <ul>*/
// }
// {/*              <li>Edit</li>*/
// }
// {/*              <li>Copy</li>*/
// }
// {/*              <li>Delete</li>*/
// }
// {/*          </ul>*/
// }
// {/*      </ContextMenu>*/
// }
// {/*    )}*/
// }
{/*</div>*/
}
{/*>>>>>>> 26-edit-menu-for-classes-on-right-click*/
}