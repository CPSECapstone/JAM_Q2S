import React from "react";
import "../CSS/EmbeddedClass.css";

import {EmbeddedSemesterClassData} from "../../Interfaces/Interfaces";

interface classProps {
    data: EmbeddedSemesterClassData
}

function EmbeddedClass({ data }: classProps) {
    return (
        <div className="embeddedClass" id={data.id}>
            <div className="embeddedCourseCode">
              <p>{data.id + " (" + data.units + ")"}</p>
            </div>
            <div className="embeddedCourseName">
              <p>{data.displayName}</p>
            </div>
        </div>
    )
}

export default EmbeddedClass