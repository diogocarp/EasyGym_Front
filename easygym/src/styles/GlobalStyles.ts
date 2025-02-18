import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

    * {
        margin:0;
        paddind:0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif; 
    }
    body {
    background-color: red !important;
  }
`