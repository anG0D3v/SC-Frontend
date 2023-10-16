'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiLink } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FaConnectdevelop } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { CustomButton, CustomDataTable, CustomForm, CustomInput, CustomLabel, CustomModal, CustomOptionSelector, CustomTag, CustomTemplate } from '@/components';
import useAppStore from '@/hooks/useAppStore';
import socialLinkSlice, { linksPending, linksFulfilled, addLinksFulfilled, updateLinksFulfilled } from '@/redux/reducer/social-links';
import userSlice from '@/redux/reducer/user';
import { SocialLinkServices } from '@/services';
import { ACTIONS, INITIAL_PAGE } from '@/utils/constants';
import showToaster from '@/utils/toast';
import { capitalizeFirstLetter, getDeleteStatus } from '@/utils/utils';
import { addSocialLinkValidator } from '@/validation/social-link';

function Page(props) {
    // Initialization
    const queryClient = useQueryClient();
    const tabs = [
        { id: 'all', name: 'All', key: 0, is_deleted: false },
        { id: 'deleted', name: 'Deleted', key: 1, is_deleted: true },
    ];
    const extraModalActions = [
        { id: 0, name: 'Delete', action: ACTIONS.DELETE, icon: <BsTrash size={15} color='red' /> },
        { id: 1, name: 'Edit', action: ACTIONS.EDIT, icon: <FiEdit size={15} color='black' /> },
    ]
    const [selectedTabFilter, setSelectedTabFilter] = useState(tabs[0]);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [action, setAction] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const { isSuccess, data: socialLinksData , isFetching, isLoading } = useQuery({
        queryKey: ['links', page],
        queryFn: () => SocialLinkServices.fetch(page),
        keepPreviousData: true,
    })
    const [selectedItems, setSelectedItems] = useState([]);
    const inputSearchRef = useRef(null);
    const dispatch = useDispatch();
    const user = useAppStore(userSlice.name);
    const socialLinks = useAppStore(socialLinkSlice.name);
    const [visible, setVisible] = useState(false);
    const [linkInfo, setLinkInfo] = useState({
        id: '',
        icon_id: 1,
        name: '',
        path: '',
        houses: [1],
        created_by: user?.info?.id,
        updated_by: user?.info?.id
    })

    const actionBtns =  [
        { key: 0, text: 'Add New Social Media Link',  variant:'default', type: null, icon: <AiOutlinePlus size={15} />, onClick: () => onProcessAction(ACTIONS.ADD) },
    ]

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
            dataIndex: 'name',
            title: 'Name',
            width: '250px',
        },
        {
            key: 2,
            dataIndex: 'path',
            title: 'Path',
            width: '250px',
        },
        {
            key: 3,
            dataIndex: 'user',
            title: 'Created by',
            width: '150px',
            render: (record) => <CustomLabel children={capitalizeFirstLetter(record?.user_name) ?? 'No user'} variant='h6' />
        },
        {
            key: 4,
            dataIndex: 'is_deleted',
            title: 'Status',
            width: '150px',
            render: (isDeleted) => <CustomTag 
                content={getDeleteStatus(isDeleted)} 
                variant={isDeleted ?  'error' : 'success'} 
            />
        }
    ];

    // Functions
    useEffect(() => {
        if(isFetching) {
            dispatch(linksPending())
        } else if(isSuccess) {
            dispatch(linksFulfilled(socialLinksData?.data))
        }
    },[isSuccess, isFetching, dispatch]);

    const renderRecords = useMemo(() =>
         socialLinks?.items?.data?.filter((item) => 
            searchValue !== '' && selectedTabFilter?.key === 0
            ? item?.name?.toLowerCase().includes(searchValue?.toLocaleLowerCase())
            : selectedTabFilter?.key !== 0 
                ? item?.name?.toLowerCase().includes(searchValue?.toLocaleLowerCase()) && item?.is_deleted
                : socialLinks?.items?.data
         ),
    [socialLinks, searchValue, selectedTabFilter])    

    const resetFields = () => {
        setLinkInfo(prevState => ({
            ...prevState,
            name: '',
            path: '',
            icon_id: 1,
            houses: [1],
            created_by: user?.info?.id,
            updated_by: user?.info?.id,
        }))
    }

    const setModalVisibility = (state) => {
        setVisible(state);
    }

    const setConfirmlVisibility = (state) => {
        setConfirmDelete(state);
    }

    const onHandleInput = useCallback((e) => {
        const { value, name } = e.target;
        setLinkInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    },[])

    const socialLinkMutation = useMutation({
        mutationFn: (data) => 
            _.isEqual(action, ACTIONS.ADD) 
                ? SocialLinkServices.addLink(data) 
                : _.isEqual(action, ACTIONS.EDIT)
                    ? SocialLinkServices.updateLink(data)
                    : SocialLinkServices.deleteLink(data)
    })

    const saveLink = () => {
        socialLinkMutation.mutate(
           linkInfo,
            {
                onSuccess: (response) => {
                    linksPending();
                    queryClient.setQueryData(['links', response?.data?.social_link?.id], response?.data?.social_link);
                    showToaster( _.isEqual(action, ACTIONS.ADD) 
                    ? 'Successfully Added' 
                    :  _.isEqual(action, ACTIONS.EDIT) 
                        ? 'Successfully Updated'
                        : 'Successfully Deleted', 'success');
                    dispatch(
                        _.isEqual(action, ACTIONS.ADD) 
                            ? addLinksFulfilled(response?.data?.social_link) 
                            : updateLinksFulfilled(response?.data?.social_link)
                    );
                    setModalVisibility(false);
                    setConfirmlVisibility(false);
                },
                onError: (error) => {
                    console.error(error);
                    showToaster(error?.response?.data?.message, 'error');
                }
            }
        )
    }

    const handleSearch = useCallback((e) => {
        setSearchValue(inputSearchRef.current.value);
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

    const showRecord = (record, act) => {
        setAction(act);
        setModalVisibility(true);
        setLinkInfo(prevState => ({
            ...prevState,
            id: record?.id,
            name: record?.name,
            icon_id: record?.icon_id ?? 1,
            path: record?.path,
            created_by: record?.created_by,
            updated_by: record?.updated_by ?? user?.info?.id
        }))
    };

    const onProcessAction = (act) => {
        setAction(act);

        if(_.isEqual(act, ACTIONS.ADD)) {
            setModalVisibility(true);
            resetFields();
        } else if(_.isEqual(act, ACTIONS.DELETE)) {
            setModalVisibility(false);
            setConfirmlVisibility(true)
        }
    }

    const onTabFilterChange = (item) => {
        setSelectedTabFilter(item);
    }

    const onCancelDelete = () => {
        setConfirmlVisibility(false)
        setModalVisibility(true)
        setAction(ACTIONS.EDIT) 
    }

    // Rendered Components
    const renderModal = (errors, touched) => (
        <CustomModal 
            headerDescription={<span> All fields marked with an asterisk (<span className='text-red-500'>*</span>) are required</span>}
            headerIcon={<FaConnectdevelop size={25} />}
            extraActions={!_.isEqual(action, ACTIONS.ADD) && renderExtraIcons()}
            onClose={() => setModalVisibility(false)}
            visible={visible}
            headerTitle={_.isEqual(action, ACTIONS.VIEW) ? 'Social Media Links' : _.isEqual(action, ACTIONS.EDIT) ? 'Edit Social Link' : 'Add Social Link'}
            children={modalBody(errors, touched)}
            footer={!_.isEqual(action, ACTIONS.VIEW) && renderFooter()}
        />
    )

    const modalBody = (errors, touched) => (
        <>
            <div>
                <CustomLabel 
                    children={<span>Social Media Name <span className='text-red-500'>*</span></span>}
                    addedClass='font-semibold'
                />
                <CustomInput 
                    disabled={_.isEqual(action, ACTIONS.VIEW)}
                    addedClass='mt-2'
                    placeholder='Link Name'
                    name='name'
                    onChange={onHandleInput}
                    error={touched.name && errors.name}
                    size='medium'
                    value={linkInfo.name}
                />
            </div>
            <div className='mt-4'>
                <CustomLabel 
                    children={<span>Social Media Link <span className='text-red-500'>*</span></span>}
                    addedClass='font-semibold'
                />
                <CustomInput 
                    disabled={_.isEqual(action, ACTIONS.VIEW)}
                    prefixicon={<BiLink size={20} className="text-gray-400" />}
                    addedClass='mt-2'
                    placeholder='Link Path'
                    name='path'
                    onChange={onHandleInput}
                    error={touched.path && errors.path}
                    size='medium'
                    value={linkInfo.path}
                />
            </div>
        </>
    )

    const renderFooter = () => (
       !_.isEqual(action, ACTIONS.DELETE)
            ?   <>
                    <CustomButton 
                        text='Cancel' 
                        onClick={() => setModalVisibility(false)} 
                        addedClass='hover:bg-gray-300/20 p-2 rounded-lg' 
                    />
                    <CustomButton 
                        id='btnSave'
                        isLoading={socialLinkMutation.isLoading} 
                        type='submit' 
                        text='Save' 
                        variant='default' 
                        addedClass='w-32' 
                    />
                </>
            :   <>
                    <CustomButton 
                        text='Cancel' 
                        onClick={onCancelDelete} 
                        addedClass='hover:bg-gray-300/20 p-2 rounded-lg' 
                    />
                    <CustomButton 
                        id='btnDelete'
                        text='Delete' 
                        variant='default'
                        buttontype='error'
                        onClick={saveLink} 
                    />
                </>
    )

    const renderExtraIcons = () => 
    extraModalActions.map((btn) => (
        <CustomButton 
            key={btn.id}
            addedClass='p-2 bg-gray-100 rounded hover:bg-gray-300'
            onClick={() => onProcessAction(btn.action)}
            icon={btn.icon}
            title={btn.name}
        />
    ))

    const renderPopupContent = () => 
        <>
            <CustomLabel 
                children={`Are you sure do you want to delete ${linkInfo?.name}?`}
                variant='h6'
                addedClass='text-color-gray-400'
            />
        </>
    

    return (
        <div>
            <CustomTemplate 
                headerTitle='Social Media Links'
                tabItems={tabs}
                actionButtons={actionBtns}
                onSelectTab={(item) => onTabFilterChange(item)}
            />

            {/* TABLE */}
           <CustomDataTable 
                loading={isLoading}
                searchRef={inputSearchRef}
                placeholderSearch='Search Link'
                columns={columns}
                source={renderRecords ?? []}
                variant='stripe'
                totalCount={socialLinks?.items?.total}
                handleOnSearch={handleSearch}
                showCount={renderRecords?.length}
                currentPage={socialLinks?.items?.current_page}
                lastPage={socialLinks?.items?.last_page}
                onHandlePageChange={onHandlePageChange}
                onHandlePreviousPage={onHandlePreviousPage}
                onHandleNextPage={onHandleNextPage}
                onClickRow={(record) => showRecord(record, ACTIONS.VIEW)}
                onRefresh={() => SocialLinkServices.fetch(page)}
           />   

            {/* MODAL */}
            <CustomForm 
                initialValues={linkInfo}
                validationSchema={addSocialLinkValidator}
                onSubmit={saveLink}
                content={(errors, touched) => renderModal(errors, touched)}
            />

             {/* DELETE MODAL */}
            <CustomModal 
                onClose={() => setConfirmDelete(false)}
                visible={confirmDelete}
                headerTitle='Delete'
                children={renderPopupContent()}
                footer={!_.isEqual(action, ACTIONS.VIEW) && renderFooter()}
            />
        </div>
    );
}

export default Page;