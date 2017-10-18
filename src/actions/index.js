import { ADD_TRS } from '../constants';

export const addTransaction = (sum, note) => {
    const action = {
        type: ADD_TRS,
        sum,
        note
    }
    console.log('action in addTransaction', action);
    return action;
}