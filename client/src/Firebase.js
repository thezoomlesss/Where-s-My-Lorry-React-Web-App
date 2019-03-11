import 'firebase/auth';
var firebase = require("firebase");
var secret = require("./secret.json");

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: secret.firebase_apiKey,
    authDomain: secret.authDomain,
    databaseURL: secret.databaseURL,
    storageBucket: secret.storageBucket,
    messagingSenderId: secret.messagingSenderId
};
class Firebase {
    constructor() {

        
        firebase.initializeApp(config);
        this.auth = firebase.auth();

    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

}

export default firebase;