import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

//106 as the actual value you want to access:
//106 context needs an initial value as well; null check to define whether you have a user existing object or no object
//106 an empty object is still going to evaluate as true
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


//106 provider as the actual component; that will wrap around any other component that need access to the values inside
//106 the provider to receive 'value' that hold the actual contextual values
//106 we want to store a user object- i.e. currentUser ; initialise the value as null
//106 the provider allow any of its child components to access the values inside of its usestate 
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };



    //110 useEffect(): instantiate some function but give it a empty dependency array
    //110 meaning only want to run this function once when the component mounts
    //110 i.e whenever the auth state changes, it will log the user 
    //111 if the user signed out, we want to store null; if the user signed in, we want to store the object
    //111 create this user document only if a user comes through, otherwise just setCurrentUser (i.e. whenever a user signs up for the first time, there will also have their user set inside of our user context)
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
           if(user) {
            createUserDocumentFromAuth (user);
           }
            setCurrentUser(user);
        });

        return unsubscribe;

    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}