'use client';
import { forwardRef, useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { CustomButton, CustomLabel } from '..';
import { COLORS } from '../../utils/constants.js';

const CustomInput = forwardRef((props, ref) => {
  const [type, setType] = useState(props.type);
  const { ...extraProps } = props;
  delete extraProps.addedClass;
  
  const setToggle = useCallback((e) => {
    setType(e);
  }, []);

  return (
    <div className={clsx('relative w-full', props.addedClass)}>
      {props.label && (
        <label
          htmlFor={props.name}
          className={clsx(
            'my-2',
            props.error ? 'error-label' : 'input-label',
            props.labelClass
          )}
        >
          {props.label} {props.isRequired && <span className='text-red-600'>*</span>}
        </label>
      )}
      <div className="flex relative flex-row items-center">
        {props.prefixicon && (
          <div className="absolute pointer-events-none pl-4">
            {props.prefixicon}
          </div>
        )}
        <input
          ref={ref}
          {...extraProps}
          disabled={props.disabled}
          name={props.name}
          type={type || props.type}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          minLength={props.minLength}
          maxLength={props.maxLength}
          className={clsx(
            props.size === 'small' ? 'textbox-small' : props.size === 'medium' ? 'textbox-medium' : props.size === 'large' ? 'textbox-large' :'textbox-default',
            props.prefixicon && 'pl-12',
            props.error && 'error',
          )}
        />
        {props.suffixicon && (
          <div className="absolute pointer-events-none pr-3">
            {props.suffixicon}
          </div>
        )}
        {props.type === 'password' && (
          <div className="absolute pl-4 right-0">
            <CustomButton
              onClick={() =>
                setToggle(type === 'password' ? 'text' : 'password')
              }
              icon={
                type === 'password' ? (
                  <BsFillEyeSlashFill
                    size={20}
                    color={COLORS.SMOKE_GRAY}
                  />
                ) : (
                  <BsFillEyeFill
                    size={20}
                    color={COLORS.SMOKE_GRAY}
                  />
                )
              }
            />
          </div>
        )}
      </div>
     
      {props.error && (
        <CustomLabel id='error-text' addedClass="error-label my-2" children={props.error} />
      )}
    </div>
  )  
});

CustomInput.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  type: PropTypes.string,
  prefixicon: PropTypes.any,
  suffixicon: PropTypes.any,
  name: PropTypes.string,
  addedClass: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  labelClass: PropTypes.any
};

CustomInput.defaultProps = {
  size: 'small',
  disabled: false
}

CustomInput.displayName = 'CustomInput'
export default CustomInput;