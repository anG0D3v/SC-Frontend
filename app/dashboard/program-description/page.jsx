'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
    CustomButton,
    CustomDataTable,
    CustomLabel,
    CustomOptionSelector,
    CustomSelect,
    CustomTag,
    CustomTemplate,
} from '@/components';
import useAppStore from '@/hooks/useAppStore';
import programdescriptionSlice, { programdescriptionFulfilled, programdescriptionPending } from '@/redux/reducer/program-description';
import ProgramescriptionServices from '@/services/programdescription';
import { ACTIONS, DATE_FORMAT, INITIAL_PAGE, STATUS } from '@/utils/constants';
import { capitalizeFirstLetter, getDeleteStatus, getLanguage, truncateText } from '@/utils/utils';


function Page(props) {

    // INITIALIZATION
    const tabs = [
        { id: 'all', name: 'All', key: 0, is_deleted: false },
        { id: STATUS.ACTIVE, name: 'Published', key: 1, is_deleted: false },
        { id: STATUS.DELETED, name: 'Deleted', key: 2, is_deleted: true },
    ];

    const actionBtns =  [
        { key: 0, name: 'Add New',  variant:'default', type: null, icon: <AiOutlinePlus size={15} /> },
    ]
    
    const [selectedTabFilter, setSelectedTabFilter] = useState(tabs[0]);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [searchValue, setSearchValue] = useState({ filter: 'all',
        keyword: '',
        is_deleted: false,});
    const [selectedItems, setSelectedItems] = useState([]);
    const [, setAction] = useState('');
    const [, setVisible] = useState(false);
    const clearSearchValue = () => {
        inputSearchRef.current.value = '';
       }

    const inputSearchRef = useRef(null);
    const programdescription = useAppStore(programdescriptionSlice.name);
    const dispatch = useDispatch();

    // FUNCTIONS
    const { isSuccess, data: programdescriptionData , isFetching, isLoading } = useQuery({
        queryKey: ['getProgramescription', page, searchValue],
        queryFn: async () => await ProgramescriptionServices.fetch(page, searchValue),
        keepPreviousData: true,
    })

    useEffect(() => {
        if(isFetching) {
            dispatch(programdescriptionPending())
        } else if(isSuccess) {
            dispatch(programdescriptionFulfilled(programdescriptionData?.data));
        }
    },[isSuccess, isFetching, dispatch]);

    const renderRecords = useMemo(
        () =>
            selectedTabFilter?.key === 0 ? programdescription?.items?.data : programdescription?.items?.data,
        [programdescription, selectedTabFilter],
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
    const actionButtons = () => 
        actionBtns.map(btn => ( 
            <CustomButton 
                // onClick={() => onProcessAction(ACTIONS.ADD)}
                id={`action-button-${btn.key}`}
                key={btn.key} 
                variant={btn.variant} 
                buttontype={btn.type} 
                icon={btn.icon} 
                text={btn.name} 
                addedClass='text-sm flex items-center justify-center'
            />
        ));
        
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
                    <CustomLabel text={truncateText(capitalizeFirstLetter(record?.translations[0]?.title), 100) ?? ''} variant='subtitle' addedClass="font-bold"/>
                );
            },
        },
        {
            key: 2,
            title: 'Language',
            width: '20px',
            render: (record) => {
                return (
                    <CustomLabel text={truncateText(getLanguage(record?.translations[0]?.language_id), 100) ?? ''} variant='subtitle' addedClass="font-bold"/>
                );
            },
        },
        {
            key: 3,
            dataIndex: 'houses',
            title: 'HOUSES',
            width: '50px',
            render: (houses) => <CustomLabel variant='subtitle' text={houses.map(item => item.name).join(', ') ?? ''} />
        },
        {
            key: 4,
            dataIndex: 'created_at',
            title: 'Date',
            width: '50px',
            render: (createAt) => {
                return (
                    <>
                        <CustomLabel text={moment.unix(createAt).format(DATE_FORMAT.MONTH_DAY_YEAR)} addedClass="mt-1" variant='subtitle'/>
                    </>
                );
            },
        },
        {
            key: 5,
            dataIndex: 'is_deleted',
            title: 'Status',
            width: '50px',
             render: (isDeleted) => <CustomTag
                content={getDeleteStatus(isDeleted)} 
                variant={isDeleted ?  'error' : 'success'} 
            />
        },
    ];
    
    return (
        <div>
             <CustomTemplate
                headerTitle='Program Description'
                tabItems={tabs}
                actionButtons={actionButtons()}
                onSelectTab={(item) => onTabFilterChange(item)}
            />
            <CustomDataTable 
                filter={  <CustomSelect 
                    labelClass='font-semibold'
                    placeholder='Select houses'
                    label='Select space'
                    addedClass='w-50'
                />}
                filterClasses={'w-70'}
                loading={isLoading}
                searchRef={inputSearchRef}
                placeholderSearch='Search title'
                columns={columns}
                source={renderRecords ?? []}
                variant='stripe'
                totalCount={programdescription?.items?.total}
                handleOnSearch={handleSearch}
                showCount={renderRecords?.length}
                currentPage={programdescription?.items?.current_page}
                lastPage={programdescription?.items?.last_page}
                onHandlePageChange={onHandlePageChange}
                onHandlePreviousPage={onHandlePreviousPage}
                onHandleNextPage={onHandleNextPage}
                onClickRow={(record) => showRecord(record, ACTIONS.VIEW)}
                onRefresh={() => ProgramescriptionServices.fetch(page, searchValue)}
            />   
        </div>
    );
}

export default Page;