import React from 'react';
import { StyledContextMenu } from '../StyledComponents/RightClickMenuStyle';

interface ClassProps {
    top: number;
    left : number;
  }
const ContextMenu = ({ top, left } : ClassProps) => {

  return (
     <StyledContextMenu top={top} left={left}>
       <ul>
         <li>Edit</li>
         <li>Copy</li>
         <li>Delete</li>
       </ul>
     </StyledContextMenu>

  );
};

export default ContextMenu;
