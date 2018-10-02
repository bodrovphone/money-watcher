// ~structural~
import { trsRef, balanceRef } from '../containers/firebase';

// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS, FETCH_BAL_SUCCESS } from '../constants/constants';


// local helpers

function updateFirebse({payload}) {
    if (!payload.editing) {
        trsRef.child(payload.dateToken).set(payload);
        balanceRef.child(payload.dateToken.substring(0, 7)).set(payload.currentBalance + payload.sum);
    } else {
        delete payload.editing;
        trsRef.child(payload.editedNodeKey).set(null);
        balanceRef.child(payload.editedNodeKey.substring(0, 7)).set(payload.currentBalance - payload.sum);
        delete payload.editedNodeKey;
        trsRef.child(payload.dateToken).set(payload);
        balanceRef.child(payload.dateToken.substring(0, 7)).set(payload.currentBalance + payload.sum);
    }
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

export function currentBalance(state = [], action) {
    switch(action.type) {
        case FETCH_BAL_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}


export function transactions( state = [] , action ) {
    let transactions = [...state];
    switch(action.type) {
        case ADD_TRS:
        // copying store and adding new trs to it (but only in case it's been submitted with the chosen month)
        if(state[0] && (state[0].date.substring(0, 7) === action.payload.date.substring(0, 7))) {
            transactions = [...state, action.payload];
        } 
        
        if (action.payload.editing) {
            transactions = transactions.filter( el => el.dateToken !== action.payload.editedNodeKey);
        }
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
