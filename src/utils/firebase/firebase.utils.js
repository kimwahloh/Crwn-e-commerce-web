import { initializeApp } from 'firebase/app';

import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore, doc, getDoc, setDoc 
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBU1i6Q5saAdMxeFWdVxAikiUx5pGVLLkQ",
    authDomain: "crwn-clothing-db-a3ca7.firebaseapp.com",
    projectId: "crwn-clothing-db-a3ca7",
    storageBucket: "crwn-clothing-db-a3ca7.appspot.com",
    messagingSenderId: "718950178811",
    appId: "1:718950178811:web:67b53b2886397e44fe755e"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

//94 evertime when someone interacts with our provider, we want to force them to select an acc
provider.setCustomParameters({
    prompt: "select_account"
});

//94 create the instance
//94 single line only- bcz rules for authentication that communicate with Firebase is always the same for every app
export const auth = getAuth()
//94 BUT for provider can be vary
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//95 Instantiated fire store and use it to access our database
export const db = getFirestore()

//95 an async function that receives some user authentication object that getting back from Firebase authentication, our Google assignment
//95 take the data getting from authentication service and store inside Fire Store
//95 use these (database, users collection, identifier that tells it what it was) to get a document reference
export const createUserDocumentFromAuth = async (
    userAuth, additionalInformation ={}
    ) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);


    //95 but 1st need to check if there is any existing document reference in our database
    const userSnapshot = await getDoc(userDocRef);

//96 if the user is not existed, create their info with the date and set the database
if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
        });
    }   catch (error) {
        console.log('error creating the user', error.message);
    }
}

    return userDocRef;

};

//99 会把这个function写在这里是因为如果firebase更新有什么新改变的时候不需要大改
//99 protected the front end application from the external service that might subject to change
//99 if dont received any email or pasword then dw to call the method
//99 it will create the info if it passed the method
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};


//103 Sign In -pass the auth, email, password if u received it
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

//108 NOTE that auth is also keeping track of what users are signed in right now
export const signOutUser = async () => await signOut(auth);

//110 1st auth, 2nd some callback that you want to call everytime the auth state changes
//110 whenever you instantiate this function, will have to give a callback, which is going to give to onAuthStateChanged
//110 so this function will call this callback whenever the authentication state of our 'auth' singleton changes
//110 e.g. auth changes such aa user sign-in OR sign-out
//110 BUT need to stop it from listening whenever this component unmounts!
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);