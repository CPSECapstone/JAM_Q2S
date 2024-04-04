import React from 'react'
import { Dialog } from '@mui/material';
import { QuarterClassData } from '../../Interfaces/Interfaces';
import '../CSS/ClassInfoDialog.css';

export interface ClassInfoDialogProps {
  open: boolean;
  onClose: () => void;
  classData: QuarterClassData;
}

function ClassInfoDialog({onClose, open, classData }: ClassInfoDialogProps) {

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog onClose={handleClose}
            open={open}
            fullWidth={true}
    >
      <div id='dialog'>
        <div id ='title'>
          <h3 id = 'displayName'>{classData.displayName} ({classData.units} units)</h3>
          <button id="closeButton" onClick={() => handleClose()}>Close</button>
        </div>
        <div id ='info'>
          <p>{classData.desc}</p>
        </div>
      </div>
    </Dialog>
  );
}

export default ClassInfoDialog
