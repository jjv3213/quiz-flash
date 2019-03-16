import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB9bKljRcdtp8pEiyJoomvJHfyPYV8cTuQ",
    authDomain: "quiz-flash-d176f.firebaseapp.com",
    databaseURL: "https://quiz-flash-d176f.firebaseio.com",
    projectId: "quiz-flash-d176f",
    storageBucket: "quiz-flash-d176f.appspot.com",
    messagingSenderId: "830582762366"
};
const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()