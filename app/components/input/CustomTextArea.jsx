import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';

CustomTextArea.propTypes = {
    label: PropTypes.string,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    addedClass: PropTypes.any,
    errorMsg: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
};

function CustomTextArea(props) {
    return (
        <div className={clsx(props.addedClass)}>
            {props.label && (
                // <label
                //     htmlFor={props.name}
                //     className={clsx(
                //         'my-2',
                //         props.errorMsg
                //             ? 'error-label'
                //             : 'block mb-2 text-sm text-gray-500',
                //     )}
                // >
                //     {props.label}
                // </label>

                <CustomLabel 
                    children={props.label}
                    htmlFor={props.name} 
                    className={clsx('my-2',
                    props.errorMsg
                        ? 'error-label'
                        : 'block mb-2 text-sm text-gray-500',
                    )}  
                />
            )}
            <textarea
                id="txt-area"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                rows={props.rows}
                className={clsx(
                    'text-area-default',
                    props.errorMsg && 'text-area-error',
                )}
                onChange={props.onChange}
            />
            {props.errorMsg && (
                <h6 className="error-label my-2">{props.errorMsg}</h6>
            )}
        </div>
    );
}

export default React.memo(CustomTextArea);
