'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
    CustomDataTable,
    CustomLabel,
    CustomOptionSelector,
    CustomSelect,
    CustomTemplate,
} from '@/components';
import useAppStore from '@/hooks/useAppStore';
import announcementSlice, { announcementsFulfilled, announcementsPending } from '@/redux/reducer/announcements';
import AnnouncementServices from '@/services/announcements';
import { ACTIONS, DATE_FORMAT, INITIAL_PAGE, STATUS } from '@/utils/constants';
import { capitalizeFirstLetter, getAnnouncementStatus, getLanguage, truncateText } from '@/utils/utils';

function Page(props) {

    // INITIALIZATION
    const tabs = [
        { id: 'all', name: 'All', key: 0, is_deleted: false },
        { id: STATUS.SENT, name: 'Send', key: 1, is_deleted: false },
        { id: STATUS.SCHEDULED, name: 'Scheduled', key: 2, is_deleted: false },
        { id: STATUS.SAVED, name: 'Draft', key: 3, is_deleted: false },
        { id: STATUS.TRASHED, name: 'Deleted', key: 4, is_deleted: true },
    ];

    const actionBtns =  [
        { key: 0, text: 'Create Announcement',  variant:'default', type: null, icon: <AiOutlinePlus size={15} /> },
    ]
    
    const [selectedTabFilter, setSelectedTabFilter] = useState(tabs[0]);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [searchValue, setSearchValue] = useState(tabs[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [, setAction] = useState('');
    const [, setVisible] = useState(false);
    const clearSearchValue = () => {
        inputSearchRef.current.value = '';
       }
    // const [, setConfirmDelete] = useState(false);

    const inputSearchRef = useRef(null);
    const announcements = useAppStore(announcementSlice.name);
    const dispatch = useDispatch();

    const { isSuccess, data: announcementData , isFetching, isLoading } = useQuery({
        queryKey: ['getAnnouncements', page, searchValue],
        queryFn: async () => await AnnouncementServices.fetch(page, searchValue),
        keepPreviousData: true,
    })

    // FUNCTIONS
    useEffect(() => {
        if(isFetching) {
            dispatch(announcementsPending())
        } else if(isSuccess) {
            dispatch(announcementsFulfilled(announcementData?.data));
        }
    },[isSuccess, isFetching, dispatch]);

    const renderRecords = useMemo(
        () =>
            selectedTabFilter?.key === 0 ? announcements?.items?.data : announcements?.items?.data,
        [announcements, selectedTabFilter],
    );

    const onTabFilterChange = (item) => {
        setPage(INITIAL_PAGE);
        setSelectedTabFilter(item);
        clearSearchValue();
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            filter: item.id,
            keyword: '',
            is_deleted: item.is_deleted,
        }));
    }

    const handleSelectAll = useCallback((records) => {
       
        if (selectedItems.length === records?.length) {
            setSelectedItems([])
        } else {
            const allIds = records?.map((item) => item.id);
            setSelectedItems(allIds);
        }
    },[selectedItems]);

    const handleCheckboxChange = (itemId) => {
        const isChecked = selectedItems.includes(itemId);
        if (isChecked) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems((prevCheckedItems) => [...prevCheckedItems, itemId]);
        }
    };

    const handleSearch = useCallback((e) => {
        setPage(INITIAL_PAGE);
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            keyword: inputSearchRef.current.value,
        }));
    },[])

    const onHandlePageChange = (newPage) => {
        setPage(newPage);
    };

    const onHandlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const onHandleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const setModalVisibility = (state) => {
        setVisible(state);
    }

    // const setConfirmVisibility = (state) => {
    //     setConfirmDelete(state);
    // }

    // setConfirmVisibility(false);
    
    const showRecord = (record, act) => {
        setAction(act);
        setModalVisibility(true);
        // setLinkInfo(prevState => ({
        //     ...prevState,
        //     id: record?.id,
        //     name: record?.name,
        //     icon_id: record?.icon_id ?? 1,
        //     path: record?.path,
        //     created_by: record?.created_by,
        //     updated_by: record?.updated_by ?? user?.info?.id
        // }))
    };

    // RENDER COMPONENTS
    
    const renderHouse = () => {
        return (
            <CustomSelect 
                    labelClass='font-semibold'
                    placeholder='Select houses'
                    label='Select space'
                    addedClass='w-50'
                />
        );
    }
    
    const columns = [
        {
            key: 0,
            dataIndex: 'id',
            component: (records) => (
                <CustomOptionSelector 
                    type="checkbox" 
                    checked={renderRecords?.length !== 0 && selectedItems.length === renderRecords?.length} 
                    onChange={() => handleSelectAll(records)}
                />
            ),
            render: (record) => (
                <CustomOptionSelector 
                    type="checkbox" 
                    checked={selectedItems.includes(record)}
                    onChange={() => handleCheckboxChange(record)}
                />
            ),
            width: '10px'
        },
        {
            key: 1,
            title: 'Title',
            width: '50px',
            render: (record) => {
                return (
                    <CustomLabel 
                        text={truncateText(capitalizeFirstLetter(record?.translations[0]?.title), 100) ?? ''} 
                        variant='subtitle' 
                        addedClass="font-bold"/>
                );
            },
        },
        {
            key: 2,
            title: 'Description',
            width: '20px',
            render: (record) => {
                return (
                    <CustomLabel 
                        text={truncateText(capitalizeFirstLetter(record?.translations[0]?.description), 100) ?? ''} 
                        variant='subtitle' 
                        addedClass="font-bold"/>
                );
            },
        },
        {
            key: 3,
            title: 'Status',
            width: '20px',
            render: (record) => {
                return (
                    <>
                        <CustomLabel 
                            text={truncateText(capitalizeFirstLetter(getAnnouncementStatus(record?.status)), 100) ?? ''} 
                            variant='subtitle' 
                            addedClass="rounded text-center text-green-700 bg-green-300/30 border-green-600 py-1 px-2 border-b-gray-300 text-xs"/>
                        <CustomLabel 
                            text={record?.date_sent !== 0 && 'Sent : ' + moment.unix(record?.date_sent).format(DATE_FORMAT.MONTH_DAY_YEAR_TIME)} 
                            addedClass="mt-1" 
                            variant='subtitle'/> 
                        <CustomLabel 
                             text={record?.created_at && 'Created : ' + moment.unix(record?.created_at).format(DATE_FORMAT.MONTH_DAY_YEAR)} 
                            addedClass="mt-1" 
                            variant='subtitle'/>
                    </>
                );
            },
        },
        {
            key: 4,
            dataIndex: 'author',
            title: 'Author',
            width: '50px',
            render: (author) => <CustomLabel children={author?.first_name + ' ' + author?.last_name ?? 'No user'} variant='subtitle' />
        },
        {
            key: 5,
            dataIndex: 'houses',
            title: 'House',
            width: '50px',
            render: (houses) => <CustomLabel variant='subtitle' children={houses.map(item => item.name).join(', ') ?? ''} />
        },
        {
            key: 5,
            dataIndex: 'translations',
            title: 'Language',
            width: '50px',
            render: (record) => <CustomLabel children={getLanguage(record.language_id ?? '')} variant='subtitle'/>
        }
    ];
    
    return (
        <div>
             <CustomTemplate
                headerTitle='Announcements'
                tabItems={tabs}
                actionButtons={actionBtns}
                onSelectTab={(item) => onTabFilterChange(item)}
            />
            <CustomDataTable 
                filter={renderHouse()}
                filterClasses='w-70'
                loading={isLoading}
                searchRef={inputSearchRef}
                placeholderSearch='Search announcement'
                columns={columns}
                source={renderRecords ?? []}
                variant='stripe'
                totalCount={announcements?.items?.total}
                handleOnSearch={handleSearch}
                showCount={renderRecords?.length}
                currentPage={announcements?.items?.current_page}
                lastPage={announcements?.items?.last_page}
                onHandlePageChange={onHandlePageChange}
                onHandlePreviousPage={onHandlePreviousPage}
                onHandleNextPage={onHandleNextPage}
                onClickRow={(record) => showRecord(record, ACTIONS.VIEW)}
                onRefresh={() => AnnouncementServices.fetch(page, searchValue)}
            />   
        </div>
       
    );
}

export default Page;