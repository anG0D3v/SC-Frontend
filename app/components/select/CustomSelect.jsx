'use client';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { CustomLabel } from '..';

CustomSelect.propTypes = {
    items: PropTypes.array,
    addedClass: PropTypes.any,
    label: PropTypes.any,
    labelClass: PropTypes.any,
    placeholder: PropTypes.string,
    isLoading: PropTypes.bool,
    isMulti: PropTypes.bool,
    error: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    isClearable: PropTypes.bool
};

CustomSelect.defaultProps = {
    isMulti: false,
    isClearable: false
}

const animatedComponents = makeAnimated();

  function CustomSelect(props) {
    const { ...extraProps } = props;
    delete extraProps.labelClass;

    return (
        <div>
            {props.label && <CustomLabel children={props.label} addedClass={clsx('my-2', props.labelClass,  props.error ? 'error-label' : '' )} />}
            <Select
                {...props}
                components={animatedComponents}
                options={props.items} 
                placeholder={props.placeholder} 
                className={clsx(props.addedClass)} 
                isMulti={props.isMulti}
                isLoading={props.isLoading}
                onChange={(item) => props.onChange(item)}
                isClearable={props.isClearable}
                name={props.name}
            />
            {props.error && <CustomLabel children={props.error} addedClass='my-2 error-label'  />}
        </div>
    );
}

export default CustomSelect;