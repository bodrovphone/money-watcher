import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';

export function transactions( state = [] , action ) {
    let transactions = null;
    switch(action.type) {
        case ADD_TRS:
            transactions = [...state, {sum: action.payload.sum, note: action.payload.note}];
            return transactions;
        case TRS_FETCH_DATA_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export function trsIsLoading (state = false, action) {
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