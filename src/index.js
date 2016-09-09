import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import configureStore from "./store.js";
import { Provider } from 'react-redux';

const store = configureStore({});

const reactRoot = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  reactRoot
);
