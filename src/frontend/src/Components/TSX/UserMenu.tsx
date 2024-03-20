import react from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../CSS/UserMenu.css';
import React from "react";

function UserMenu() : JSX.Element{
    const handleClick = () => {
        alert('You clicked on profile');
        console.log('Profile clicked');
    };

    return (
        <div className="profile" onClick={handleClick}>
            <AccountCircleOutlinedIcon style={{ color: 'white', fontSize: 40 }} />
            <p className='userName'>User Name</p>
        </div>
    )
}

export default UserMenu;