import React from "react";
import {IconButton, Stack } from '@mui/material/';
import Typography from '@mui/material/Typography';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import "./SideBarItem.css";

function SideBarItem (props: {id : bigint,  name : string}) : JSX.Element {
    let clickEvent = () => {
        alert("you clicked on " + props.name  + " with id: " + props.id)
    };
    return (
        <div className="sideBarItem">
            {/*<Stack direction ="row" alignItems="center">*/}
            {/*    <Typography noWrap onClick={() => clickEvent()} sx={{ minWidth: 0, maxWidth: 120}} >{props.name}</Typography>*/}
            <span className="barItemTitle" onClick={() => clickEvent()}>
                <p>{props.name}</p>
            </span>

            <Stack direction="row" justifyContent="flex-end"
               alignItems="center" spacing={0}>
                <IconButton aria-label="favorite flowchart" size = "small"
                            onClick={() => {alert('clicked heart');}}>
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton aria-label="star flowchart" size = "small"
                            onClick={() => {alert('clicked star');}}>
                    <StarBorderIcon/>
                </IconButton>
            </Stack>
        </div>
    );
}

export default SideBarItem

