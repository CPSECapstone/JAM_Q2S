import React from "react";
import "./Class.css";
import { Draggable } from '@hello-pangea/dnd';
import { QuarterClassData } from './Grid';
import {Tooltip} from 'react-tooltip'
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;

interface classProps {
    data: QuarterClassData
    index: number;
}
function Class({ index, data }: classProps) {
    return (
      <Draggable draggableId={data.id}
                 index={index}
                 key={data.id}>
        {(provided) => (
          <div className="class" id={data.id}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref = {provided.innerRef}>
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