import React from "react";
import "./Term.css";
import Class from "./Class";

interface ClassData {
    courseCode: string;
    units: string;
    courseName: string;
}
interface TermData {
    termName: string;
    classes: ClassData[];
}
interface TermProps {
    termData: TermData;
}
function Term ({ termData } : TermProps) : JSX.Element {
    let clickEvent = () => {
        alert("you clicked on " + termData.termName);
    };
    return (
        <div className="header" onClick={() => clickEvent()}>
            <div className="title">
                <p>{termData.termName}</p>
            </div>
            <div className="body">
                {termData.classes.map((classData, index) => (
                    <Class
                        key={index}
                        courseCode={classData.courseCode}
                        units={classData.units}
                        courseName={classData.courseName}
                    />
                ))}
            </div>
        </div>
    );
}

export default Term