// +core+
import { createStore, applyMiddleware } from 'redux';

// =Dev helpers=
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

// ^^reducers^^
import rootReducer from '../reducers';

// creating store, applying middleweares
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk, createLogger())
        ))
}