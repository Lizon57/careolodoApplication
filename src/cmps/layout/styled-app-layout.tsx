import styled from "styled-components"
import { appGridMixin } from "../../styles/mixins/grid-mixins"


export const StyledAppLayout = styled.div`
  ${appGridMixin()}
  grid-template-rows: max-content 1fr auto;
  min-height: 100vh;

  main {
    grid-column: 2/3;
    grid-row: 2/3;
  }
  
  footer {
    grid-column: 1/-1;
    grid-row: 3/4;
  }

  div.todo-cli-container{
    grid-row: 2/3;
    grid-column: 2/3;
  }
`