import React from 'react';
import ReactDOM from 'react-dom';

import reportWebVitals from './reportWebVitals';

import TaskManagerApp from './TaskManagerApp';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.render(
  <TaskManagerApp />,
  document.getElementById('root')
);

reportWebVitals();