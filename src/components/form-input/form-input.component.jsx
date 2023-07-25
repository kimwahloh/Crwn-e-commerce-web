import {FormInputLabel, Input, Group} from './form-input.styles';


const FormInput = ({ label, ...otherProps  }) => {

    //101 when the user type something, the label will shrink
    //101 if 'label' exist, then render this 'label'
    return (
        <Group>
            <Input {...otherProps} />
            {label &&(
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>  
             )}
        </Group>
    );
};

export default FormInput;