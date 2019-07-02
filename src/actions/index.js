// #constants
import { ADD_TRS, DATA_IS_LOADING, DATA_FETCH_ERROR, FETCH_TRS_SUCCESS, FETCH_CAT_SUCCESS, FETCH_BAL_SUCCESS, ACTIVE_MONTH_CHANGED  } from '../constants/constants';
import { startPoint } from '../components/Display/helpers';
// [containers]
import { trsColl, connectedRef, catLabels, trsRef, balanceRef } from '../containers/firebase';

const addTransaction = (newTrs) => ({
        type: ADD_TRS,
        payload: newTrs
    });

const dataIsLoading = (bool) => ({
        type: DATA_IS_LOADING,
        payload: bool
    });

const trsHasErrored = (bool) => ({
        type: DATA_FETCH_ERROR,
        payload: bool
    });

const trsFecthDataSuccess = (transactions) => ({
        type: FETCH_TRS_SUCCESS,
        payload: transactions
    });

const catFecthDataSuccess = (categories) => ({
        type: FETCH_CAT_SUCCESS,
        payload: categories
    });

const currentBalanceFetchSuccess = (balance) => ({
        type: FETCH_BAL_SUCCESS,
        payload: balance
    });

const changeMonth = (month) => ({
        type: ACTIVE_MONTH_CHANGED,
        payload: month
    });

//the below action creators is async function that is executed with redux-thunk lib (retrieving transactions from firebase and putting them to redux store)
function trsFecthData(startPoint, endPoint) {
        return dispatch => {
            // dispatching action
            dispatch(dataIsLoading(true));

            let transactions = [];

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
function catFecthData() {
    return dispatch => {

        // fetching default set of categories
        catLabels.once('value', snapshot => {
            // dispatching action - updating main App store
            dispatch(catFecthDataSuccess(snapshot.val()));

        })

        // fallback function on fetching data in fact this will only be fired on fb auth issues
        .catch((error) => {
            // dispatching action
            dispatch(trsHasErrored(true));
        });
    }
}

function currentBalanceFetchData(date = startPoint.substring(0,7)) {
    return async dispatch => {
        
        // need to check if this node exists at all. if it doesn't, I should copy it from the last one that exist:

        // 1. retreive all nodes and check what we have there
        let balancesOnFirebase;
        let arrayOfAvailableBalances;
        let theLastBalanceValue;
        let theLastBalanceOnFirebase;
        await balanceRef.orderByValue().once('value', snapshot => {
            balancesOnFirebase = snapshot.val();  
            arrayOfAvailableBalances = Object.keys(balancesOnFirebase); // ['2018-10', '2018-11'] - in the right order
            theLastBalanceValue = balancesOnFirebase[arrayOfAvailableBalances[arrayOfAvailableBalances.length - 1]] // $500
            theLastBalanceOnFirebase = arrayOfAvailableBalances[arrayOfAvailableBalances.length - 1] // 2018-10
        });

        // 2. check if we have requested balance at FB and if no - create missing ones
            if (!balancesOnFirebase.hasOwnProperty(date)) {
                // 2.1 a function calculates the number of month between requested date and the last one available on Firebase
                function monthDiff(theOlderDate, theNewerDate) {
                    var months; // first create an output variable
                    // next calculate the number of months in years differences 
                    months = (theNewerDate.getFullYear() - theOlderDate.getFullYear()) * 12; // this would be 0 if this is the same year
                    // then calculate increment the month differences
                    months -= theOlderDate.getMonth(); // this would correct the difference of one part
                    // finally caclulate the delta
                    months += theNewerDate.getMonth(); // and this would correct the difference of second part
                    return months <= 0 ? 0 : months; // we finally get the results of old and new date, including the new date month
                }
                // 2.2 run monthDiff and save the missingMonth number
                var missingMonthNumber = monthDiff(
                    new Date(theLastBalanceOnFirebase), 
                    new Date(date)
                )
                // 2.3 create an array in the appropriate format of missing months
                function fulfillTheGapInMonths(firstMissing, numberOfMonths) {
                    var output = [];
                    while(numberOfMonths) {
                        output.push(
                            // OMG
                            new Date(new Date(firstMissing).getFullYear(), new Date(firstMissing).getMonth() + numberOfMonths + 1).toISOString().substring(0,7)
                        )
                        --numberOfMonths;
                    }
                    return output.reverse(); // I should reverse it because I've started from the very last month (see OMG above)
                }
                // 2.4 run fulfillTheGapInMonths func to actually create an array?
                var arrayOfTheMissingMonths = fulfillTheGapInMonths(theLastBalanceOnFirebase, missingMonthNumber);
                
                // 2.5 and now we want object to have dates as keys and last balance as value for all of the keys
                    var ObjectOfNewBalances = {...balancesOnFirebase} //just copying what has already been in there
                    for (let i = 0; i < missingMonthNumber; i++) {
                        ObjectOfNewBalances[arrayOfTheMissingMonths[i]] = theLastBalanceValue
                    }                    

                // 2.6 Finally we just put this sheet on the FireBase

                await balanceRef.set(ObjectOfNewBalances);
            }

          // fetching balance_per_month
          balanceRef.child(date).once('value', snapshot => {
            // dispatching action - updating main App store
            dispatch(currentBalanceFetchSuccess(snapshot.val()));

        })
        
        // fallback function on fetching data in fact this will only be fired on fb auth issues
        .catch((error) => {
            // dispatching action
            dispatch(trsHasErrored(true));
        });

    }
}


function updateFirebase(transaction, date) {
    return dispatch => {
        // year and month strings to know what to update
        const trsYear = +transaction.dateToken.substring(0, 4);
        const trsMonth = +transaction.dateToken.substring(5, 7);
        // function-helper to update the current and all future balances
        function updateBalances(balances) {
            // copy of balances object
            let updatedBalances = {...balances};

            for(let item in balances) {
                if ((+item.substring(0, 4) >= trsYear) && (+item.substring(5, 7) >= trsMonth)) {
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
            trsRef.child(transaction.editedNodeKey).set(null);
            // here I update affected balances of edited transaction by removing it
            function updateBalances(balances) {
                // but how do I know which balances are future ones?
                var updatedBalances = {...balances};          
                for(let item in balances) {
                    if ((+item.substring(0, 4) >= trsYear) && (+item.substring(5, 7) >= trsMonth)) {                        
                        updatedBalances[item] = updatedBalances[item] + transaction.sum;
                    }
                    if ((+item.substring(0, 4) >= +transaction.editedNodeKey.substring(0, 4)) && (+item.substring(5, 7) >= +transaction.editedNodeKey.substring(5, 7))) {
                        updatedBalances[item] = updatedBalances[item] - transaction.previousSum;
                    }
                }
                balanceRef.set(updatedBalances);
                // dispatching another action to retreive updated balance
                dispatch(currentBalanceFetchData(date));
            } 
            fetch('https://money-watcher-79150.firebaseio.com/balance_per_month.json')
                .then(response =>  response.json() )
                .then(updateBalances)
            // copy transaction without editedNodeKey and previousSum
              const { editedNodeKey, previousSum, ...cleanTransaction } = transaction;
            trsRef.child(transaction.dateToken).set(cleanTransaction);

            dispatch(addTransaction(transaction));
        }
    }
}

export { changeMonth, trsFecthData, catFecthData, currentBalanceFetchData, updateFirebase };