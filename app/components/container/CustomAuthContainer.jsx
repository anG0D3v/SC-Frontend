import React from 'react';
import PropTypes from 'prop-types';

CustomAuthContainer.propTypes = {
    children: PropTypes.any,
    header: PropTypes.any,
    background: PropTypes.any,
    addedClass: PropTypes.any
};

function CustomAuthContainer(props) {
    return (
        <div className="w-full min-h-screen bg-white relative">
            {/* BACKGROUND */}
           {props.background}

            {/* CARD */}
            <div className="max-w-full h-full flex flex-row justify-center items-center">
                <div className="absolute z-50 bg-white rounded-3xl border border-primary-gray-300 shadow-md w-[90%] md:w-[60%] lg:w-[35%] xl:w-[35%] 2xl:w-[30%] p-7">
                    {/* HEADER */}
                    {
                        props.header
                    }

                    {/* BODY */}
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomAuthContainer;