import React, {useState} from 'react';
import '../CSS/Class.css';
import {Draggable} from '@hello-pangea/dnd';
import {StyledClass} from '../StyledComponents/ClassStyles';
import {ClassDBClass, EmbeddedSemesterClassData, QuarterClassData} from '../../Interfaces/Interfaces';
import EmbeddedClass from "./EmbeddedClass";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Tooltip} from "react-tooltip";

interface classProps {
    classData: ClassDBClass;
    index: number;
    handleRightClick: (classId: string, x: number, y: number) => void;
}

const mockData: EmbeddedSemesterClassData = {
    id: "CSC 1001",
    displayName: "Introduction to Computer Science",
    units: "4"
};

const tooltipStyles = {
    'background': '#2c372d',
    'maxWidth': '300px',
    'zIndex': '999'
}

function Class({index, classData, handleRightClick}: classProps) {
    const data: QuarterClassData = classData.classData;
    const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState<boolean>(false);

    const toggleEmbeddedClass = () => {
        setEmbeddedClassOpen(!isEmbeddedClassOpen);
    };

    return (
        <Draggable draggableId={data.id}
                   index={index}
                   key={data.id}>
            {(provided) => (
                <StyledClass
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    {...provided.draggableProps} style={{...provided.draggableProps.style}}
                    color={classData.color}
                    $expanded={isEmbeddedClassOpen}
                    onContextMenu={(e) => {
                        e.preventDefault()
                        handleRightClick(data.id, e.pageX, e.pageY)
                    }}
                    onClick={toggleEmbeddedClass}>
                    <div className="infoIcon">
                        <InfoOutlinedIcon fontSize="small" id={data.id}/>
                    </div>
                    <div className='courseCode'>
                        <p>{data.id + ' (' + data.units + ')'}</p>
                    </div>
                    <div className='courseName'>
                        <p>{data.displayName}</p>
                    </div>
                    <div className="embedded-class">
                        {isEmbeddedClassOpen && (
                            <EmbeddedClass data={mockData}/>)}
                    </div>
                    <div className="collapsibleIcon">
                        {isEmbeddedClassOpen ? '▲' : '▼'}
                    </div>
                    <Tooltip
                        anchorSelect={"#" + data.id}
                        place="right"
                        className="classInfo"
                        delayShow={100}
                        opacity={100}
                        style={tooltipStyles}>
                        <b>{data.id + "\n"}</b><br></br>
                        {data.displayName}<br></br>
                        <hr></hr>
                        {data.desc}
                        <hr></hr>
                        {data.addl}
                    </Tooltip>
                </StyledClass>)}
        </Draggable>
    );
}

export default Class;
