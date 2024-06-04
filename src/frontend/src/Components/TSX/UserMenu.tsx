import React, {useState, useEffect, useRef, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../CSS/UserMenu.css';
import { StyledClassContextMenu } from '../StyledComponents/RightClickMenuStyle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import Paper from "@mui/material/Paper";
import {AuthContext} from "../../Context/AuthContext";
import {useMsal} from "@azure/msal-react";
import {Button} from "react-bootstrap";
import {useLocalStorage} from "../../Hooks/useLocalStorage";

function UserMenu(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { user } = useContext(AuthContext);

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
            <p className="userName">{user?.first_name} {user?.last_name}</p>
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
        const { user, setUser } = useContext(AuthContext);
        const { removeItem } = useLocalStorage();
        const { instance } = useMsal();
        const navigate = useNavigate();

        const handleLogoutRedirect = () => {
            removeItem("user");
            if (instance.getActiveAccount()) {
                instance.logoutRedirect().catch((error) => console.log(error));
            } else {
                navigate("/");
            }
        };

        return (
            <StyledClassContextMenu $top={65} $left={20}>
                <Paper sx={{width: 320, maxWidth: '100%'}}>
                    <MenuList>
                        <MenuItem>
                            <ListItemText>{user?.user_name}</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemText>{user?.major}</ListItemText>
                        </MenuItem>
                        <MenuItem >
                            <ListItemIcon>
                                <EmojiPeopleIcon/>
                            </ListItemIcon>
                            <Link to="/about">About Us</Link>
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
                            <Button variant="warning" onClick={handleLogoutRedirect}>
                                Sign out
                            </Button>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </StyledClassContextMenu>
        );
    }
);

export default UserMenu;
