import React from 'react';
import ReactDOM from 'react-dom';
import { loadServer } from 'my-jira-dev-tool';

import App from './App';

loadServer(() => {
  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)})



