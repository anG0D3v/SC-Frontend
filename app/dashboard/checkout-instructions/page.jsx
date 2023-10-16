'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BiPlus } from 'react-icons/bi';
import { BsFillGearFill } from 'react-icons/bs';
import { MdHistory } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
    CustomDataTable,
    CustomLabel,
    CustomOptionSelector,
    CustomTag,
    CustomTemplate,
} from '@/components';
import useAppStore from '@/hooks/useAppStore';
import checkoutInstructionSlice, { checkoutInstructionFulfilled, checkoutInstructionPending } from '@/redux/reducer/checkout-instruction';
import userSlice from '@/redux/reducer/user';
import CheckoutInstructionServices from '@/services/checkout-instruction';
import { ACTIONS, INITIAL_PAGE, STATUS } from '@/utils/constants';
import { capitalizeFirstLetter, checkLanguage, isDeleted, removeHtmlTags, truncateValue, unixTimestampToDateTime } from '@/utils/utils';

function Page() {

    // Redux Delarations
    const checkoutInstruction = useAppStore(checkoutInstructionSlice.name);
    const userData = useAppStore(userSlice.name);

    const [page, setPage] = useState(INITIAL_PAGE);
    const dispatch = useDispatch();
    const tabs = [
        { id: STATUS.MINE.toUpperCase(), name: 'Mine', key: 0, is_deleted: false },
        { id: STATUS.PUBLISHED.toUpperCase(), name: 'Published', key: 1, is_deleted: false },
        { id: STATUS.DELETED.toUpperCase(), name: 'Deleted', key: 2, is_deleted: true },
    ];

    const [selectedTabFilter, setSelectedTabFilter] = useState(tabs[0]);
    const [selectedItems, setSelectedItems] = useState([]);

    const [searchValue, setSearchValue] = useState({
        user_id: userData?.info?.id,
        language: userData?.info?.language_id,
        keyword: '',
        filter: '',
    });

     /* ----- HEADER BUTTONS ----- */
     const headerBtns =  [
        { key: 1, text: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
        { key: 2, text: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
    ]

    /* ----- ACTION BUTTONS ----- */
    const actionBtns =  [
        // { key: 0, name: 'Delete',  variant:'default', type: 'error', icon: <BsFillTrashFill size={15} /> },
        { key: 1, text: 'Add New Content',  variant:'default',  icon: <BiPlus size={15} /> },
        { key: 2, text: 'Add New Category', variant:'ghost',  icon: <BiPlus size={15} /> },
    ]

    const inputSearchRef = useRef(null);
    const [, setCheckoutInstructionContent] = useState({
        // id: '',
        // icon_id: 1,
        // name: '',
        // path: '',
        // houses: [1],
        // created_by: user?.info?.id,
        // updated_by: user?.info?.id,
    });
    
    //  DB
    const {
        isSuccess,
        data: checkoutInstructionData,
        isFetching,
        isLoading,
    } = useQuery({
        queryKey: ['checkoutInstruction', page, searchValue],
        queryFn: async () => await CheckoutInstructionServices.fetch(page, searchValue),
        keepPreviousData: false,
    });

    const clearSearchValue = () => {
        inputSearchRef.current.value = '';
    }

   // Functions
   const onTabFilterChange = (item) => {
       setPage(INITIAL_PAGE);
       setSelectedTabFilter(item);
       clearSearchValue();
       setSearchValue((prevSearchValue) => ({
           ...prevSearchValue,
           filter: item.id,
           keyword: '',
       }));
   };

   const handleSearch = useCallback((e) => {
        setPage(INITIAL_PAGE);
        setSearchValue((prevSearchValue) => ({
            ...prevSearchValue,
            keyword: inputSearchRef.current.value,
        }));
    }, []);

    const handleSelectAll = useCallback(
        (records) => {
            if (selectedItems.length === records?.length) {
                setSelectedItems([]);
            } else {
                const allIds = records?.map((item) => item.id);
                setSelectedItems(allIds);
            }
        },
        [selectedItems],
    );

    const handleCheckboxChange = (itemId) => {
        const isChecked = selectedItems.includes(itemId);
        if (isChecked) {
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            setSelectedItems((prevCheckedItems) => [...prevCheckedItems, itemId]);
        }
    };

    useEffect(() => {
        if (isFetching) {
            dispatch(checkoutInstructionPending());
        } else if (isSuccess) {
            dispatch(checkoutInstructionFulfilled(checkoutInstructionData?.data));
            
        }
    }, [isSuccess, isFetching, dispatch]);

    const renderRecords = useMemo(
        () =>
            selectedTabFilter?.key === 0 ? checkoutInstruction?.items?.data : checkoutInstruction?.items?.data,
        [checkoutInstruction, selectedTabFilter],
    );


    const onHandlePageChange = (newPage) => {
        setPage(newPage);
    };

    const onHandlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const onHandleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const showRecord = (record, act) => {
        setCheckoutInstructionContent((prevState) => ({
            ...prevState,
            id: record?.id,
            description: record?.description,
            user_id: record?.user_id,
            created_at: record?.created_at,
            updated_by: record?.updated_by ?? userData?.info?.id,
            is_deleted: record?.is_deleted,
        }));
    };

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
                <CustomOptionSelector type="checkbox" checked={selectedItems.includes(record)} onChange={() => handleCheckboxChange(record)} />
            ),
            width: '10px',
        },
        {
            key: 1,
            dataIndex: 'translations',
            title: 'description',
            width: '100px',
            render: (translations) => {
                return (
                    !translations || translations.length === 0
                        ? (
                            <CustomLabel
                                children='No description'
                                addedClass='text-xs italic'
                            />
                        )
                        : (
                            <div className="flex flex-row gap-1">
                                {translations?.map((translation, index) => (
                                    <CustomLabel
                                        key={index}
                                        children={truncateValue(removeHtmlTags(translation?.description))}
                                    />
                                ))}
                            </div>
                        )
                );
            },

        },
        {
            key: 2,
            dataIndex: 'houses',
            title: 'space',
            width: '100px',
            render: (houses) => {
                return (
                    !houses || houses.length === 0
                    ? (
                        <CustomLabel
                            text='No spaces found'
                            addedClass='text-xs italic'
                        />
                    )
                    : (
                        <div className="flex flex-row gap-1">
                            {houses?.map((house, index) => (
                                <CustomLabel
                                    key={index}
                                    text={house.name}
                                />
                            ))}
                        </div>
                    )
                );
            },
        },
        {
            key: 3,
            dataIndex: 'translations',
            title: 'Language',
            width: '20px',
            render: (translations) => {
                 return (
                    !translations || translations.length === 0
                        ? (
                            <CustomLabel
                                text='No language selected'
                                addedClass='text-xs italic'
                            />
                        )
                        : (
                            <div className="flex flex-row gap-1">
                                {translations?.map((translation, index) => (
                                    <CustomLabel
                                        key={index}
                                        text={checkLanguage(translations)}
                                    />
                                ))}
                            </div>
                        )
                );
            },
        },
        {
            key: 4,
            dataIndex: 'created_by_user',
            title: 'created by',
            width: '250px',
            render: (createdBy) => (
                <CustomLabel
                    text={capitalizeFirstLetter(createdBy?.first_name + ' ' + createdBy?.last_name) ?? 'No tag'}
                    addedClass='text-xs'
                />
            ),
        },
        {
            key: 5,
            dataIndex: 'created_at',
            title: 'Date Created',
            width: '250px',
            render: (createdAt) => (
                <span>{unixTimestampToDateTime(createdAt)}</span>        
            ),
        },
        {
            key: 6,
            dataIndex: 'is_deleted',
            title: 'Status',
            width: '150px',
            render: (deleted) => (
                 <CustomTag content={isDeleted(deleted)} variant={deleted ? 'error' : 'success'} />
            )
        },
    ];

    return (
        <div>
            <CustomTemplate
                headerTitle='Checkout Instructions' 
                headerClass='header'
                headerActionButtons={headerBtns}
                actionButtons={actionBtns}
                tabItems={tabs}
                onSelectTab={(item) => onTabFilterChange(item)}
            />

             {/* TABLE */}
             <CustomDataTable
                loading={isLoading}
                searchRef={inputSearchRef}
                placeholderSearch="Search Link"
                columns={columns}
                source={renderRecords ?? []}
                variant="stripe"
                totalCount={checkoutInstruction?.items?.total}
                handleOnSearch={handleSearch}
                showCount={renderRecords?.length}
                currentPage={checkoutInstruction?.items?.current_page}
                lastPage={checkoutInstruction?.items?.last_page}
                onHandlePageChange={onHandlePageChange}
                onHandlePreviousPage={onHandlePreviousPage}
                onHandleNextPage={onHandleNextPage}
                onClickRow={(record) => showRecord(record, ACTIONS.VIEW)}
            />
        </div>
    );
}

export default Page;