import { initializeApp } from 'firebase/app';
import {
    getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider
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
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);


    //95 but 1st need to check if there is any existing document reference in our database
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

//96 if the user is not existed, create their info with the date and set the database
if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        });
    }   catch (error) {
        console.log('error creating the user', error.message);
    }
}

    return userDocRef;

};