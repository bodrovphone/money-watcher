import { ADD_TRS } from '../constants';

export const addTransaction = (newTrs) => {
    const action = {
        type: ADD_TRS,
        payload: newTrs
    }
    console.log('action in addTransaction', action);
    return action;
}