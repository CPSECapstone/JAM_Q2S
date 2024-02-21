import React, {useState, useEffect} from "react";
import "./Class.css";
import { Draggable } from '@hello-pangea/dnd';
import { QuarterClassData } from './Grid';
import {Tooltip} from 'react-tooltip'
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;
import { ContextMenu } from './RightClickMenuStyle';
import useContextMenu from "../Hooks/useContextMenu";

interface classProps {
    data: QuarterClassData
    index: number;
}
function Class({ index, data }: classProps) {
    const { clicked, setClicked, points, setPoints } = useContextMenu();
    return (
        <div>
        <div onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
                x: e.pageX,
                y: e.pageY,
            });
            console.log("Right Click", e.pageX, e.pageY, data.id);
            }}
        >
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
        </div>
            {clicked && (
                <ContextMenu top={points.y} left={points.x}>
                    <ul>
                        <li>Edit</li>
                        <li>Copy</li>
                        <li>Delete</li>
                    </ul>
                </ContextMenu>
            )}
        </div>

    )
}

export default Class
