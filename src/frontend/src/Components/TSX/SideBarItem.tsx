import React from "react";
import { IconButton, Stack } from '@mui/material/';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../CSS/SideBarItem.css";
import {StyledSideBarItem} from "../StyledComponents/SideBarStyle";



export interface SideBarItemProps {
    id: bigint;
    name: string;
    group: string;
    onFavoriteClick: (id: bigint) => void;
    onStarClick: (id: bigint) => void;
}

function SideBarItem(props: SideBarItemProps): JSX.Element {
    const renderIcon = (iconType: string): JSX.Element => {
        switch (iconType) {
            case "favorite":
                return props.group === "favorite" ? <FavoriteIcon /> : <FavoriteBorderIcon />;
            case "star":
                return props.group === "main" ? <StarIcon /> : <StarBorderIcon />;
            default:
                return <></>;
        }
    };

    return (
        <StyledSideBarItem $selected={false}>
            <span className="barItemTitle">
                <p className="text">{props.name}</p>
            </span>

            <Stack direction="row" justifyContent="flex-end" alignItems="left" spacing={0}>
                <IconButton aria-label="favorite flowchart" size="small" onClick={() => props.onFavoriteClick(props.id)}>
                    {renderIcon("favorite")}
                </IconButton>
                <IconButton aria-label="star flowchart" size="small" onClick={() => props.onStarClick(props.id)}>
                    {renderIcon("star")}
                </IconButton>
            </Stack>
        </StyledSideBarItem>
    );
}

export default SideBarItem;