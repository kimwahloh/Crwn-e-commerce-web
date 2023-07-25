import { BaseButton, GoogleSignInButton, InvertedButton } from './button.styles';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
};

//138 Styled-components Button
//138 special map object that pass the button type value
const getButton = ( buttonType = BUTTON_TYPE_CLASSES.base ) =>
    ({ 
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

//102 {children} : whatever p tag, h tag, span tag, u want to put inside of the button 
//102 {buttonType}: if we get past some value like button type, if the value is the string of 'google', then will render the classname 'google-sign-in' 
//102: {...otherProps}: we also pass it all those other values that we were seeing inside of our signup form
const Button = ({children, buttonType, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return <CustomButton {...otherProps}> {children} </CustomButton>;
};

export default Button;