// +core+
import { combineReducers } from 'redux';

// ^^reducers^^
import { transactions, dataIsLoading, dataFetchErrored, categories } from './transactions';

// combine reducers
export default combineReducers({
    transactions,
    categories,
    dataIsLoading,
    dataFetchErrored
});