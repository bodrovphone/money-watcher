// +core+
import { combineReducers } from 'redux';

// ^^reducers^^
import { transactions, dataIsLoading, dataFetchErrored, categories, currentBalance } from './transactions';

// combine reducers
export default combineReducers({
    transactions,
    categories,
    currentBalance,
    dataIsLoading,
    dataFetchErrored
});