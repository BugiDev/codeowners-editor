import {CodeownersFile} from 'Core/codeowners/CodeownersReader';
import redux from 'redux';

const CREATE_CODEOWNERS_FILE = 'codeowners:CREATE_CODEOWNERS_FILE';

interface CodeownersState extends CodeownersFile {
    loading: boolean;
}

const initialState = {
    lines: [],
    allCodeowners: [],
    fileExists: false,
    loading: true
} as CodeownersState;

const codeownersReducer = (state = initialState, action: redux.AnyAction) => {
    switch (action.type) {
        case CREATE_CODEOWNERS_FILE:
            return {
                ...state,
                lines: action.payload.lines,
                allCodeowners: action.payload.allCodeowners,
                fileExists: action.payload.fileExists,
                loading: false
            };
        default:
            return state;
    }
};

export default codeownersReducer;

export const createCodeownersFile = (codeownersFile: CodeownersFile) => ({ type: CREATE_CODEOWNERS_FILE, payload: codeownersFile });