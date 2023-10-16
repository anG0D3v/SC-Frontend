import React from 'react';
import PropTypes from 'prop-types';

CustomSkeleton.propTypes = {
    addedClass: PropTypes.any
};

function CustomSkeleton(props) {
    return (
        <div className='animate-pulse max-w-sm w-full'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 mb-4 w-full"></div>
        </div>
    );
}

export default CustomSkeleton;