import React, {useState} from "react";
import "./Class.css";
import { Draggable } from '@hello-pangea/dnd';
import { Tooltip } from 'react-tooltip'
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;
import EmbeddedClass from "./EmbeddedClass";
import {EmbeddedSemesterClassData} from "../Interfaces/Interfaces";

export interface QuarterClassData {
    id: string;
    displayName: string;
    units: string;
    desc: string;
    addl: string;
    gwrCourse: boolean;
    uscpCourse: boolean;
}

interface classProps {
    data: QuarterClassData
    index: number;
}

const mockData: EmbeddedSemesterClassData = {
    id: "CSC 1001",
    displayName: "Introduction to Computer Science",
    units: "4"
};

function Class({ index, data }: classProps) {
    const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState(false);

    const toggleEmbeddedClass = () => {
        setEmbeddedClassOpen(!isEmbeddedClassOpen);
    };

    return (
        <Draggable draggableId={data.id}
                   index={index}
                   key={data.id}>
            {(provided) => (
                <div className={`class ${isEmbeddedClassOpen ? "expanded" : ""}`}
                     id={data.id}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}>
                    <div className="courseCode">
                        <p>{data.id + " (" + data.units + ")"}</p>
                    </div>
                    <div className="courseName">
                        <p>{data.displayName}</p>
                    </div>
                    <div className="collapsible" onClick={toggleEmbeddedClass}>
                        <p>{isEmbeddedClassOpen ? '▲' : '▼'}</p>
                    </div>
                    <Tooltip
                        anchorSelect={"#" + data.id}
                        place="right"
                        className="classInfo"
                        delayShow={100}
                        style={{ width: "200px", zIndex: 10001 }}
                    >
                        <b>{data.id + "\n"}</b><br></br>
                        {data.displayName}<br></br>
                        <hr></hr>
                        {data.desc}
                        <hr></hr>
                        {data.addl}
                    </Tooltip>
                    {isEmbeddedClassOpen && (
                        <div className="embedded-class">
                            <EmbeddedClass data={mockData}/>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    )
}

export default Class