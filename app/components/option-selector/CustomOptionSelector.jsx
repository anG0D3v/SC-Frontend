import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

CustomOptionSelector.propTypes = {
    label: PropTypes.string,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    addedclass: PropTypes.any,
    disabled: PropTypes.bool,
    hasLink: PropTypes.bool,
    linkName: PropTypes.string,
    sourceLink: PropTypes.string,
    name: PropTypes.string,
    errorMsg: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'radio']),
    checked: PropTypes.any
};


function CustomOptionSelector(props) {
    const {...extraProps} = props;
    delete extraProps.helperText;
    delete extraProps.addedClass;
    delete extraProps.hasLink;
    delete extraProps.linkName;
    delete extraProps.sourceLink;
    delete extraProps.errorMsg;

    return (
        <div className="flex items-start gap-1">
            {/* CHECBOX OR RADIO BUTTON */}
            <div className='flex items-center h-5'>
                <input
                    {...extraProps}
                    disabled={props.disabled}
                    aria-describedby={props.label}
                    type={!props.type ? 'checkbox' : props.type}
                    name='option-selector'
                    value={props.value}
                    className={clsx('cb-default', props.addedclassName)}
                    checked={props.checked}
                    onChange={props.onChange}
                />
            </div>

            {/* CHECKBOX OR RADIO BUTTON TEXT */}
            <div className="ml-2 text-sm">
                <label htmlFor={props.label}
                    className={clsx(
                        'checkbox-label',
                        props.errorMsg && 'error-label',
                    )}
                >
                    {props.label}
                    {props.hasLink && (
                        <a
                            href={props.sourceLink}
                            className="text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            {props.linkName}
                        </a>
                    )}
                </label>

                {/* ERROR TEXT */}
                {props.helperText && (
                    <p
                        id={props.label}
                        className={clsx(
                            'helper-text',
                            props.errorMsg && 'error-label',
                        )}
                    >
                        {props.helperText}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CustomOptionSelector;