import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${(props: any) => props.theme.font};
    background-color: ${(props: any) => props.theme.background};
    color: ${(props: any) => props.theme.color};
    transition: all 0.3s ease;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
