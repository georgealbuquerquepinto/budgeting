import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './_assets/css/style.css';

import Routes from './routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('app'),
);
