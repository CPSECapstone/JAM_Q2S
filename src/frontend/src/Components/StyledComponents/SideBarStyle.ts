import styled, {css} from 'styled-components'

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
export const StyledSideBar = styled.div<{$open: boolean}> `
  background-color: #0056b3;
  transition: margin 500ms;
  flex: 1;
  ${ props => props.$open && css`
    margin-right: -25%;
  `};
`

