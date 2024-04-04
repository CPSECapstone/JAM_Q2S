import styled  from 'styled-components'

export const StyledSideBarItem = styled.div<{$selected: boolean}>`
  width: 100%;
  display: flex;
  border-bottom: rgba(74, 72, 76, 0.62) solid 2px;
  background: ${(props) => {
    if(props.$selected){
      return 'lightgray'
    } else {
      return '#fff6e7;'
    }
  }};
          //
  &:hover {
    background: lightgray
  ;
  }
`;

