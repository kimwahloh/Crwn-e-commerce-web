
import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';

import "./authentication.styles.scss"

//95 response= console log show de 'user'
const Authentication = () => {
    

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;