// ~structural~
import { trsRef } from '../containers/firebase';

// #constants
import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';


// local helpers

function updateFirebse({payload}) {
    trsRef.child(payload.dateToken).set(payload);
}

export function transactions( state = [] , action ) {
    let transactions = null;
    switch(action.type) {
        case ADD_TRS:
        // copying store and adding new trs to it
            transactions = [...state, action.payload];
        // updating Firebase
            updateFirebse(action);
        // returning sorted store
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