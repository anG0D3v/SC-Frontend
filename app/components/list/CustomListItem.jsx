'use client'
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CustomLabel } from '..';

CustomListItem.propTypes = {
    text: PropTypes.node,
    avatar: PropTypes.node,
    avatarURL: PropTypes.any,
    icon: PropTypes.node,
    iconColor: PropTypes.any,
    iconClass: PropTypes.any,
    helperText: PropTypes.any,
    url: PropTypes.string,
    active: PropTypes.bool,
    isLoading: PropTypes.bool,
    addedClass: PropTypes.any,
};

function CustomListItem(props) {
    return (
        <div className='divide-y divide-gray-700'>
            {
                props.isLoading
                    ?   <div id='loader' className="w-full bg-gray-200 rounded-full animate-pulse p-2 hover:cursor-pointer"></div>
                    :   <Link href={props.url ?? '#'} prefetch={false} className={clsx('list-default', props.active ? 'rc-active-list' : '', props.addedClass)}>
                            {
                                props.icon
                            }
                            {
                                <div className="flex-shrink-0">
                                {
                                    props.avatar
                                }
                                </div>
                            }
                            {
                                props.text &&
                                <div className={clsx('w-full', props.icon || props.avatar ? 'pl-3' : 'pl-0')}>
                                    <div className={clsx('text-gray-500 text-sm dark:text-gray-400', props.active ? 'text-white' : '')}>
                                        <CustomLabel children={props.text} addedClass={clsx('text-black', props.active ? 'text-white' :'')} />
                                    </div>
                                    <div className={props.active ? 'text-white' : ''}>
                                        {props.helperText}
                                    </div>
                                </div>
                            }
                        </Link>
            }
            
        </div>
    );
}

export default React.memo(CustomListItem);