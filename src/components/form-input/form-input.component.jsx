import './form-input.styles.scss';


const FormInput = ({ label, ...otherProps  }) => {

    //101 when the user type something, the labek will shrink
    //101 if 'label' exist, then render this 'label'
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label &&(
                <label 
                    className={`${
                    otherProps.value.length ? 'shrink' : ''
                    } form-input-label`}
                    >
                    {label}
                </label>  
             )}
        
        </div>
    );
};

export default FormInput;