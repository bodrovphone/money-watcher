import { ADD_TRS } from '../constants';

const transactions = ( state = [], action ) => {
    let transactions = null;
    switch(action.type) {
        case ADD_TRS:
            transactions = [...state, {sum: action.payload.sum, note: action.payload.note}];
            return transactions;
        default:
            return state;
    }
};

export default transactions;