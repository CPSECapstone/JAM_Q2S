import React, {useContext, useEffect, useState} from 'react';
import {StyledContextMenu} from '../StyledComponents/RightClickMenuStyle';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {ContextMenuData, FlowchartClass, TermData} from '../../Interfaces/Interfaces';
import {FlowchartContext} from '../../Context/FlowchartProvider';

interface ClassProps {
    top: number;
    left: number;
    classData: ContextMenuData;
}

const ContextMenu = ({top, left, classData}: ClassProps) => {
    const {flowchart, setFlowchart} = useContext(FlowchartContext);
    const [classTaken, setClassTaken] = useState<boolean>(false);

    useEffect(() => {
        if (!flowchart || !classData.classUUID) {
            return;
        }
        const term: TermData | undefined = flowchart.termData.find((term: TermData): boolean => term.tIndex.toString() === classData.termId);
        if (!term) {
            return;
        }
        const classIndex: number = term.courses.findIndex((termClass: FlowchartClass): boolean => termClass.uuid === classData.classUUID);
        if (classIndex === -1) {
            return;
        }
        const selectedClass: FlowchartClass = term.courses[classIndex];
        setClassTaken(selectedClass.taken);
    }, [classData, flowchart]);

    const updateFlowchart = (callback: (term: TermData, classIndex: number, selectedClass: FlowchartClass) => void) => {
        if (!flowchart || !classData.classUUID) {
            return;
        }
        const updatedFlowchart: TermData[] = [...flowchart.termData];
        const termIndex: number = updatedFlowchart.findIndex((term: TermData) => term.tIndex.toString() === classData.termId);
        if (termIndex === -1) {
            return;
        }
        const term: TermData = updatedFlowchart[termIndex];
        const classIndex: number = term.courses.findIndex((termClass: FlowchartClass) => termClass.uuid === classData.classUUID);
        if (classIndex === -1) {
            return;
        }
        const selectedClass: FlowchartClass = term.courses[classIndex];
        callback(term, classIndex, selectedClass);
        setFlowchart({...flowchart, termData: updatedFlowchart});
    };

    const handleDelete = () => {
        updateFlowchart((term, classIndex) => {
            term.courses.splice(classIndex, 1);
        });
    };

    const handleMarkTaken = () => {
        updateFlowchart((term, classIndex, selectedClass) => {
            selectedClass.taken = !selectedClass.taken;
        });
    };

    return (
        <StyledContextMenu $top={top} $left={left}>
            <Paper sx={{width: 320, maxWidth: '100%'}}>
                <MenuList>
                    <MenuItem onClick={() => handleMarkTaken()}>
                        <ListItemIcon>
                            <CheckIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Mark {classTaken ? "Not Taken" : "Taken"}</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ColorLensIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Change Color</ListItemText>
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={() => handleDelete()}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </StyledContextMenu>
    );
};

export default ContextMenu;
