import styled  from 'styled-components'

export const StyledClass = styled.div<{ color: string; $expanded?: boolean, $taken: boolean}>`
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) => {
    if(props.$taken){
        return 'gray'
    } else {
        return props.color
    }
  }};
  display: flex;
  flex-direction: column;
  &:hover {
    background: ${(props) => {
      if(props.$taken){
        return 'gray'
      } else {
        return 'lightgray'
      }
    }};
  }
`;

export const StyledEmbeddedClass = styled.div<{ color: string; $expanded?: boolean, $taken: boolean}>`
  margin: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 5px;
  background: ${(props) => {
    if(props.$taken){
        return 'lightgray'
    } else {
        return 'beige'
    }
}};
  display: flex;
  flex-direction: column;
};
`;



