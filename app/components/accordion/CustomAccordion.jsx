'use client';

import React, { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

CustomAccordion.propTypes = {
    header: PropTypes.string,
    children: PropTypes.any,
    iconRight: PropTypes.node,
    iconLeft: PropTypes.node,
    addedClass: PropTypes.any,
    id: PropTypes.any,
    content: PropTypes.any,
    variant: PropTypes.oneOf(['card', 'transparent']),
    isOpenOnLoad: PropTypes.bool,
    isCollapsible: PropTypes.bool
};

function CustomAccordion(props) {
    const { isCollapsible = true, isOpenOnLoad = false } = props;
    const contentElement = useRef();
    const [open, setOpen] = useState(isOpenOnLoad);
    const variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 20, }
        },
        closed: { 
            opacity: 0, y: 20, transition: { duration: 0.2 } 
        }
    }

    const onHandleToggle = useCallback((index) => {
        setOpen(!open)
    },[open]);

    return (
    <div id={`accordion-card-${props.id}`} key={props.id} className={clsx('mb-3 overflow-hidden', props.variant === 'card' ? 'rc-acccordion-card rounded' : 'rounded' ,props.addedClass)}>
            <button id='accordion-btn' onClick={() => isCollapsible ? onHandleToggle(props.id) : null} className={clsx('inline-flex items-center justify-between bg-gray-200 w-full p-2', props.variant === 'transparent' && 'rounded border')}>
               <div className='inline-flex items-center '>
                    {
                        <div id="icon-left" className='px-2'>
                            {
                                props.iconLeft
                            }
                        </div>
                    }
                    {props.header}
               </div>
                {
                    <div id={props.id} className={clsx('px-2', open ? 'rotate-45 ease-in duration-150' : 'rotate-0 ease-in duration-150')}>
                        {
                            props.iconRight
                        }
                    </div>
                }
            </button>
            <div ref={contentElement} className={clsx('rc-collapse', open ? 'show' : 'hide') }
                style={
                   open
                        ? { height: contentElement?.current?.scrollHeight }
                        : { height: '0' }
                }
            >
                <div className='rc-accordion-body overflow-auto'>
                   <motion.div animate={open ? 'open' : 'closed'} variants={variants}>
                        {
                            props.content
                        }
                   </motion.div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(CustomAccordion);