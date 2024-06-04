import React from "react";
import "../CSS/EmbeddedClass.css";

import {EmbeddedSemesterClassData} from "../../Interfaces/Interfaces";
import {StyledClass, StyledEmbeddedClass} from "../StyledComponents/ClassStyles";

interface classProps {
    data: EmbeddedSemesterClassData
    taken: boolean;
    color: string;
}

function EmbeddedClass({ data, taken, color }: classProps) {
    return (
        <StyledEmbeddedClass $taken={taken} color={color}>
            <div className="embeddedCourseCode">
              <p>{data.id + " (" + data.units + ")"}</p>
            </div>
            <div className="embeddedCourseName">
              <p>{data.displayName}</p>
            </div>
        </StyledEmbeddedClass>
    )
}

export default EmbeddedClass