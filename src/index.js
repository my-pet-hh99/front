import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/configStore'
import GlobalStyle from './components/common/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyle/>
      <App />
    </Provider>
  </BrowserRouter>
);