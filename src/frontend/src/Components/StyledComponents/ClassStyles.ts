import styled from 'styled-components'

export const StyledClass = styled.div<{$color : string}>`
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  background: ${props => props.$color};
  &:hover {
    background: lightgray;
  }
`;

export const CourseCode = styled.p`
  display:flex;
  justify-content: center;
`
