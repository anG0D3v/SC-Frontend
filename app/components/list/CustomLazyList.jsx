'use client'
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomButton, CustomLabel } from '..';

CustomLazyList.propTypes = {
    items: PropTypes.array,
    limit: PropTypes.number, // Will show the number of items you want to display
};

function CustomLazyList(props) {
    // Initialization
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen(!isOpen);
    },[isOpen])

    const renderedItems = () => {
        const itemsArray = props.items;
        const itemLimit = props.limit;

        if (isOpen || itemLimit >= itemsArray.length) {
            return itemsArray;
        } else {
            return itemsArray.slice(0, itemLimit);
        }
    }

    const renderRemainingCount = () => {
        const itemsArray = props.items;
        const itemLimit = props.limit;

        if (!isOpen && itemLimit < itemsArray.length) {
            const remainingCount = itemsArray.length - itemLimit;
            return <CustomButton 
                        onClick={toggle}
                        variant='link'
                        children={
                            <span>
                                and {' '}
                                <span className='text-blue-700 hover:underline'>
                                    {remainingCount} other{remainingCount === 1 ? '' : 's'}
                                </span>
                            </span>
                        }
                    />;
        }

        return itemLimit !== itemsArray.length && itemLimit <= itemsArray.length && 
        <CustomButton onClick={toggle} variant='link' children='Hide' />
    }

    return (
        <div
            {...props}
            className={clsx('flex flex-shrink items-center justify-start flex-wrap gap-1 text-black')}
        >
            {
                renderedItems().map((item, idx) => (
                    [
                        <CustomLabel children={item} key={idx} />, 
                        idx < renderedItems().length - 1 && ', ',
                    ]
                ))
            }
            {
                renderRemainingCount()
            }
        </div>
    );
}

export default CustomLazyList;