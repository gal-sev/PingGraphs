import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainWindow from './components/MainWindow';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>
);