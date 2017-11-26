import firebase from 'firebase';
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyA1b-TTzTxVmsxUd33exagZqrEVwHR6fKU",
    authDomain: "money-watcher-79150.firebaseapp.com",
    databaseURL: "https://money-watcher-79150.firebaseio.com",
    projectId: "money-watcher-79150",
    storageBucket: "money-watcher-79150.appspot.com",
    messagingSenderId: "850257782783"
  };
  firebase.initializeApp(config);
  export default firebase;