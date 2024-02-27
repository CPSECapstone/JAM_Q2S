import React from "react";
import "./Class.css";
import { Draggable } from '@hello-pangea/dnd';
import {Tooltip} from 'react-tooltip'
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;
import { ClassDBClass, QuarterClassData } from '../Interfaces/Interfaces';

interface classProps {
    classData: ClassDBClass
    index: number;
}
function Class({ index, classData }: classProps) {
    const data : QuarterClassData = classData.classData
    return (
      <Draggable draggableId={data.id}
                 index={index}
                 key={data.id}>
        {(provided) => (
          <div className="class" id={data.id}
               {...provided.dragHandleProps}
               ref = {provided.innerRef}
               {...provided.draggableProps} style = {{background: classData.color, ...provided.draggableProps.style}}
                >
            <div className="courseCode">
              <p>{data.id + " (" + data.units + ")"}</p>
            </div>
            <div className="courseName">
              <p>{data.displayName}</p>
            </div>
            <Tooltip
              anchorSelect={"#" + data.id}
              place="right"
              className="classInfo"
            delayShow={100}>
              <b>{data.id + "\n"}</b><br></br>
              {data.displayName}<br></br>
              <hr></hr>
              {data.desc}
              <hr></hr>
              {data.addl}
            </Tooltip>
          </div>

        )}
      </Draggable>
    )
}

export default Class