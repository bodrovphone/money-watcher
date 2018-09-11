// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS  } from '../constants/constants';

// [containers]
import { trsColl, connectedRef, catLabels } from '../containers/firebase';

export const addTransaction = (newTrs) => {
    const action = {
        type: ADD_TRS,
        payload: newTrs
    }
    return action;
}

export const dataIsLoading = (bool) => {
    const action = {
        type: DATA_IS_LOADING,
        payload: bool
    }
    return action;
}

export const trsHasErrored = (bool) => {
    const action = {
        type: DATA_FETCH_ERROR,
        payload: bool
    }
    return action;
}

export const trsFecthDataSuccess = (transactions) => {
    const action = {
        type: FETCH_TRS_SUCCESS,
        payload: transactions
    }
    return action;
}

export const catFecthDataSuccess = (categories) => {
    const action = {
        type: FETCH_CAT_SUCCESS,
        payload: categories
    }
    return action;
}

//the below action creators is async function that is executed with redux-thunk lib (retrieving transactions from firebase and putting them to redux store)
export function trsFecthData(startPoint, endPoint) {
        return dispatch => {
            // dispatching action
            dispatch(dataIsLoading(true));

            const transactions = [];

            // fetching main transactions thread using `once` event listener(firebase event)
            // plus filtering the data on the fly, based on the choosen month. (the current on by default)
            trsColl.startAt(startPoint).endAt(endPoint).once('value', snapshot => {
                let items = snapshot.val();

                // filling array with transactions from firebase
                for (let item in items) {
                    transactions.push({
                        sum: items[item].sum,
                        note: items[item].note,
                        category: items[item].category,
                        date: items[item].date
                    });
                }

                // This event listener define if connection's been broken
                    connectedRef.on("value", function(snap) {
                      if (snap.val() === true) {
                        console.log("connected");
                      } else {
                        console.log("not connected");
                      }
                    })

                // dispatching action
                dispatch(dataIsLoading(false));
                
                // dispatching action - updating main App store
                dispatch(trsFecthDataSuccess(transactions));
            })

            // fallback function on fetching data in fact this will only be fired on fb auth issues
            .catch((error) => {
                // dispatching action
                dispatch(dataIsLoading(false));
                // dispatching action
                dispatch(trsHasErrored(true));
            });

        }
}


//fetching categories to update category picker with the default set of categories
export function catFecthData() {
        return dispatch => {
            // dispatching action
            dispatch(dataIsLoading(true));

            // fetching default set of categories
            catLabels.once('value', snapshot => {

                // dispatching action
                dispatch(dataIsLoading(false));

                // dispatching action - updating main App store
                dispatch(catFecthDataSuccess(snapshot.val()));

            })

            // fallback function on fetching data in fact this will only be fired on fb auth issues
            .catch((error) => {
                // dispatching action
                dispatch(dataIsLoading(false));
                // dispatching action
                dispatch(trsHasErrored(true));
            });
        }
    }