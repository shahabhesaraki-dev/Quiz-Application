import { createGlobalStyle } from "styled-components";

import BGIMAGE from "./images/nattu-adnan.jpg";

export const GlobalStyle = createGlobalStyle`

    html{
        height: 100%;
    }

    body{
        background-image: url(${BGIMAGE});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    *{
        box-sizing: border-box;
        font-family: "Catamaran", sans-serif;
    }

`;
