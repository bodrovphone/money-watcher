// +core+
import firebase from 'firebase';

// firebase credentials
  const config = {
    apiKey: "AIzaSyA1b-TTzTxVmsxUd33exagZqrEVwHR6fKU",
    authDomain: "money-watcher-79150.firebaseapp.com",
    databaseURL: "https://money-watcher-79150.firebaseio.com",
    projectId: "money-watcher-79150",
    storageBucket: "money-watcher-79150.appspot.com",
    messagingSenderId: "850257782783"
  };

// initializing firebase
firebase.initializeApp(config);

// creating DB reference to transactions
export const trsRef = firebase.database().ref("transactions");
export const catLabels = firebase.database().ref("category_meta");
export const currentBalanceRef = firebase.database().ref("current_balance");
export const trsColl = trsRef.orderByKey();
export const connectedRef = firebase.database().ref(".info/connected");

// export
export default firebase;