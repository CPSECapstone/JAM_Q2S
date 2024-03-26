import React from "react";
import { IconButton, Stack } from '@mui/material/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../CSS/SideBarItem.css";
import {StyledSideBarItem} from "../StyledComponents/SideBarStyle";



export interface TestSideBarItemProps {
    name: string;
    selected: boolean;
}

function TestSideBarItem({name, selected} : TestSideBarItemProps): JSX.Element {
    const renderIcon = (iconType: string): JSX.Element => {
        switch (iconType) {
            case "favorite":
                return <FavoriteBorderIcon/>;
            case "star":
                return <StarBorderIcon/>;
            default:
                return <></>;
        }
    };

    return (
        <StyledSideBarItem $selected={selected}>
            <span className="barItemTitle">
                <p className="text">{name}</p>
            </span>

            <Stack direction="row" justifyContent="flex-end" alignItems="left" spacing={0}>
                <IconButton aria-label="favorite flowchart" size="small">
                    {renderIcon("favorite")}
                </IconButton>
                <IconButton aria-label="star flowchart" size="small" >
                    {renderIcon("star")}
                </IconButton>
            </Stack>
        </StyledSideBarItem>
    );
}

export default TestSideBarItem;