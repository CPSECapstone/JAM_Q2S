import React from "react";
import "./CSS/Class.css";
import {Tooltip} from 'react-tooltip'
import { Simulate } from 'react-dom/test-utils';
import click = Simulate.click;
import {EmbeddedSemesterClassData} from "../Interfaces/Interfaces";

interface classProps {
    data: EmbeddedSemesterClassData
}

function EmbeddedClass({ data }: classProps) {
    return (
        <div className="embeddedClass" id={data.id}>
            <div className="courseCode">
              <p>{data.id + " (" + data.units + ")"}</p>
            </div>
            <div className="courseName">
              <p>{data.displayName}</p>
            </div>
        </div>
    )
}

export default EmbeddedClass