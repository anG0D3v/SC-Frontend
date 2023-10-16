import React from 'react';
import PropTypes from 'prop-types';
import { ImSpinner } from 'react-icons/im';
import { COLORS } from '../../utils/constants';

function CustomSpinner(props) {
    CustomSpinner.propTypes = {
        size: PropTypes.number,
        color: PropTypes.any
    }

    return (
        <div role="status">
            <ImSpinner size={25} className='animate-spin' color={props.color ? props.color : COLORS.PRIMARY_COLOR_800} />
        </div>
    );
}

export default CustomSpinner;
