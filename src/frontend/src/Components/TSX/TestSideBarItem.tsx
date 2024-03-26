import React from "react";
import {IconButton, Stack} from '@mui/material/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "../CSS/SideBarItem.css";
import {StyledSideBarItem} from "../StyledComponents/SideBarStyle";
import {FlowchartData, FlowchartResponse} from "../../Interfaces/Interfaces";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";


export interface TestSideBarItemProps {
    data: FlowchartData;
    selected: boolean;
    handleSelectedClick: (current: FlowchartData) => void;
    handleFavoriteClick: (current: FlowchartResponse) => void;
    handleMainClick: (current: FlowchartResponse) => void;
    responseData: FlowchartResponse;
}

function TestSideBarItem({
                             data,
                             selected,
                             handleSelectedClick,
                             responseData,
                             handleFavoriteClick,
                             handleMainClick
                         }: TestSideBarItemProps): JSX.Element {
    const renderIcon = (iconType: string): JSX.Element => {
        switch (iconType) {
            case "favorite":
                return responseData.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>;
            case "star":
                return responseData.main ? <StarIcon/> : <StarBorderIcon/>;
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
                <IconButton aria-label="favorite flowchart" size="small"
                            onClick={() => handleFavoriteClick(responseData)}>
                    {renderIcon("favorite")}
                </IconButton>
                <IconButton aria-label="star flowchart" size="small" onClick={() => handleMainClick(responseData)}>
                    {renderIcon("star")}
                </IconButton>
            </Stack>
        </StyledSideBarItem>
    );
}

export default TestSideBarItem;