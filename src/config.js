import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBNcMDDo0Ku5YiQAFbfd1vc70kEIXXga2A",
    authDomain: "taxiproject-92ccd.firebaseapp.com",
    databaseURL: "https://taxiproject-92ccd.firebaseio.com",
    projectId: "taxiproject-92ccd",
    storageBucket: "",
    messagingSenderId: "251671821581",
    appId: "1:251671821581:web:55535c45f50fb6ca"
};
let app = Firebase.initializeApp(config);
export const db = app.database();