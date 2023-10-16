'use client'
import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { CustomLabel, CustomSpinner } from '..';
import { initialPlaceholder, truncateText } from '../../utils/utils';

CustomAvatar.propTypes = {
    url: PropTypes.any,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extra-large']),
    text: PropTypes.any,
    helperText: PropTypes.string,
    indicator: PropTypes.bool,
    badge: PropTypes.node,
    altText: PropTypes.string,
    addedClass: PropTypes.any,
    onClick: PropTypes.any,
    textPosition: PropTypes.oneOf(['left', 'right']),
    dropdown: PropTypes.shape({
        items: PropTypes.any.isRequired,
        header: PropTypes.any,
        footer: PropTypes.any,
        isLoading: PropTypes.any
    }),
    textClass: PropTypes.any,
    helperTextClass: PropTypes.any
};

function CustomAvatar(props) {
    const { size = 'small' } = props;
    const [openDropdown, setOpenDropdown] = useState(false);
    
    const handleOnClick = useCallback(() => {
        setOpenDropdown(prevState => !prevState)
    },[]);

    const renderComponent = () => (
        <>
            {
                /* ----- RENDER IMAGE ----- */
                !props.url 
                    ?  <span id='avatar-initials' className="font-medium text-gray-600 dark:text-gray-300">{initialPlaceholder(props.text ?? props.altText)}</span>
                    :  <Image width={100} height={100} className={clsx(size === 'small' ? 'small-avatar' : size === 'medium' ? 'medium-avatar' : size === 'large' ? 'large-avatar' : 'xl-avatar')} src={props.url} alt={props.altText} />
            }
            {
                /* ----- RENDER INDICATOR OR BADGE ----- */
                props.indicator 
                ? <span id='indicator' className="avatar-indicator"></span>
                : props.badge 
                    ?   <div className="avatar-badge">
                            <span id='badge' className='text-white'>{props.badge}</span>
                        </div>
                    : null 
            }
        </>
    )

    const renderContent = () => (
        <>
            {
                /* ----- HEADER ----- */
                props.dropdown.header &&  
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {props.dropdown.header}
                </div>
            }
            {
                /* ----- BODY ----- */
                props.dropdown.items && 
                <ul className="py-2 space-y-0 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                    {props.dropdown.items?.map((item, idx) => (
                        <li id={idx} key={idx}>{item}</li>
                    ))}
                </ul>
            }
            {
                /* ----- FOOTER ----- */
                props.dropdown.footer && 
                    <div className="dropdown-footer">
                        {
                            props.dropdown.footer
                        }
                    </div>
            }
        </>
    )

    return (
        <>
            <div id='avatar' className={clsx('flex items-center space-x-4 relative focus:ring-4 focus:ring-gray-300', props.addedClass)} onClick={() => props.dropdown ? handleOnClick() : props.onClick}>
                <div className={clsx(!props.url && 'initial-avatar-bg', props.badge && 'flex-shrink-0', props.indicator && 'static')}>
                    {renderComponent()}
                </div>
                <div className={clsx('font-medium dark:text-white', props.textPosition === 'left' ? 'order-first flex flex-col flex-1 items-end justify-end' : 'order-last')}>
                    { props.text && <CustomLabel id='avatar-text' addedClass={clsx(props.textPosition === 'left' ? 'mr-2' : 'mr-0', 'truncate', 'text-black', props.textClass)} variant='default' children={truncateText(props.text, 20)} />}
                    { props.helperText &&  <div id='avatar-helper-text' className={clsx('text-sm text-gray-500 dark:text-gray-400 font-normal', props.textPosition === 'left' ? 'mr-2': 'mr-0', props.helperTextClass)}>{props.helperText}</div>}
                </div>
            </div>
           {
            props.dropdown &&
                <AnimatePresence mode='sync'>
                    <motion.div 
                        key={openDropdown}
                        initial={{ y: '-10px', opacity: 0 }}
                        animate={{ y: openDropdown ? 1 : '-10px', opacity: openDropdown ? 1 : 0,  transition: { type: 'spring', ease: 'easeInOut', bounce: .5 } }}
                        exit={{ y: '-10px', opacity: 0, transition: { type:'spring', ease: 'easeInOut' , bounce: 0.5 } }}
                        id="dropdownSearch" 
                        className={clsx('dropdown-default mt-11', props.dropdown.header && 'divide-y divide-gray-100', openDropdown ? '' : 'hidden')}
                    >
                        {
                            props.dropdown.isLoading 
                            ?   <div className='flex flex-col justify-center items-center p-5'>
                                    <CustomSpinner  />
                                    <CustomLabel variant='h6' children='Loading...' />
                                </div>
                            :  renderContent()
                        }
                    </motion.div>
                </AnimatePresence>
           }
        </>
    );
}

export default React.memo(CustomAvatar);