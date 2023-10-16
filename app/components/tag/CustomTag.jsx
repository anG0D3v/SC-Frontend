import clsx from 'clsx';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';

CustomTag.propTypes = {
    content: PropTypes.any.isRequired,
    color: PropTypes.any,
    addedClass: PropTypes.any,
    labelClass: PropTypes.any,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

CustomTag.defaultProps = {
    size: 'medium'
}

function CustomTag(props) {

    const getSize = (size) => {
        if(_.isEqual(size, 'small')) {
            return 'p-1' 
        } else if(_.isEqual(size, 'medium')) {
            return 'p-3' 
        } else if(_.isEqual(size, 'large')) {
            return 'p-5' 
        }
        return ''
    }

    const getClassByVariant = (variant) => {
        if(_.isEqual(variant, 'success')) {
            return `bg-green-300/30 border border-green-600 ${getSize(props.size)}`
        } else if(_.isEqual(variant, 'warning')) {
            return `bg-yellow-300/30 border border-yellow-600 ${getSize(props.size)}`
        } else if(_.isEqual(variant, 'error')) {
            return `bg-red-300/30 border border-red-600 ${getSize(props.size)}`
        } else {
            return `bg-blue-300/30 border border-blue-600 ${getSize(props.size)}`
        }
    }

    const classLabelByVariant = (variant) => {
        if(_.isEqual(variant, 'success')) {
            return 'text-green-600 font-medium  text-sm'
        } else if(_.isEqual(variant, 'warning')) {
            return 'text-yellow-600 font-medium text-sm'
        } else if(_.isEqual(variant, 'error')) {
            return 'text-red-600 font-medium text-sm'
        } else {
            return 'text-blue-600 font-medium text-sm'
        }
    }

    return (
        <div className={clsx('flex items-center justify-center rounded-lg text-center', getClassByVariant(props.variant), props.addedClass)}>
            <CustomLabel children={props.content} addedClass={clsx('text-center', classLabelByVariant(props.variant), props.labelClass)} variant='subtitle'  />
        </div>
    );
}

export default CustomTag;