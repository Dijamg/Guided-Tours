import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCwQTgDlQZImkdZJMHHmI9JbaIXE2Eq2gs",
    authDomain: "aalto-guided-tours-8c9d0.firebaseapp.com",
    databaseURL: "https://aalto-guided-tours-8c9d0.firebaseio.com",
    projectId: "aalto-guided-tours-8c9d0",
    storageBucket: "aalto-guided-tours-8c9d0.appspot.com",
    messagingSenderId: "671353018871",
    appId: "1:671353018871:web:3dd7273583d628915036f2"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

export default fire