import React from "react";
import "./Class.css";
import { Draggable } from '@hello-pangea/dnd';

interface classProps {
    courseCode: string;
    units: string;
    courseName: string;
    index: number;
}
function Class({ index, courseCode, units, courseName }: classProps) {
    return (
      <Draggable draggableId={courseCode}
                 index={index}
                 key={courseCode}>
        {(provided) => (
          <div className="class"
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref = {provided.innerRef}>
            <div className="courseCode">
              <p>{courseCode + " (" + units + ")"}</p>
            </div>
            <div className="courseName">
              <p>{courseName}</p>
            </div>
          </div>
        )}
      </Draggable>
    )
}

export default Class