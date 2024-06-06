import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material/';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../CSS/EditBar.css';
import {FlowchartMetaData} from "../../Interfaces/Interfaces";
import axios from "axios";

interface EditBarProps {
    toggleSideBar: () => void;
    selectedUserFlowchart: FlowchartMetaData | null;
}

const validateRequirements = async (termData : any) => {
    try {
        const courses = termData.flatMap((term: any) =>
            Array.isArray(term.courses)
                ? term.courses.map((course: any) => course.id).filter((id: string | null) => id !== null)
                : []
        ).join(',');

        const response = await axios.get('/checkRequirement', {
            params: {courses}
        });

        return response.data.unmetRequirements;
    }
    catch (error) {
        console.log('Error validating requirements:', error)
    }
};

function EditBar({toggleSideBar, selectedUserFlowchart} : EditBarProps) : JSX.Element{
    const [popupOpen, setPopupOpen] = useState(false);
    const [unmetRequirements, setUnmetRequirements] = useState<string[]>([]);

    let clickEvent = () => {
    };

    const handleValidateClick = () => {
        if (selectedUserFlowchart) {
            try {
                const termDataObject = JSON.parse(selectedUserFlowchart.termData);
                validateRequirements(termDataObject)
                    .then((unmetRequirements) => {
                        setUnmetRequirements(unmetRequirements);
                        setPopupOpen(true);
                    })
            } catch (error) {
                console.error('Error parsing termData:', error);
            }
        } else {
            console.log("No flowchart selected. Cannot validate degree requirements");
        }
    }

    return (

        <div className="editBar" onClick={() => clickEvent()}>
            <div className="left-buttons">
            <div className="buttons">
                <Tooltip title="Add Class to Flow"
                         placement="right"
                         arrow>
                    <IconButton aria-label="add class"
                                onClick={() => {alert('add class');}}>
                        <AddIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Remove Class from Flow"
                                   placement="right"
                                   arrow>
                <IconButton aria-label="remove class"
                            onClick={() => {alert('remove class');}}>
                    <RemoveIcon className="icon"/>
                </IconButton>
            </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Edit Selected Class"
                         placement="right"
                         arrow>
                    <IconButton aria-label="edit class"
                                onClick={() => {alert('edit class');}}>
                        <EditIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Save Flow"
                         placement="right"
                         arrow>
                    <IconButton aria-label="save flow"
                                onClick={() => {alert('save flow');}}>
                        <SaveIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="buttons">
                <Tooltip title="Toggle Sidebar"
                         placement="right"
                         arrow>
                    <IconButton aria-label="Toggle Sidebar"
                                onClick={() => toggleSideBar()}>
                        <VisibilityIcon className="icon"/>
                    </IconButton>
                </Tooltip>
            </div>
        </div>
            <div className="buttons validate-button">
                    <button className="button" aria-label="validate requirements"
                                onClick={handleValidateClick}>
                        Validate
                    </button>
            </div>

            <Dialog open={popupOpen} onClose={() => setPopupOpen(false)} className="popupContainer">
                <DialogTitle>Unmet Requirements</DialogTitle>
                <DialogContent>
                    {unmetRequirements.map((requirement: string, index: number) => (
                        <Typography key={index}>{requirement}</Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={() => setPopupOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditBar;