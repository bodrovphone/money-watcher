import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';

export const addTransaction = (newTrs) => {
    const action = {
        type: ADD_TRS,
        payload: newTrs
    }
    return action;
}

export const trsIsLoading = (bool) => {
    const action = {
        type: TRS_IS_LOADING,
        payload: bool
    }
}

export const trsHasErrored = (bool) => {
    const action = {
        type: TRS_HAS_ERRORED,
        payload: bool
    }
}

export const trsFecthDataSuccess = (transactions) => {
    const action = {
        type: TRS_FETCH_DATA_SUCCESS,
        payload: transactions
    }
}