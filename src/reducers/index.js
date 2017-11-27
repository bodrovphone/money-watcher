import { combineReducers } from 'redux';
import { transactions, trsIsLoading, trsHasErrored } from './transactions';

export default combineReducers({
    transactions,
    trsIsLoading,
    trsHasErrored
});