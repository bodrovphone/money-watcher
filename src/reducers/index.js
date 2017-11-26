import { ADD_TRS } from '../constants/constants';

import firebase from '../containers/firebase';

const fetchTrs = () => {
        const TrsRef = firebase.database().ref('transactions');
        TrsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    sum: items[item].sum,
                    note: items[item].note
                });
            }
            console.log('logs from on event', newState);
            return newState;
        });

};

const MyTest = fetchTrs();

console.log(`MyTest: ${MyTest}`);

const transactions = ( state = [] , action ) => {
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