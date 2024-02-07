import React from "react";
import "./Class.css";

interface classProps {
    courseCode: string;
    units: string;
    courseName: string;
}
function Class({ courseCode, units, courseName }: classProps) {
    return (
        <div className="box">
            <div className="courseCode">
                <p>{courseCode + " (" + units + ")"}</p>
            </div>
            <div className="courseName">
                <p>{courseName}</p>
            </div>
        </div>
    )
}

export default Class