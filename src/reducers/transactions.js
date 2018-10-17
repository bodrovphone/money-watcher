// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS, FETCH_BAL_SUCCESS, ACTIVE_MONTH_CHANGED } from '../constants/constants';

// =Dev helpers=
import { startPoint as currentMonth } from '../components/Display/currentMonth';



// local helpers

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

export function currentBalance(state = 0, action) {
    switch(action.type) {
        case FETCH_BAL_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export function activeMonth (state = currentMonth.substring(0, 7), action) {
    switch(action.type) {
        case ACTIVE_MONTH_CHANGED:
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
        // returning sorted store
            return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        case FETCH_TRS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
