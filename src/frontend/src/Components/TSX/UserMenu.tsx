import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../CSS/UserMenu.css';
import { StyledContextMenu } from '../StyledComponents/RightClickMenuStyle';

function UserMenu(): JSX.Element {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsMenuOpen(true);
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
    ({ onClose }, ref) => {
        return (
            <StyledContextMenu ref={ref} top={12} left={13}>
                <ul>
                    <li>Account</li>
                    <li>Settings</li>
                    <li>Notifications</li>
                    <li>
                        <Link style={{ color: 'red' }} to="/login" onClick={onClose}>Logout</Link>
                    </li>
                </ul>
            </StyledContextMenu>
        );
    }
);

export default UserMenu;
