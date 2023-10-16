'use client'
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

CustomCard.propTypes = {
    children: PropTypes.any,
    addedClass: PropTypes.any
};

function CustomCard(props) {
    return (
        <motion.div
            {...props}
            className={clsx(props.addedClass, 'bg-gray-200/30 border border-gray-200 p-5 rounded-lg bg-white')}
        >
            {
                props.children
            }
        </motion.div>
    );
}

export default CustomCard;