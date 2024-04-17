import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/UserMenu.css';
import { StyledContextMenu } from '../StyledComponents/RightClickMenuStyle';
import { useAuth } from '../../Hooks/useAuth';
import {useLocalStorage} from "../../Hooks/useLocalStorage";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from "@mui/material/Paper";
import {User} from "../../Interfaces/Interfaces";

function UserMenu(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { getItem } = useLocalStorage();
    const [user] = useState<User | null>(() => {
        const userFromStorage = getItem("user");
        if (userFromStorage) {
            return JSON.parse(userFromStorage);
        }
    });

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
            <AccountCircleOutlinedIcon sx={{
                stroke: "#2D5A48",
                strokeWidth: 1,
                fontSize: 35,
                color: "white",
            }} />
            <p className="userName">{user?.first_name}{user?.last_name}</p>
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
        const { logout } = useAuth();
        const { getItem } = useLocalStorage();
        const [user] = useState<User | null>(() => {
            const userFromStorage = getItem("user");
            if (userFromStorage) {
                return JSON.parse(userFromStorage);
            }
        });
        return (
            <StyledContextMenu $top={65} $left={20}>
                <Paper sx={{width: 320, maxWidth: '100%'}}>
                    <MenuList>
                        <MenuItem>
                            <ListItemText>{user?.user_name}</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>{user?.major}</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Delete Account</ListItemText>
                        </MenuItem>
                        <Divider/>
                        <MenuItem>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small"/>
                            </ListItemIcon>
                            <Link style={{ color: 'red' }} to="/" onClick={logout}>Logout</Link>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </StyledContextMenu>
        );
    }
);

export default UserMenu;