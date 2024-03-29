import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle,FontLink } from './GlobalStyle';
import {GlobalContextProvider} from './context/globalContext'
import { BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <GlobalStyle />
     <FontLink/>
  <GlobalContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalContextProvider>
</React.StrictMode>
  

);

