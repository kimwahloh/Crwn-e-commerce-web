import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',

}


//102 {children} : whatever p tag, h tag, span tag, u want to put inside of the button 
//102 {buttonType}: if we get past some value like button type, if the value is the string of 'google', then will render the classname 'google-sign-in' 
//102: {...otherProps}: we also pass it all those other values that we were seeing inside of our signup form
const Button = ({children, buttonType, ...otherProps}) => {
    return <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    {...otherProps}
    >{children}
    </button>
};

export default Button;