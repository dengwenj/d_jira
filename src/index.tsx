import './wdyr'

import React from 'react';
import ReactDOM from 'react-dom';
import { loadServer, DevTools } from 'my-jira-dev-tool';
import 'antd/dist/antd.less'

import AppProviders from 'context';

import App from './App';

loadServer(() => {
  ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
)})



