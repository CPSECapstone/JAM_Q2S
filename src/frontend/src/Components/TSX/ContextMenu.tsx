import React, {useContext} from 'react';
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
import {ClassDBClass, ContextMenuData, FlowchartClass, TermData} from "../../Interfaces/Interfaces";
import {FlowchartContext} from "../../Context/FlowchartProvider";

interface ClassProps {
    top: number;
    left: number;
    classData: ContextMenuData;
}

const ContextMenu = ({top, left, classData}: ClassProps) => {
    const {flowchart, setFlowchart} = useContext(FlowchartContext);

    const handleDelete = () => {
        if (!flowchart || !classData.classId) {
            return;
        }
        let updatedFlowchart: TermData[] | null = [...flowchart];
        let term: TermData | undefined = updatedFlowchart.find((term: TermData): boolean => term.termName === classData.termId);
        if (!term) {
            return;
        }
        let newClasses: FlowchartClass[] = Array.from(term.classes);
        let classIndex = term.classes.findIndex((termClass: FlowchartClass): boolean => termClass.id === classData.classId?.classData.id);
        newClasses.splice(classIndex, 1);
        term.classes = newClasses;
        setFlowchart(updatedFlowchart);
    }

    return (
        <StyledContextMenu $top={top} $left={left}>
            <Paper sx={{width: 320, maxWidth: '100%'}}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <CheckIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Mark Taken</ListItemText>
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
