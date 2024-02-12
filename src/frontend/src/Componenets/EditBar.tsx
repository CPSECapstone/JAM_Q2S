import React from 'react';
import { Toolbar } from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import './EditBar.css';

function EditBar() : JSX.Element{
    return (
        <div className="editBar">
            <Toolbar>
                <AddIcon className="icon"/>
                <RemoveIcon className="icon"/>
                <SaveIcon className="icon"/>
            </Toolbar>
        </div>
    )
}

export default EditBar