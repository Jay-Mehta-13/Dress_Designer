const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let signup = async (email, password) => {
    let reply = null;
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            user = userCredential.user;
            reply = "Account created. Please proceed to Login."
        })
        .catch((error) => {
            reply = error.code
        });
    return reply
}

let signin = async (email, password) => {
    let reply = null;
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email, "Signed In");
            reply = {code : "success" , message : user.email}
        })
        .catch(error => {
            console.log(Object.getOwnPropertyNames(error) + "  :  " + error.message + " FROM FIREBASE")
            reply = {code : "error" , message : error.code};
        });
    return reply
}

let signout = () => {
    signOut(auth)
        .then(() => {
            console.log("Signed Out")
        })
        .catch((error) => {
            console.log("Not Signed Out!")
        });
}

module.exports = { signup, signin, signout }