import React, {ChangeEvent, useState} from "react";
import {IconButton} from "@mui/material";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

interface NewFlowFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (inputValue: string) => void;
}

export default function NewFlowForm({ isOpen, onClose, onSubmit }: NewFlowFormProps) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <div className={`custom-popup ${isOpen ? 'open' : 'closed'}`}>
            <div className="custom-popup-content">
                <IconButton aria-label="close-btn" size="small"
                            onClick={onClose}>
                    <IndeterminateCheckBoxOutlinedIcon/>
                </IconButton>
                <p className="popup-text">ENTER NEW FLOW NAME</p>
                <input type="text" value={inputValue} onChange={handleChange} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

