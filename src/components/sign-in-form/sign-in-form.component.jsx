import {useState} from "react";
import { useDispatch } from "react-redux";
//101 
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import { SignUpContainer, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";


//98 initialise value for these 4 values; empty strings
const defaultFormFields = {
    email: '',
    password: '',
}

//98 所以defaultFormFields的value就是原本的formFields；空的
//98 formFields is now an object
//98 那4个value 变constants inside the component
//the current user is being managed through a context in React, and the setCurrentUser function (or state setter) is being used 
//to update the user information within a specific component.
const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    //100 reset the form to empty after submit
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    //103 Sign In Form using Google to sign in
    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    //99 all of what's goin' to the form we r goin' to handle; no default behaviour of the form
    const handleSubmit = async (event) => {
        event.preventDefault();


        //106 run 'setCurrentUser' whenever the user value comes back
        //106 then access it inside of my navigation component
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        }   catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);  
            }
        }
    };

    //98 use this 'name' to tell the setstate which of these fields to update
    //98 whartever the value from the state is the value that shown in the input
    //98 BUT when the user types those values in, on change trigger effectively pushes tht form field into our state, 
    //98 and then the state will update the visual at 'value' 
    //98 'target' is to give us the thing that is emitting the event; which is all attached in 'input'
    const handleChange = (event) => {
        const {name, value} = event.target;

        //98 to spread in the object and modify on value on the object
        setFormFields({...formFields, [name]: value});
    };

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}
                />

                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>      
        </SignUpContainer>
    );
};

export default SignInForm;