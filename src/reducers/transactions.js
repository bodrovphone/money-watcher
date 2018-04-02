// ~structural~
import { trsRef } from '../containers/firebase';

// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS } from '../constants/constants';


// local helpers

function updateFirebse({payload}) {
    trsRef.child(payload.dateToken).set(payload);
}

export function dataIsLoading (state = [], action) {
    switch(action.type) {
        case DATA_IS_LOADING:
            return action.payload;
        default:
            return state;
    }
};

export function dataFetchErrored (state = false, action) {
    switch(action.type) {
        case DATA_FETCH_ERROR:
            return action.payload;
        default:
            return state;
    }
}


export function categories(state = [], action) {
    switch(action.type) {
        case FETCH_CAT_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};


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
        case FETCH_TRS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
