'use client';
import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';
import { DEFAULT_TEXT_LENGTH_TO_CUT, DEFAULT_TEXT_LENGTH_TO_SHOW } from '@/utils/constants';

CustomShowMore.propTypes = {
    text: PropTypes.any.isRequired,
    textClass: PropTypes.any
};

function CustomShowMore(props) {
    // Initialization
    const [toggleShow, setToggleShow] = useState(false);

    // Functions
    const onToggleShow = () => setToggleShow(!toggleShow)

    // Rendered Component
    const renderContent = () => 
        props.text.length < DEFAULT_TEXT_LENGTH_TO_CUT 
            ? props.text
            : toggleShow 
                ? props.text
                : `${props.text.substring(0, DEFAULT_TEXT_LENGTH_TO_SHOW)}...`
        
    return (
        <CustomLabel>
            { renderContent() }
            {
                props.text?.length >= DEFAULT_TEXT_LENGTH_TO_CUT &&
                <Link href='#' className='text-blue-700 hover:underline text-sm hover:cursor-pointer ml-1' onClick={onToggleShow}>
                    { toggleShow ? 'Show less' : 'Show more' }
                </Link>
            }
        </CustomLabel>
    );
}

export default CustomShowMore;