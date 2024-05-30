import React from "react";
import {IconButton, Stack} from '@mui/material/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../CSS/SideBarItem.css";
import {StyledSideBarItem} from "../StyledComponents/SideBarStyle";
import {FlowchartMetaData} from "../../Interfaces/Interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";


export interface SideBarItemProps {
    data: FlowchartMetaData;
    selected: boolean;
    handleSelectedClick: (current: FlowchartMetaData) => void;
    // handleFavoriteClick: (current: FlowchartMetaData) => void;
    // handleMainClick: (current: FlowchartMetaData) => void;
    // responseData: FlowchartMetaData;
}

function SideBarItem({
                             data,
                             selected,
                             handleSelectedClick,
                         }: SideBarItemProps): JSX.Element {
    const renderIcon = (iconType: string): JSX.Element => {
        switch (iconType) {
            case "favorite":
                return data.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
            case "star":
                return data.main ? <StarIcon/> : <StarBorderIcon/>;
            default:
                return <></>;
        }
    };

    return (
        <StyledSideBarItem $selected={selected}>
            <span className="barItemTitle" onClick={() => handleSelectedClick(data)}>
                <p className="text">{data.name}</p>
            </span>

            <Stack direction="row" justifyContent="flex-end" alignItems="left" spacing={0}>
                <IconButton aria-label="favorite flowchart" size="small">
                    {renderIcon("favorite")}
                </IconButton>
                <IconButton aria-label="star flowchart" size="small">
                    {renderIcon("star")}
                </IconButton>
            </Stack>
        </StyledSideBarItem>
    );
}

export default SideBarItem;