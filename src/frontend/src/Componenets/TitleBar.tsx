import React from 'react';
import './TitleBar.css';
import {Toolbar, Typography} from "@mui/material";

function TitleBar() : JSX.Element{
    return (
        <div className="titleBar">
            <div className='flowName'>
                <Typography>Flow Name</Typography>
            </div>
            <div className='degreeMajor'>
                <Typography>B.S. in Computer Science</Typography>
            </div>
            <div className='catalog'>
                <Typography>2022-2026 Catalog</Typography>
            </div>
        </div>
    )
}

export default TitleBar