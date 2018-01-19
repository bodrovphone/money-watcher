import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';

export function transactions( state = [] , action ) {
    let transactions = null;
    switch(action.type) {
        case ADD_TRS:
            transactions = [...state, {sum: action.payload.sum, note: action.payload.note, date: action.payload.date}];
            return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        case TRS_FETCH_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export function trsIsLoading (state = [], action) {
    switch(action.type) {
        case TRS_IS_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export function trsHasErrored (state = false, action) {
    switch(action.type) {
        case TRS_HAS_ERRORED:
            return action.payload;
        default:
            return state;
    }
}

export function trsFecthDataSuccess(state = [], action) {
    switch(action.type) {
        case TRS_FETCH_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}