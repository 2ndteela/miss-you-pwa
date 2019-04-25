import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCZ58uvnOGphyz7VdZTP5bChBNgov9YDsA",
    authDomain: "i-miss-you-154a9.firebaseapp.com",
    databaseURL: "https://i-miss-you-154a9.firebaseio.com",
    projectId: "i-miss-you-154a9",
    storageBucket: "i-miss-you-154a9.appspot.com",
    messagingSenderId: "821315662587"
  };
firebase.initializeApp(config)

export default firebase