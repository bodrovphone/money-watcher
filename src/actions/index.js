import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';
import firebase from '../containers/firebase';

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
    return action;
}

export const trsHasErrored = (bool) => {
    const action = {
        type: TRS_HAS_ERRORED,
        payload: bool
    }
    return action;
}

export const trsFecthDataSuccess = (transactions) => {
    const action = {
        type: TRS_FETCH_DATA_SUCCESS,
        payload: transactions
    }
    return action;
}

//the below action creators is async function that is executed with the use of to redux-thunk lib
export function trsFecthData() {
        return dispatch => {
            dispatch(trsIsLoading(true));
            const TrsRef = firebase.database().ref('transactions');
            return TrsRef.once('value', snapshot => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        sum: items[item].sum,
                        note: items[item].note
                    });
                }
                dispatch(trsIsLoading(false));
                dispatch(trsFecthDataSuccess(newState));
            })
            .catch((error) => {
                console.log(error , 'I am an error');
                dispatch(trsHasErrored(error));
            })
        };
    }