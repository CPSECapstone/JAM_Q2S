import styled, {css} from 'styled-components'

export const StyledClass = styled.div<{ color: string; $expanded?: boolean }>`
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: ${(props) => {
    return props.color;
  }};
  ${(props) => props.$expanded ? 'height: 50%;' : ''}
  display: flex;
  flex-direction: column;
  position: relative;
  transition: height 0.3s ease; /* Added transition for smoother effect */
  &:hover {
    background: lightgray;
  }
`;


