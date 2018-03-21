// +core+
import { combineReducers } from 'redux';

// ^^reducers^^
import { transactions, trsIsLoading, trsHasErrored, category_meta } from './transactions';

// combine reducers
export default combineReducers({
    transactions,
    category_meta,
    trsIsLoading,
    trsHasErrored
});