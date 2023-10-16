import React from 'react';
import PropTypes from 'prop-types';

CustomSidebar.propTypes = {
    children: PropTypes.any
};

function CustomSidebar(props) {
    return (
        <aside id="logo-sidebar" className="overflow-auto fixed p-3 top-0 left-0 z-40 w-64 h-screen pt-[6rem] transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            {
                props.children
            }
        </aside>
    );
}
export default CustomSidebar;