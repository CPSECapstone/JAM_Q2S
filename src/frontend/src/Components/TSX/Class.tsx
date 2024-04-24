import React, {useEffect, useState} from 'react';
import '../CSS/Class.css';
import {Draggable} from '@hello-pangea/dnd';
import {StyledClass} from '../StyledComponents/ClassStyles';
import {
    ClassDBClass,
    ClassDisplayInformation,
    EmbeddedSemesterClassData,
    FlowchartClass,
    QuarterClassData
} from '../../Interfaces/Interfaces';
import EmbeddedClass from "./EmbeddedClass";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Tooltip} from "react-tooltip";

interface classProps {
    classData: FlowchartClass;
    index: number;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    term: string;
    quarterClassCache: { [classId: string]: QuarterClassData };
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
    'zIndex': '999'
}

function Class({index, classData, handleRightClick, term, quarterClassCache}: classProps) {
    const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState<boolean>(false);
    const [classDisplayInfo, setClassDisplayInfo] = useState<ClassDisplayInformation>({
        addl: "",
        color: "",
        desc: "",
        displayName: "",
        gwrCourse: false,
        id: "",
        units: "",
        uscpCourse: false
    })
    const toggleEmbeddedClass = () => {
        setEmbeddedClassOpen(!isEmbeddedClassOpen);
    };

    useEffect(() => {
        if(classData.id){
            let cachedInfo: QuarterClassData = quarterClassCache[classData.id];
            let classInfo: ClassDisplayInformation = {
                ...cachedInfo,
                color: classData.color,
            }
            setClassDisplayInfo(classInfo);
        }
        else{
            let classInfo: ClassDisplayInformation = {
                addl: "",
                color: classData.color,
                desc: classData.customDesc ? classData.customDesc : "",
                displayName: classData.customDisplayName ? classData.customDisplayName : "",
                gwrCourse: false,
                id: classData.customId ? classData.customId : "",
                units: classData.customUnits ? classData.customUnits : "",
                uscpCourse: false
            }
            setClassDisplayInfo(classInfo);
        }
    }, []);

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
                        e.preventDefault()
                        handleRightClick(term, classData.uuid, e.pageX, e.pageY)
                    }}
                    onClick={toggleEmbeddedClass}>
                    <div className="infoIcon">
                        <InfoOutlinedIcon fontSize="small" id={"id" + classData.uuid}/>
                    </div>
                    <div className='courseCode'>
                        <p>{classDisplayInfo.id + ' (' + classDisplayInfo.units + ')'}</p>
                    </div>
                    <div className='courseName'>
                        <p>{classDisplayInfo.displayName}</p>
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
                        <b>{classDisplayInfo.id + "\n"}</b><br></br>
                        {classDisplayInfo.displayName}<br></br>
                        <hr></hr>
                        {classDisplayInfo.desc}
                        <hr></hr>
                        {classDisplayInfo.addl}
                    </Tooltip>
                </StyledClass>)}
        </Draggable>
    );
}

export default Class;
