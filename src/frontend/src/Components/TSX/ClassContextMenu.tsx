import React, {useState} from 'react';
import {StyledClassContextMenu} from '../StyledComponents/RightClickMenuStyle';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {
    ClassDisplayInformation,
    ContextMenuData,
    FlowchartClass,
    FlowchartMetaData,
    TermData
} from '../../Interfaces/Interfaces';

interface ClassProps {
    top: number;
    left: number;
    classData: ContextMenuData;
    flowchartClassCache: {
        [classUUID: string]: ClassDisplayInformation
    }
    selectedUserFlowchart: FlowchartMetaData;
    setSelectedUserFlowchart: (updated: FlowchartMetaData) => void;
}

const ClassContextMenu = ({top, left, classData, flowchartClassCache, selectedUserFlowchart, setSelectedUserFlowchart}: ClassProps) => {
    const [classTaken, setClassTaken] = useState<boolean>(false);

    const handleDelete = () => {
        if (!classData || !selectedUserFlowchart) {
            return;
        }
        let updatedTerms: TermData[] = JSON.parse(selectedUserFlowchart.termData)
        let term: TermData | undefined = updatedTerms.find((term: TermData): boolean => term.termName === classData.termId);
        if(!term){
            return;
        }
        let classes: FlowchartClass[] = Array.from(term.courses);
        const classIndex: number = term.courses.findIndex((termClass: FlowchartClass) => termClass.uuid === classData.classUUID);
        classes.splice(classIndex, 1);
        term.courses = classes;
        setSelectedUserFlowchart({...selectedUserFlowchart, termData: JSON.stringify(updatedTerms)});

    };

    const handleMarkTaken = () => {
        flowchartClassCache[classData.classUUID].taken = !flowchartClassCache[classData.classUUID].taken;
        setClassTaken(flowchartClassCache[classData.classUUID].taken);
    };

    return (
        <StyledClassContextMenu $top={top} $left={left}>
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
        </StyledClassContextMenu>
    );
};

export default ClassContextMenu;
