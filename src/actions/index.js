// #constants
import { ADD_TRS, TRS_IS_LOADING, TRS_HAS_ERRORED, TRS_FETCH_DATA_SUCCESS } from '../constants/constants';

// [containers]
import { trsColl, connectedRef, catLabels } from '../containers/firebase';

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

//the below action creators is async function that is executed with redux-thunk lib
export function trsFecthData() {
        return dispatch => {
            // dispatching action
            dispatch(trsIsLoading(true));

                let newStore = {};
                newStore.transactions = [];
                newStore.category_meta = [];

/*
======
Making requests to Firbase nodes separately
======
*/
            // fetching main transactions thread using `once` event listener(firebase event)
            trsColl.once('value', snapshot => {
                let items = snapshot.val();

                // filling array with transactions from firebase
                for (let item in items) {
                    newStore.transactions.push({
                        sum: items[item].sum,
                        note: items[item].note,
                        date: items[item].date
                    });
                }

            // fetching default set of categories
            catLabels.once('value', snapshot => {
                let items = snapshot.val();

                // filling array with transactions from firebase
                for (let item in items) {
                    newStore.category_meta.push(item);
                }
                    });
/*
======
End making requests to Firbase nodes separately
======
*/


                // This event listener define if connection's been broken
                    connectedRef.on("value", function(snap) {
                      if (snap.val() === true) {
                        console.log("connected");
                      } else {
                        console.log("not connected");
                      }
                    })

                // dispatching action
                dispatch(trsIsLoading(false));
                
                // dispatching action - updating main App store
                dispatch(trsFecthDataSuccess(newStore));
            })

            // fallback function on fetching data in fact this will only be fired on fb auth issues
            .catch((error) => {
                // dispatching action
                dispatch(trsIsLoading(false));
                // dispatching action
                dispatch(trsHasErrored(true));
            });

            


        }
    }