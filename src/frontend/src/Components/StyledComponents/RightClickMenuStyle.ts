import styled, { css } from "styled-components";
export const StyledContextMenu = styled.div<{top: number, left: number}>`
  position: absolute;
  z-index: 1;
  width: 200px;
  background-color: #CED8D4;
  border-radius: 5px;
  box-sizing: border-box;
  top: ${({top}) => `${top}px`};
  left: ${({left}) => `${left}px`};
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 18px 12px;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: rgba(57,103,68,0.63);
  }
`;