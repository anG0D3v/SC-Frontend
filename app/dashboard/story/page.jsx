'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {CustomDataTable, CustomLabel, CustomOptionSelector, CustomTag, CustomTemplate } from '@/components';
import useAppStore from '@/hooks/useAppStore';
import storiesSlice, { storiesPending, storiesFulfilled } from '@/redux/reducer/stories';
import userSlice from '@/redux/reducer/user';
import { StoriesServices } from '@/services';
import { ACTIONS, INITIAL_PAGE, STATUS } from '@/utils/constants';
import { capitalizeFirstLetter, getStatus } from '@/utils/utils';

function Page(props) {
    // Declaration
    const [page, setPage] = useState(INITIAL_PAGE);
    const dispatch = useDispatch();
    const tabs = [
        { id: STATUS.ALL.toUpperCase(), name: 'All', key: 0, is_deleted: false },
        { id: STATUS.DRAFT.toUpperCase(), name: 'Draft', key: 1, is_deleted: false },
        { id: STATUS.PENDING.toUpperCase(), name: 'Pending', key: 2, is_deleted: false },
        { id: STATUS.PUBLISHED.toUpperCase(), name: 'Published', key: 3, is_deleted: false },
        { id: STATUS.REJECT.toUpperCase(), name: 'Sent Back', key: 4, is_deleted: false },
        { id: STATUS.DELETED.toUpperCase(), name: 'Deleted', key: 5, is_deleted: true },
    ];
    const [selectedTabFilter, setSelectedTabFilter] = useState(tabs[0]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState({
        keyword: '',
        filter: '',
    });
    const inputSearchRef = useRef(null);
    const [, setStoryInfo] = useState({
        // id: '',
        // icon_id: 1,
        // name: '',
        // path: '',
        // houses: [1],
        // created_by: user?.info?.id,
        // updated_by: user?.info?.id,
    });

    // Redux Delarations
    const stories = useAppStore(storiesSlice.name);
    const userData = useAppStore(userSlice.name);

    //  DB
    const {
        isSuccess,
        data: storiesData,
        isFetching,
        isLoading,
    } = useQuery({
        queryKey: ['stories', page, searchValue],
        queryFn: async () => await StoriesServices.fetch(page, searchValue),
        keepPreviousData: false,
    });

    // const actionBtns = [
    //     {
    //         key: 0,
    //         name: 'Add Story',
    //         variant: 'default',
    //         type: null,
    //         icon: <AiOutlinePlus size={15} />
    //     }
    // ];

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
            dispatch(storiesPending());
        } else if (isSuccess) {
            dispatch(storiesFulfilled(storiesData?.data));
        }
    }, [isSuccess, isFetching, dispatch]);

    const renderRecords = useMemo(
        () =>
            selectedTabFilter?.key === 0 ? stories?.items?.data : stories?.items?.data,
        [stories, selectedTabFilter],
    );

    // Table & Pagination
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
            dataIndex: 'description',
            title: 'Description',
            width: '250px',
        },
        {
            key: 2,
            dataIndex: 'story_tags',
            title: 'Tags',
            width: '100px',
            render: (tags) => {
                return (
                    <div className="flex flex-row gap-1">
                        {tags?.map((tag, index) => {
                            return (
                                <CustomLabel
                                    key={index}
                                    text={capitalizeFirstLetter(tag?.name) ?? 'No tag'}
                                    addedClass={`p-2 bg-blue-500 rounded text-xs text-white`}
                                />
                            );
                        })}
                    </div>
                );
            },
        },
        {
            key: 3,
            dataIndex: 'user',
            title: 'author',
            width: '250px',
            render: (data) => (
                <CustomLabel
                    text={capitalizeFirstLetter(data?.first_name + ' ' + data?.last_name) ?? 'No tag'}
                    addedClass={` text-xs`}
                />
            ),
        },
        {
            key: 4,
            dataIndex: 'created_at',
            title: 'Date Submitted',
            width: '250px',
        },
        {
            key: 5,
            dataIndex: 'status',
            title: 'Status',
            width: '150px',
            render: (status) => (
                <CustomTag content={getStatus(status)} variant={status === 'DRA' ? 'info' : status === 'PEN' ? 'warning' :  status === 'REJ' ? 'error' : status === 'DEL' ? 'error' : 'success'} />
            ),
        },
    ];

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
        // setAction(act);
        // setModalVisibility(true);
        setStoryInfo((prevState) => ({
            ...prevState,
            id: record?.id,
            description: record?.description,
            user_id: record?.user_id,
            created_at: record?.created_at,
            updated_by: record?.updated_by ?? userData?.info?.id,
            is_deleted: record?.is_deleted,
        }));
    };

    // Rendered Components
    // const actionButtons = () => (
    //     actionBtns.map((btn) => (
    //         <CustomButton
    //             onClick={() => console.log('test')}
    //             id={`action-button-${btn.key}`}
    //             key={btn.key}
    //             variant={btn.variant}
    //             buttontype={btn.type}
    //             icon={btn.icon}
    //             text={btn.name}
    //             addedClass="text-sm flex items-center justify-center"
    //         />
    //     ))
    // )

    // const headerBtns =  [
    //     { key: 1, name: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
    //     { key: 2, name: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
    // ]

    //  /* ----- RENDER HEADER CUSTOM BUTTONS ----- */
    // const headerButtons = () => (
    //     headerBtns.map(btn => ( 
    //         <CustomButton id={`header-button-${btn.key}`} key={btn.key} variant={btn.variant} icon={btn.icon} text={btn.name} addedclass='text-sm flex items-center justify-center'/>
    //     ))
    // )

    return (
        <div>
            <CustomTemplate
                headerTitle="Stories"
                tabItems={tabs}
                headerClass='header'
                // headerActionButtons={headerButtons()}
                // actionButtons={actionButtons()}
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
                totalCount={stories?.items?.total}
                handleOnSearch={handleSearch}
                showCount={renderRecords?.length}
                currentPage={stories?.items?.current_page}
                lastPage={stories?.items?.last_page}
                onHandlePageChange={onHandlePageChange}
                onHandlePreviousPage={onHandlePreviousPage}
                onHandleNextPage={onHandleNextPage}
                onClickRow={(record) => showRecord(record, ACTIONS.VIEW)}
            />

            {/* MODAL */}
            {/* <CustomForm
                initialValues={linkInfo}
                validationSchema={addSocialLinkValidator}
                onSubmit={saveLink}
                content={(errors, touched) => renderModal(errors, touched)}
            /> */}

            {/* DELETE MODAL */}
            {/* <CustomModal
                onClose={() => setConfirmDelete(false)}
                visible={confirmDelete}
                headerTitle="Delete"
                children={renderPopupContent()}
                footer={!_.isEqual(action, ACTIONS.VIEW) && renderFooter()}
            /> */}
        </div>
    );
}

export default Page;