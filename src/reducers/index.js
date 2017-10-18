import { ADD_TRS } from '../constants';

const transactions = ( state = [], action ) => {
    let transactions = null;
    switch(action.type) {
        case ADD_TRS:
            transactions = [...state, {sum: action.sum, note: action.note}];
            return transactions;
        default:
            return state;
    }
};

export default transactions;