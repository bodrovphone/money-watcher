// +core+
import { createStore, applyMiddleware } from 'redux';

// =Dev helpers=
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// ^^reducers^^
import rootReducer from '../reducers';

// creating store, applying middleweares
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, createLogger())
    );
}