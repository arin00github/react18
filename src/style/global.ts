import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyles = createGlobalStyle<DefaultTheme>`
*,
  *::after,
  *::before {
    box-sizing: border-box;
  }
 
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans KR', Helvetica, 'sans-serif', Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
    Droid Sans, Helvetica Neue, sans-serif;
    font-size:15px;
  }

  div, ul, li, ol,
  input, p, span, button,
  h1, h2, h3, h4, h5, h6,
  nav, header, footer,
  nav, table,
  tr, th, td, dl, dd, dt {
    padding: 0;
    margin: 0;
  }

  a, a:hover {
    color: inherit;
    text-decoration: none;
  }

 

  li, ol, ul {list-style: none}

  input.input-box {
    font-size: 15px;
    padding:  0.4rem 1.25rem;
  }
  
  

  #layout {
    width: 100%;
  }


  #aside {
    width: 240px;
    height: calc(100vh - 80px);
    position:fixed;
    top: 80px;
    left:0;
    background-color: #fff;
    
    box-shadow: 0px 7px 18px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  #aside ul {
    
    padding:2rem 0;
  }
  #aside ul li {
    padding:0 2rem;
    height: 3rem;
    line-height: 3rem;
  }
  #aside ul li:hover {
    background-color: #ebebeb;
  }

  #main-body{
    width: 100%;
    //margin-left: 240px;
  }
  /* #main-body .body-inner {
    padding: 0 3rem;
  } */

`;
