// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS, FETCH_BAL_SUCCESS, ACTIVE_MONTH_CHANGED  } from '../constants/constants';
import { startPoint } from '../components/Display/currentMonth';
// [containers]
import { trsColl, connectedRef, catLabels, trsRef, balanceRef } from '../containers/firebase';

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

export const currentBalanceFetchSuccess = (balance) => {
    const action = {
        type: FETCH_BAL_SUCCESS,
        payload: balance
    }
    return action;
}

export const changeMonth = (month) => {
    const action = {
        type: ACTIVE_MONTH_CHANGED,
        payload: month
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
                        date: items[item].date,
                        dateToken: items[item].dateToken
                    });
                }

                // This event listener define if connection's been broken
                    connectedRef.on("value", function(snap) {
                      if (snap.val() === true) {
                        // console.log("connected");
                      } else {
                        // console.log("not connected");
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

export function currentBalanceFetchData(date = startPoint.substring(0.7)) {
    return dispatch => {
        dispatch(dataIsLoading(true));

          // fetching current_balance
          balanceRef.child(date).once('value', snapshot => {

            // dispatching action
            dispatch(dataIsLoading(false));
            // dispatching action - updating main App store
            dispatch(currentBalanceFetchSuccess(snapshot.val()));

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


export function updateFirebase(transaction, date) {
    return dispatch => {
        // function-helper to update the current and all future balances
        function updateBalances(balances) {
            // but how do I know which balances are future ones?
            var updatedBalances = {...balances};
            
            for(let item in balances) {
                if ((+item.substring(0, 4) >= +transaction.dateToken.substring(0, 4)) && (+item.substring(5, 7) >= +transaction.dateToken.substring(5, 7))) {
                    updatedBalances[item] = balances[item] + transaction.sum;
                }
            }
            
            balanceRef.set(updatedBalances);
            // dispatching another action to retreive updated balance
            dispatch(currentBalanceFetchData(date));
        } 
        // when it's just new transaction
        if (!transaction.editing) {
            // adding transaction to firebase
            trsRef.child(transaction.dateToken).set(transaction);

            // fetching current set of balances to pass on to the updateBalances function declared above
            fetch('https://money-watcher-79150.firebaseio.com/balance_per_month.json')
                .then(response =>  response.json() )
                .then(updateBalances)

            dispatch(addTransaction(transaction));
        } else {
        // when it's editing mode
            delete transaction.editing;
            trsRef.child(transaction.editedNodeKey).set(null);
            // here I update affected balances of edited transaction by removing it
            function updateBalances(balances) {
                // but how do I know which balances are future ones?
                var updatedBalances = {...balances};          
                for(let item in balances) {
                    if ((+item.substring(0, 4) >= +transaction.dateToken.substring(0, 4)) && (+item.substring(5, 7) >= +transaction.dateToken.substring(5, 7))) {                        
                        updatedBalances[item] = updatedBalances[item] + transaction.sum;
                    }
                    if ((+item.substring(0, 4) >= +transaction.editedNodeKey.substring(0, 4)) && (+item.substring(5, 7) >= +transaction.editedNodeKey.substring(5, 7))) {
                        updatedBalances[item] = updatedBalances[item] - transaction.previousSum;
                    }
                }
                console.log(transaction.sum, transaction.previousSum);
                console.log(balances,updatedBalances);
                balanceRef.set(updatedBalances);
                // dispatching another action to retreive updated balance
                dispatch(currentBalanceFetchData(date));
            } 
            fetch('https://money-watcher-79150.firebaseio.com/balance_per_month.json')
                .then(response =>  response.json() )
                .then(updateBalances)
            // delete transaction.editedNodeKey;
            // delete transaction.previousSum;
            // copy transaction without editedNodeKey and previousSum
              const { editedNodeKey, previousSum, ...cleanTransaction } = transaction;
            trsRef.child(transaction.dateToken).set(cleanTransaction);

            dispatch(addTransaction(transaction));
        }
    }
}