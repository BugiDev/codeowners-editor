import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import {CodeownersFile} from "Core/codeowners/CodeownersReader";
import {createCodeownersFile} from "UI/data/reducers/CodeownersReducer";

import store from './data/store';
import App from './components/App';

import './style/reset.css';
import './style/global.css';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept();
}

readCodeownersFile().then((codeownersFile: CodeownersFile) => {
    store.dispatch(createCodeownersFile(codeownersFile));
});