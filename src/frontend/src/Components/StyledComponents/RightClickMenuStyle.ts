import styled, { css } from "styled-components";
export const StyledClassContextMenu = styled.div<{$top: number, $left: number}>`
  position: absolute;
  z-index: 1000900;
  width: 175px;
  top: ${({$top}) => `${$top}px`};
  left: ${({$left}) => `${$left}px`};
`;

export const StyledTermContextMenu = styled.div<{$top: number, $left: number}>`
  position: absolute;
  z-index: 1000900;
  width: 235px;
  top: ${({$top}) => `${$top}px`};
  left: ${({$left}) => `${$left}px`};
`;

export const StyledUserContextMenu = styled.div<{$top: number, $left: number, $width: number}>`
  position: absolute;
  z-index: 1000900;
  width: ${({$width}) => `${$width}px`};
  top: ${({$top}) => `${$top}px`};
  left: ${({$left}) => `${$left}px`};
`;