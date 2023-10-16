'use client'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import { CustomLabel } from '..';

CustomPhoneInput.propTypes = {
    error: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any
};

function CustomPhoneInput(props) {
    return (
        <div>
             <PhoneInput
                country='us'
                onChange={(phone) => props.onChange(phone)}
                autocompleteSearch
                buttonClass={clsx('phone-button', props.error && 'error')}
                inputClass={clsx('phone-input-field', props.error && 'error')}
                dropdownClass='phone-dropdown'
                containerClass='phone-container'  
            />
            {
                props.error &&
                <CustomLabel children={props.error} addedClass="error-label my-2" />
            }
        </div>
    );
}

export default CustomPhoneInput;