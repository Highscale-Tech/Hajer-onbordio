import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';

const GlobalStyle = createGlobalStyle`

                
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Roboto,sans-serif;
  }
  body {
    margin:0;
    padding:0;
    background: radial-gradient(circle at top left, #b2daff, transparent 40%),
    radial-gradient(circle at bottom right, #b2daff, transparent 40%);
    background-size: 100% 100%, 100% 100%; /* Set size for both gradients */
    background-position: top left, bottom right;
    height: 100vh;
  }
 
`;
const FontLink = () => (
  <Helmet>
    <link href="https://fonts.cdnfonts.com/css/gilroy-bold" rel="stylesheet"/>      
  </Helmet>
);


export {GlobalStyle,FontLink};