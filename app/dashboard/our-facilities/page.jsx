'use client';
import { useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import {
    CustomDataTable,
    CustomLazyList,
    CustomOptionSelector,
    CustomTag,
    CustomTemplate,
} from '@/components';

function Page(props) {
    // Initialization
    const tabs = [
        { key: 0, name: 'All', dataKey: '' },
        { key: 1, name: 'Published', dataKey: 'Published' },
        { key: 2, name: 'Unpublished', dataKey: 'Unpublished' },
    ];

    const [selectedTab, setSelectedTab] = useState(tabs[0].dataKey)

    const headerBtns =  [
        { key: 0, text: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
    ]

    const actionBtns =  [
        { key: 0, text: 'Add New ',  variant:'default', type: null, icon: <AiOutlinePlus size={15} /> },
    ]

    const data =  [
        {   key: 0, 
            title: 'Guest Room',  
            spaces: [
                { key: 0, name: 'Ronald McDonald Family Room CHOC at Mission' },
            ],
            languages: [
                { key: 0, name: 'English' },
                { key: 1, name: 'Spanish' }
            ],
            status: 'Published'
        },
        {   key: 1, 
            title: 'Kitchen',  
            spaces: [
                { key: 0, name: 'Ronald McDonald Family Room CHOC at Mission' },
                { key: 1, name: 'Ronald McDonald Family Room CHOC at Mission' },
                { key: 2, name: 'Ronald McDonald Family Room CHOC at Mission' },
            ],
            languages: [
                { key: 0, name: 'English' },
                { key: 1, name: 'Spanish' }
            ],
            status: 'Published'
        },
        {   key: 2, 
            title: 'Dining Room',  
            spaces: [
                { key: 0, name: 'Ronald McDonald Family Room CHOC at Mission' },
                { key: 1, name: 'Ronald McDonald Family Room CHOC at Mission' },
            ],
            languages: [
                { key: 0, name: 'English' },
                { key: 1, name: 'Spanish' }
            ],
            status: 'Unpublished'
        },
    ]

    const columns = [
        {
            key: 0,
            dataIndex: 'id',
            component: (records) => (
                <CustomOptionSelector 
                    type="checkbox" 
                    // checked={renderRecords?.length !== 0 && selectedItems.length === renderRecords?.length} 
                    // onChange={() => handleSelectAll(records)}
                />
            ),
            render: (record) => (
                <CustomOptionSelector 
                    type="checkbox" 
                    // checked={selectedItems.includes(record)}
                    // onChange={() => handleCheckboxChange(record)}
                />
            ),
            width: '10px'
        },
        {
            key: 1,
            dataIndex: 'title',
            title: 'Title',
            width: '150px'
        },
        {
            key: 2,
            dataIndex: 'spaces',
            title: 'Spaces',
            width: '150px',
            render: (spaces) => <CustomLazyList items={spaces?.map(space => space.name)} limit={spaces?.length > 1 || 1 } />
        },
        {
            key: 2,
            dataIndex: 'languages',
            title: 'Language(s)',
            width: '150px',
            render: (languages) => <CustomLazyList items={languages?.map(language => language.name)} limit={2} />
        },
        {
            key: 3,
            dataIndex: 'status',
            title: 'Status',
            width: '150px',
            render: (status) => <CustomTag 
                content={status} 
                variant={status === 'Published' ? 'success' : 'error'} 
                size='small' addedClass='border-0' 
                labelClass={status === 'Published' ? 'text-green-900' : 'text-red-900'}  
            />
        },
    ];

    // Functions
    const onSelectedTab = (tab) => {
        setSelectedTab(tab?.dataKey)
    }

    const renderRecords = useMemo(() =>
        data?.filter((item) => selectedTab !== tabs[0].dataKey ? item.status === selectedTab : item),
    [selectedTab])  

    // Rendered Components
    
    return (
        <div>
            <CustomTemplate 
                headerTitle='Our Facilities'
                headerActionButtons={headerBtns}
                actionButtons={actionBtns}
                tabItems={tabs}
                onSelectTab={(item) => onSelectedTab(item)}
            />
            <CustomDataTable 
                variant='stripe'
                totalCount={data?.length}
                showCount={data?.length}
                source={renderRecords ?? []}
                onClickRow={(item) => console.log(item)}
                columns={columns}
            />
        </div>
    );
}

export default Page;