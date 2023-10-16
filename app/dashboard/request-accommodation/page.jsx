'use client';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdHistory } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { CustomDataTable, CustomLabel, CustomOptionSelector, CustomShowMore, CustomTemplate } from '@/components';
import useAppSlice from '@/hooks/useAppSlice';
import useAppStore from '@/hooks/useAppStore';
import requestAccomodationSlice, { requestAccomodationFulfilled, requestAccomodationPending } from '@/redux/reducer/request-accomodation';
import RequestAccomodationServices from '@/services/request-accomodation';
import { INITIAL_PAGE, STATUS } from '@/utils/constants';

function Page(props) {
    // Initialization
    const requestAccommodations = useAppStore(requestAccomodationSlice.name);
    const headerActionBtns = [
        { key: 0, text: 'History', variant: 'transparent', icon: <MdHistory /> }
    ]
    const actionBtns = [
        { key: 0, text: 'Add New', variant: 'default', icon: <AiOutlinePlus /> }
    ]
    const [page, ] = useState(INITIAL_PAGE);
    const dispatch = useDispatch();
    
    const tabs = [
        { key: 0, name: 'All', dataKey: '' },
        { key: 1, name: 'Mine', dataKey: STATUS.MINE },
        { key: 2, name: 'Deleted', dataKey: STATUS.DELETED },
    ];

    const [search, setSearch] = useState({
        user_id: useAppSlice().user?.info?.id,
        filterTab: '',
        keyword: ''
    })

    const { data: requestAccomodationData, isFetching, isSuccess, isFetched } = useQuery({
        queryKey: ['requestAccomodations', page, search],
        queryFn: () => RequestAccomodationServices.fetch(page, search),
        keepPreviousData: true,
    })

    const data = [
        {
            id: 0,
            category: 'What to Expect',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            created_by: 'Support Community',
            spaces: [
                {id: 0, name: 'Ronlad McDonald House'}
            ]
        }
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
            dataIndex: 'category',
            title: 'Category',
            width: '150px'
        },
        {
            key: 2,
            dataIndex: 'description',
            title: 'Description',
            width: '150px',
            render: (description) => <CustomShowMore text={description} />
        },
        {
            key: 3,
            dataIndex: 'created_by',
            title: 'Author',
            width: '150px'
        },
        {
            key: 4,
            dataIndex: 'spaces',
            title: 'Space',
            width: '150px',
            render: (spaces) => spaces?.map((space, idx) => <CustomLabel children={space.name} key={idx} />)
        }
    ]

    // Functions
    useEffect(() => {
        if(isFetching) {
            dispatch(requestAccomodationPending())
        } else if(isFetched && isSuccess) {
            dispatch(requestAccomodationFulfilled(requestAccomodationData?.data?.requestAccommodations))
        }
    },[dispatch, isFetching, isSuccess])

    const onTabChanged = useCallback((item) => {
        setSearch(prevState => ({
            ...prevState,
            filterTab: item
        }))
    },[]);

    // Rendered Components

    return (
        <div>
            <CustomTemplate
                tabItems={tabs}
                onSelectTab={(item) => onTabChanged(item)}
                headerTitle="Request Accommodation"
                headerActionButtons={headerActionBtns}
                actionButtons={actionBtns}
            />

            <CustomDataTable 
                variant='stripe'
                source={requestAccommodations ?? data}
                columns={columns}
                onClickRow={(item) => console.log(item)}
            />
        </div>
    );
}

export default Page;