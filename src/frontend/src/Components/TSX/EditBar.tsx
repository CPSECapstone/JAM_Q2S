import React from 'react';
import {IconButton, Tooltip } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../CSS/EditBar.css';
import {FlowchartMetaData} from "../../Interfaces/Interfaces";

interface EditBarProps {
    toggleSideBar: () => void;
    selectedUserFlowchart: FlowchartMetaData | null;
}

function EditBar({toggleSideBar, selectedUserFlowchart} : EditBarProps) : JSX.Element{
    let clickEvent = () => {
    };
    return (

        <div className="editBar" onClick={() => clickEvent()}>
            <div className="left-buttons">
            <div className="buttons">
                <Tooltip title="Add Class to Flow"
                         placement="right"
                         arrow>
                    <IconButton aria-label="add class"
                                onClick={() => {alert('add class');}}>
                        <AddIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Remove Class from Flow"
                                   placement="right"
                                   arrow>
                <IconButton aria-label="remove class"
                            onClick={() => {alert('remove class');}}>
                    <RemoveIcon className="icon"/>
                </IconButton>
            </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Edit Selected Class"
                         placement="right"
                         arrow>
                    <IconButton aria-label="edit class"
                                onClick={() => {alert('edit class');}}>
                        <EditIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Save Flow"
                         placement="right"
                         arrow>
                    <IconButton aria-label="save flow"
                                onClick={() => {alert('save flow');}}>
                        <SaveIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Toggle Sidebar"
                         placement="right"
                         arrow>
                    <IconButton aria-label="Toggle Sidebar"
                                onClick={() => toggleSideBar()}>
                        <VisibilityIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
            <div className="buttons validate-button">
                <Tooltip title="Validate"
                         placement="right-end"
                         arrow>
                    <button aria-label="validate requirements"
                                onClick={() => {alert('validate requirements');}}>
                        Validate
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default EditBar;