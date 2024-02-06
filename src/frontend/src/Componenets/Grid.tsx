import React from 'react';
import Term from './Term';
import "./Grid.css"

interface ClassData {
    courseCode: string;
    units: string;
    courseName: string;
}
interface TermData {
    termName: string;
    classes: ClassData[];
}
interface GridProps {
    termData: TermData[];
}
function Grid({ termData }: GridProps) {
    return (
        <div className="grid">
            {termData.map((term, index) => (
                <div className="term" key={index}>
                    <Term termData={term}></Term>
                </div>
            ))}
        </div>
    );
}
export default Grid