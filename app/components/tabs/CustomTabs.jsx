'use client';

import { useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { CustomButton } from '..';

CustomTabs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            key: PropTypes.any.isRequired,
            id: PropTypes.any,
            icon: PropTypes.any
        })
    ).isRequired,
    onSelectTab: PropTypes.any
};

function CustomTabs(props) {
    const [activeTab, setActiveTab] = useState({...props.items[0]})

    const handleSelectTab = useCallback(item => {
        setActiveTab(item);
    },[])

    return (
        <>
            {props.items && (
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        {props.items?.map((item, idx) => (
                            <li key={`tab-${item.key}`} className="flex flex-row mr-2 flex-wrap" role="tab">
                                <CustomButton
                                    key={idx}
                                    addedClass={clsx('tab-header', activeTab?.key === item.key && 'active-tab')}
                                    type="button"
                                    role="tab"
                                    icon={item.icon}
                                    aria-controls={item.name}
                                    aria-selected="false"
                                    id={`tab-${item.key}`}
                                    text={item.name}
                                    onClick={() => [handleSelectTab(item), props.onSelectTab(item)]}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default CustomTabs;