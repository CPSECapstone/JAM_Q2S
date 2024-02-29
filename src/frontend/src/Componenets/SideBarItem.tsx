import React from "react";
import {IconButton, Stack } from '@mui/material/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./SideBarItem.css";

interface SideBarItemProps {
    id: bigint;
    name: string;
    onFavoriteClick: (id: bigint) => void;
    onStarClick: (id: bigint) => void;
}

function SideBarItem (props: SideBarItemProps) : JSX.Element {
    let clickEvent = () => {
        alert("you clicked on " + props.name  + " with id: " + props.id)
    };
    return (
        <div className="sideBarItem">
            {/*<Stack direction ="row" alignItems="center">*/}
            {/*    <Typography noWrap onClick={() => clickEvent()} sx={{ minWidth: 0, maxWidth: 120}} >{props.name}</Typography>*/}
            <span className="barItemTitle" onClick={() => clickEvent()}>
                <p className="text">{props.name}</p>
            </span>

            <Stack direction="row" justifyContent="flex-end"
               alignItems="center" spacing={0}>
                <IconButton aria-label="favorite flowchart" size = "small"
                            onClick={() => props.onFavoriteClick(props.id)}>
                    <FavoriteBorderIcon/>
                </IconButton>
                <IconButton aria-label="star flowchart" size = "small"
                            onClick={() => props.onStarClick(props.id)}>
                    <StarBorderIcon/>
                </IconButton>
            </Stack>

        </div>
    );
}

export default SideBarItem

