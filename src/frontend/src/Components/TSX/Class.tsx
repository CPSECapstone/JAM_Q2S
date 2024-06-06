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
import axios from "axios";

interface classProps {
    classData: ClassDisplayInformation;
    index: number;
    handleRightClick: (termId: string, classId: string, x: number, y: number) => void;
    term: string;
}

const tooltipStyles = {
    'background': '#2c372d',
    'maxWidth': '300px',
    'zIndex': '999'
}

function Class({index, classData, handleRightClick, term}: classProps) {
    const [isEmbeddedClassOpen, setEmbeddedClassOpen] = useState<boolean>(false);
    const [embeddedClassData, setEmbeddedClassData] = useState<EmbeddedSemesterClassData[]>([]);

    const toggleEmbeddedClass = async () => {
        if (!isEmbeddedClassOpen) {
            try {
                const response = await axios.get(`/getCourseMapping?courseID=${classData.id}`);
                const mappedCourseIds = response.data.mapping;

                const fetchCourseDetails = async (courseId: string) => {
                    const courseResponse = await axios.get(`/get/SemesterClass/${courseId}`);
                    return courseResponse.data;
                };

                const mappedCoursesPromises = mappedCourseIds.map((courseId: string) => fetchCourseDetails(courseId));
                const mappedCourses = await Promise.all(mappedCoursesPromises);

                setEmbeddedClassData(mappedCourses);
            } catch (error) {
                console.error("Error fetching embedded class data", error);
            }
        }
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
                        {isEmbeddedClassOpen && embeddedClassData.map((data, index) => (
                            <EmbeddedClass key={index} data={data} taken={classData.taken} color={classData.color}/>
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
