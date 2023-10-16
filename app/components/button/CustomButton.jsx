/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CustomSpinner } from '../index';

CustomButton.propTypes = {
    text: PropTypes.any,
    variant: PropTypes.oneOf(['outline', 'default', 'icon', 'ghost', 'transparent', 'soft', 'link']),
    buttontype: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    type: PropTypes.any,
    onClick: PropTypes.func,
    addedClass: PropTypes.any,
    icon: PropTypes.any,
    children: PropTypes.any,
    rounded: PropTypes.bool,
    isLoading: PropTypes.bool,
    disabled: PropTypes.any,
    colorScheme: PropTypes.any,
    iconPosition: PropTypes.oneOf(['right', 'left']),
    iconClasses: PropTypes.any,
    textClasses: PropTypes.any,
    size:  PropTypes.oneOf(['small', 'medium', 'large']),
    component: PropTypes.string,
    sourceLink: PropTypes.any
};

function CustomButton(props) {
    const { ...extraProps } = props;
    delete extraProps.buttonType;
    delete extraProps.addedClass;
    delete extraProps.iconPosition;
    delete extraProps.iconClasses;
    delete extraProps.isLoading;

    let className = null;
    let extendersClass = null;

    if (!_.isNil(props.variant) && !_.isNil(props.buttontype)) {
        if (
            _.isEqual(props.variant, 'default') &&
            _.isEqual(props.buttontype, 'success')
        ) {
            className = 'btn-solid-success';
        } else if (
            _.isEqual(props.variant, 'outline') &&
            _.isEqual(props.buttontype, 'success')
        ) {
            className = 'btn-outline-success';
        } else if (
            _.isEqual(props.variant, 'default') &&
            _.isEqual(props.buttontype, 'error')
        ) {
            className = 'btn-solid-error';
        } else if (
            _.isEqual(props.variant, 'default') &&
            _.isEqual(props.buttontype, 'warning')
        ) {
            className = 'btn-solid-warning';
        } else if (
            _.isEqual(props.variant, 'outline') &&
            _.isEqual(props.buttontype, 'error')
        ) {
            className = 'btn-outline-error';
        } else if (
            _.isEqual(props.variant, 'outline') &&
            _.isEqual(props.buttontype, 'warning')
        ) {
            className = 'btn-outline-warning';
        } else if(_.isEqual(props.variant, 'soft') && _.isEqual(props.buttontype, 'error')) {
            className = 'btn-soft-error';
        } else if(_.isEqual(props.variant, 'soft') && _.isEqual(props.buttontype, 'success')) {
            className = 'btn-soft-success';
        } else if(_.isEqual(props.variant, 'soft') && _.isEqual(props.buttontype, 'warning')) {
            className = 'btn-soft-warning';
        } else if(_.isEqual(props.variant, 'soft') && _.isEqual(props.buttontype, 'info')) {
            className = 'btn-soft-info';
        } 
    } else if (!_.isNil(props.variant)) {
        if (_.isEqual(props.variant, 'default')) {
            className = 'btn';
        } else if (_.isEqual(props.variant, 'outline')) {
            className = 'btn-outline';
        } else if(_.isEqual(props.variant, 'transparent')) {
            className = 'btn-transparent';
        } else if(_.isEqual(props.variant, 'ghost')) {
            className = 'btn-ghost';
        }
    } else {
        className = 'btn-no-variant';
    }
    if (_.isNil(props.text) && !_.isNil(props.icon)) {
        extendersClass = 'flex items-center justify-center text-center';
    } else if (!_.isNil(props.text) && !_.isNil(props.icon)) {
        extendersClass = 'flex flex-row items-center gap-2';
    }

    return (
        props.variant === 'link'
        ?   <Link className='link' href={props.sourceLink ?? '#'} prefetch={false} {...props}>
                {props.children}
            </Link>
        :   <motion.button
                {...extraProps}
                disabled={props.isLoading || props.disabled}
                onClick={props.onClick}
                type={props.type || 'button'}
                className={clsx(
                    props.addedClass,
                    className,
                    extendersClass,
                    `hover:bg-[${props.colorScheme}] hover:border-[${props.colorScheme}]`,
                    props.isLoading ? 'bg-gray-500' : ''
                )}
            >
                {props.isLoading ? (
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <CustomSpinner color='white' />
                        <h6 className="text-sm">Loading...</h6>
                    </div>
                ) : (
                    props.icon && props.text ? 
                        <div className={clsx('flex flex-row items-center w-full gap-1 md:gap-2', props.iconPosition === 'right' && 'justify-between')}>
                            <div className={clsx(props.iconPosition === 'right' ? ' order-last' : 'order-first', props.iconClasses,)}>
                                {props.icon}
                            </div>
                            {props.text && <span className="text-xs md:text-base">{props.text}</span>}
                            {props.children}
                        </div>
                    : props.text
                        ?   <div className={clsx('flex items-center justify-center', props.textClasses)}>
                                {props.text && <span>{props.text}</span>}
                                {props.children}
                            </div>
                        :   <div className={clsx('flex items-center justify-center', props.iconClasses)}>
                                {props.icon}
                            </div>
                )}
            </motion.button>
    );
}

export default React.memo(CustomButton);
