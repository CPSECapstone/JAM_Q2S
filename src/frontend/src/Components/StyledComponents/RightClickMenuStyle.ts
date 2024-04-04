import styled, { css } from "styled-components";
export const StyledContextMenu = styled.div<{$top: number, $left: number}>`
  position: absolute;
  z-index: 999;
  width: 175px;
  top: ${({$top}) => `${$top}px`};
  left: ${({$left}) => `${$left}px`};
`;