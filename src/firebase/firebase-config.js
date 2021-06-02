import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJRQ8IInOHStTg7ljrBzAVi_hLUITKrIw",
    authDomain: "react-app-journal-67a97.firebaseapp.com",
    projectId: "react-app-journal-67a97",
    storageBucket: "react-app-journal-67a97.appspot.com",
    messagingSenderId: "772284291906",
    appId: "1:772284291906:web:500d7ece7a6227875f46db"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
//autenticacion con google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }