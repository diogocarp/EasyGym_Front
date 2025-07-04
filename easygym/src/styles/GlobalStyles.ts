import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');

    * {
        margin:0;
        padding:0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif; 
    }

    html, body, #root {
        height: 100%;
        padding-right: 0 !important;
    }

`

