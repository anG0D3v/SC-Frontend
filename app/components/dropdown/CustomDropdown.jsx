'use client';
import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { CustomButton, CustomInput, CustomLabel, CustomSpinner } from '..';

CustomDropdown.propTypes = {
    variant: PropTypes.oneOf(['outline', 'default', 'ghost', 'transparent']),
    items: PropTypes.array,
    header: PropTypes.any,
    footer: PropTypes.any,
    text: PropTypes.string,
    onChange: PropTypes.func,
    enableSearch: PropTypes.bool,
    searchValue: PropTypes.any,
    isLoading: PropTypes.bool
};

function CustomDropdown(props) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const handleOnClick = useCallback(() => {
        setOpenDropdown(!openDropdown)
    },[openDropdown]);

    // const renderItems = useMemo(() => props.items?.filter(item => props.searchValue !== '' && props.enableSearch ? item?.name?.toLowerCase().includes(props.searchValue?.toLowerCase()) : props.items ),[props.searchValue]);

    const renderContent = () => (
        <>
            {
                /* ----- HEADER ----- */
                props.header &&  
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    {props.header}
                </div>
            }
            {
                props.enableSearch && 
                <div className="p-3">
                    <CustomInput placeholder='Search user' onChange={props.onChange} value={props.searchValue} size='small' prefixicon={<BiSearch />}  />
                </div>
            }
            {
                /* ----- BODY ----- */
                
                props.items && 
                <ul className="py-2 space-y-0 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                    {props.items?.map((item, idx) => (
                        <li id={idx} key={idx}>{item}</li>
                    ))}
                </ul>
            }
            
            {
                /* ----- FOOTER ----- */
                props.footer && 
                    <div className="dropdown-footer">
                        {
                            props.footer
                        }
                    </div>
            }
        </>
    )

    return (
        <>
            {/* <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="peer/draft text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown search</button> */}
            <CustomButton 
                id="dropdownSearchButton" 
                data-dropdown-toggle="dropdownSearch" 
                data-dropdown-placement="bottom" 
                text={props.text} 
                variant={props.variant}
                icon={
                    <div
                        className={openDropdown ? 'animate-rotate180' : 'animate-rotate180reverse'}
                    >
                        {openDropdown ?  <TbChevronUp size={20}/> : <TbChevronDown size={20} />}
                    </div>
                } 
                iconPosition='right' 
                onClick={handleOnClick}  
            />
            <motion.div 
                layout
                initial={{ y: '-150px', opacity: 1 }}
                animate={{ y: openDropdown ? 7 : -10, opacity: openDropdown ? 1 : 0,  transition: { type: 'spring', ease: 'easeInOut', duration: 0.6, bounce: .5 } }}
                exit={{ y: 0, opacity: 0, transition: { type:'spring', duration: 0.6, ease: 'easeInOut' , bounce: 0.5 } }}
                id="dropdownSearch" 
                className={clsx('dropdown-default', props.header && 'divide-y divide-gray-100')}
            >
                {
                    props.isLoading 
                    ?   <div className='flex flex-col justify-center items-center p-5'>
                            <CustomSpinner  />
                            <CustomLabel variant='h6' children='Loading...' />
                        </div>
                    :  renderContent()
                }
            </motion.div>
        </>
    );
}

export default React.memo(CustomDropdown);