import React from 'react';
import {IconButton, Toolbar, Tooltip } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import './EditBar.css';

function EditBar() : JSX.Element{
    let clickEvent = () => {
    };
    return (
        <div className="editBar" onClick={() => clickEvent()}>
            <Toolbar>
                <div className="buttons">
                    <Tooltip title="Add Class to Flow"
                             placement="right"
                             arrow>
                        <IconButton aria-label="add class" size="large"
                                    onClick={() => {alert('add class');}}>
                            <AddIcon className="icon"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="buttons">
                    <Tooltip title="Remove Class from Flow"
                             placement="right"
                             arrow>
                        <IconButton aria-label="remove class" size="large"
                                    onClick={() => {alert('remove class');}}>
                            <RemoveIcon className="icon"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="buttons">
                    <Tooltip title="Edit Selected Class"
                             placement="right"
                             arrow>
                        <IconButton aria-label="edit class" size="large"
                                    onClick={() => {alert('edit class');}}>
                            <EditIcon className="icon"/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="buttons">
                    <Tooltip title="Save Flow"
                             placement="right"
                             arrow>
                        <IconButton aria-label="save flow" size="large"
                                    onClick={() => {alert('save flow');}}>
                            <SaveIcon className="icon"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </div>
    )
}

export default EditBar