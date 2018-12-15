import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import './style/reset.css';
import './style/global.css';

const rootEl = document.getElementById('app');

render(<App />, rootEl);

if (module.hot) {
    module.hot.accept();
}
