import React, {useState} from 'react';
import '../CSS/Class.css';
import {Draggable} from '@hello-pangea/dnd';
import {StyledClass} from '../StyledComponents/ClassStyles';
import {
    ClassDisplayInformation,
    EmbeddedSemesterClassData,
} from '../../Interfaces/Interfaces';
import EmbeddedClass from "./EmbeddedClass";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Tooltip} from "react-tooltip";

interface classProps {
    classData: ClassDisplayInformation;
    index: number;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    term: string;
}

const mockData: EmbeddedSemesterClassData[] = [
    {
        id: "CSC 2002",
        displayName: "Some Other Semester Class",
        units: "4"
    }, {
        id: "CSC 1001",
        displayName: "Introduction to Computer Science",
        units: "4"
    }];

const tooltipStyles = {
    'background': '#2c372d',
    'maxWidth': '300px',
    'zIndex': '115'
}

function Class({index, classData, handleRightClick, term}: classProps) {
    const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState<boolean>(false);
    const toggleEmbeddedClass = () => {
        setEmbeddedClassOpen(!isEmbeddedClassOpen);
    };

    return (
        <Draggable draggableId={classData.uuid}
                   index={index}
                   key={classData.uuid}>
            {(provided) => (
                <StyledClass
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    {...provided.draggableProps} style={{...provided.draggableProps.style}}
                    color={classData.color}
                    $expanded={isEmbeddedClassOpen}
                    $taken={classData.taken}
                    onContextMenu={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleRightClick(term, classData.uuid, e.pageX, e.pageY)
                    }}
                    onClick={toggleEmbeddedClass}>
                    <div className="infoIcon">
                        <InfoOutlinedIcon fontSize="small" id={"id" + classData.uuid}/>
                    </div>
                    <div className='courseCode'>
                        <p>{classData.id + ' (' + classData.units + ')'}</p>
                    </div>
                    <div className='courseName'>
                        <p>{classData.displayName}</p>
                    </div>
                    <div className="embeddedClasses">
                        {isEmbeddedClassOpen && mockData.map((data, index) => (
                            <EmbeddedClass key={index} data={data}/>
                        ))}
                    </div>
                    <div className="collapsibleIcon">
                        {isEmbeddedClassOpen ? '▲' : '▼'}
                    </div>
                    <Tooltip
                        anchorSelect={"#id" + classData.uuid}
                        place="right"
                        className="classInfo"
                        delayShow={100}
                        opacity={100}
                        style={tooltipStyles}>
                        <b>{classData.id + "\n"}</b><br></br>
                        {classData.displayName}<br></br>
                        <hr></hr>
                        {classData.desc}
                        <hr></hr>
                        {classData.addl}
                    </Tooltip>
                </StyledClass>)}
        </Draggable>
    );
}

export default Class;
