// +core+
import { combineReducers } from 'redux';

// ^^reducers^^
import { transactions, dataIsLoading, dataFetchErrored, categories, currentBalance, activeMonth } from './transactions';

// combine reducers
export default combineReducers({
    transactions,
    categories,
    currentBalance,
    activeMonth,
    dataIsLoading,
    dataFetchErrored
});