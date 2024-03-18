import styled, {css} from 'styled-components'

export const StyledClass = styled.div<{ color: string; $expanded?: boolean }>`
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) => {
    return props.color;
  }};
  display: flex;
  flex-direction: column;
  &:hover {
    background: lightgray;
  }
`;

