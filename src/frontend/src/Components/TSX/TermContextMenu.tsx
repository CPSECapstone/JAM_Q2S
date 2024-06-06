import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import {
    ClassDisplayInformation,
    ContextMenuData,
    FlowchartClass,
    FlowchartMetaData,
    TermData
} from '../../Interfaces/Interfaces';
import { StyledTermContextMenu } from '../StyledComponents/RightClickMenuStyle';

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

const TermContextMenu = ({top, left, flowchartClassCache, selectedUserFlowchart, setSelectedUserFlowchart, classData}: ClassProps) => {

    const handleMarkTaken = () => {
        let flowchartData : TermData[] = JSON.parse(selectedUserFlowchart.termData)
        let term: TermData | undefined = flowchartData.find((term : TermData) => term.termName == classData.termId);
        if(term){
            term.courses.forEach((course : FlowchartClass) => {
                console.log(course)
                flowchartClassCache[course.uuid].taken = true;
            })
        }
        // flowchartClassCache[classData.classUUID].taken = !flowchartClassCache[classData.classUUID].taken;
    };

    return (
        <StyledTermContextMenu $top={top} $left={left}>
            <Paper sx={{width: 700, maxWidth: '100%'}}>
                <MenuList>
                    <MenuItem onClick={() => handleMarkTaken()}>
                        <ListItemIcon>
                            <CheckIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Mark All Classes Taken</ListItemText>
                    </MenuItem>

                </MenuList>
            </Paper>
        </StyledTermContextMenu>
    );
};

export default TermContextMenu;
