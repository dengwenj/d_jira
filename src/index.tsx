import React from 'react';
import ReactDOM from 'react-dom';
import { loadServer } from 'my-jira-dev-tool';

import AppProviders from 'context';

import App from './App';

loadServer(() => {
  ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)})



