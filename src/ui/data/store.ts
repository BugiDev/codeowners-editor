import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';

import CodeownersReducer from './reducers/CodeownersReducer';

const rootReducer = combineReducers({
    codeownersFile: CodeownersReducer
});
const store = createStore(rootReducer, applyMiddleware(logger));
export default store;