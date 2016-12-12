import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';



ReactDOM.render(
    <App initialContests={window.initialData.contests}/>,
    document.getElementById('root')                   // render to element with id root
);
