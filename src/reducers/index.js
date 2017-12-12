// +core+
import { combineReducers } from 'redux';

// ^^reducers^^
import { transactions, trsIsLoading, trsHasErrored } from './transactions';

// combine reducers
export default combineReducers({
    transactions,
    trsIsLoading,
    trsHasErrored
});