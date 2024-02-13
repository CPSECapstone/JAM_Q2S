import React from "react";
import "./TempClass.css"
import { Draggable} from '@hello-pangea/dnd';


type Props = {
  content: string;
  index : number;
};
function TempClass ({ content, index} : Props) : JSX.Element {
  let classInfo = JSON.parse(content)
  return (
    <Draggable draggableId={classInfo.id} index={index}>
      {(provided) => (
        <div className="tempClass"
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref = {provided.innerRef}>
          <div className="name">
            <p>{classInfo.id}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TempClass