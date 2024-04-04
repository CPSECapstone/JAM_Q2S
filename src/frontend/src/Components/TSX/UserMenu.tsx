import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../CSS/UserMenu.css';
import { StyledContextMenu } from '../StyledComponents/RightClickMenuStyle';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from "@mui/material/Paper";

function UserMenu(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsMenuOpen(prevState => !prevState);
        console.log('Profile clicked');
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="profile" onClick={handleClick}>
            <AccountCircleOutlinedIcon style={{ color: 'white', fontSize: 40 }} />
            <p className="userName">User Name</p>
            {isMenuOpen && (
                <ContextMenu ref={menuRef} onClose={handleCloseMenu} />
            )}
        </div>
    );
}

export interface MenuProps {
    onClose: () => void;
}

const ContextMenu = React.forwardRef<HTMLDivElement, MenuProps>(
    ({ onClose }) => {
        return (
            <StyledContextMenu $top={65} $left={20}>
                <Paper sx={{width: 320, maxWidth: '100%'}}>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small"/>
                            </ListItemIcon>
                            <Link style={{ color: 'red' }} to="/login" onClick={onClose}>Logout</Link>
                        </MenuItem>
                        <Divider/>
                        <MenuItem>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Delete Account</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </StyledContextMenu>
        );
    }
);

export default UserMenu;
