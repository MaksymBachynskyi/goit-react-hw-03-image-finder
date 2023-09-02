import 'modern-normalize';
import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
    html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}



img {
  display: block;
  max-width: 100%;
  height: auto;
}
ul{
    list-style:none;
    margin: 0;
    padding: 0;
    
  
}
`;
