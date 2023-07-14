import {useState} from "react";

//101 
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';

//98 initialise value for these 4 values; empty strings
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

//98 所以defaultFormFields的value就是原本的formFields；空的
//98 formFields is now an object
//98 那4个value 变constants inside the component
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    //100 reset the form to empty after submit
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    //99 all of what's goin' to the form we r goin' to handle; no default behaviour of the form
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword ) {
            alert("passwords do not match");
            return;
        }

        //refer 99 & 100 
        //100 reset function called after we successfully created the user doc from the auth
        //108 call： whenever a user signs up for the first time, there will also have their user set inside of our user context
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();

        } catch(error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />
                

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}
                />
                
                <Button type="submit">Sign Up</Button>
        
        
        
            </form>      
        </div>
    );
};

export default SignUpForm;