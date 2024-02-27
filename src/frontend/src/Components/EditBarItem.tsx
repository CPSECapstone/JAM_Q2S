import React from "react";
import {IconButton, Stack } from '@mui/material/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// import "./EditBarItem.css";

function EditBarItem (props: {id : bigint,  name : string}) : JSX.Element {
    let clickEvent = () => {
        alert("you clicked on " + props.name  + " with id: " + props.id)
    };
    return (
        <div className="sideBarItem" onClick={() => clickEvent()}>
            <Stack direction="row" spacing={1}>
                <div className="barItemTitle">
                    <p>{props.name}</p>
                </div>
                <div className="buttons">
                    <IconButton aria-label="favorite flowchart" size="large"
                                onClick={() => {alert('clicked heart');}}>
                        <FavoriteBorderIcon fontSize="inherit"/>
                    </IconButton>
                    <IconButton aria-label="star flowchart" size="large"
                                onClick={() => {alert('clicked star');}}>
                        <StarBorderIcon fontSize="inherit"/>
                    </IconButton>
                </div>
            </Stack>


        </div>
    );
}

export default EditBarItem

