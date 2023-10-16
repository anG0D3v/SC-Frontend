'use client';
import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { BiPlus, BiSolidEnvelope } from 'react-icons/bi';
import { BsTelephoneFill } from 'react-icons/bs';
import { CgChevronLeft } from 'react-icons/cg';
import { MdEmail, MdHistory, MdOutlineClose } from 'react-icons/md';
import { PiEnvelopeOpen } from 'react-icons/pi';
import { CustomAvatar, CustomButton, CustomDataTable, CustomLabel, CustomLazyList, CustomOptionSelector, CustomTemplate } from '@/components';
import { capitalizeFirstLetter } from '@/utils/utils';

export default function Page(props) {
    // Initialization
    // Used to change the view either page for request an inviration or users. 
    // true - For showing users page. false - For showing request invitation page
    const [view, setView] = useState(true)
    const actionBtns =  [
        { key: 0, text: 'Request Invitations', icon: <PiEnvelopeOpen size={15} />, addedClass: 'bg-[#E1EFFE]/100 text-blue-500 hover:bg-blue-200 rounded-lg', onClick: () => changeView() },
        { key: 1, text: 'Add User',  variant:'default',  icon: <BiPlus size={15} />, addedClass: 'text-sm flex items-center justify-center' },
    ]
    const headerBtns =  [
        { key: 0, text: 'History',  variant:'transparent', icon: <MdHistory size={15} />, showed: view  },
        { key: 1, text: 'Go Back',  variant:'default', icon: <CgChevronLeft size={15} />, showed: !view, onClick: () => changeView() },
    ]

    const actions = [
        { key: 0, text : 'Email', addedClass: 'bg-[#E1EFFE]/100 text-blue-500 hover:bg-blue-200 rounded-lg', icon: <BiSolidEnvelope size={20} /> },
        { key: 1, text : 'Decline', variant:'default', type: 'error', addedClass: '', icon: <MdOutlineClose size={20} /> }
    ]

    const inputSearchRef = useRef(null);

    const columns = view ? [
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
            title: 'Name',
            width: '250px',
            render: (record) => 
                <CustomAvatar 
                    altText='user'
                    size='medium'
                    textClass='font-semibold'
                    url='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                    text={capitalizeFirstLetter(record?.name)}
                    helperText={'Last Sign-in ' + record?.last_login}
                />
        },
        {
            key: 2,
            title: 'Contact Details',
            width: '250px',
            render: (record) => <div>
                <CustomLabel 
                    textContainerClass='items-center' 
                    children={record?.email} 
                    icon={<MdEmail size={15} />} 
                />
                <CustomLabel  
                    textContainerClass='items-center' 
                    children={record?.mobile} 
                    icon={<BsTelephoneFill size={15} />} 
                />
            </div>
        },
        {
            key: 3,
            dataIndex: 'roles',
            title: 'Role',
            width: '150px',
            render: (record) => <CustomLazyList items={record?.map(role => role.name)} limit={2} />
        },
        {
            key: 4,
            dataIndex: 'spaces',
            title: 'Spaces',
            width: '150px',
            render: (spaces) => <CustomLazyList items={spaces?.map(space => space.name)} limit={1} />
        },
    ] : [
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
            dataIndex: 'email',
            title: 'Email',
            width: '250px',
            render: (record) => <div>
                <CustomLabel 
                    textContainerClass='items-center' 
                    children={record} 
                    icon={<MdEmail size={15} />} 
                />
            </div>
        },
        {
            key: 2,
            dataIndex: 'name',
            title: 'Name',
            width: '250px',
        },
        {
            key: 3,
            dataIndex: 'mobile',
            title: 'Phone Number',
            width: '150px',
            // render: (record) => <CustomLabel text={capitalizeFirstLetter(record?.user_name) ?? 'No user'} variant='h6' />
        },
        {
            key: 4,
            dataIndex: 'created_at',
            title: 'Date',
            width: '150px',
            // render: (record) => <CustomLabel text={capitalizeFirstLetter(record?.user_name) ?? 'No user'} variant='h6' />
        },
        {
            key: 5,
            dataIndex: 'house',
            title: 'House',
            width: '150px',
            // render: (record) => <CustomLabel text={capitalizeFirstLetter(record?.user_name) ?? 'No user'} variant='h6' />
        },
        {
            key: 5,
            dataIndex: 'action',
            title: 'Action',
            width: '10px',
            render: (record) => <div className={clsx('grid grid-cols-1 gap-2')}>
                <CustomButton 
                    text='Send Invitation'
                    variant='default'
                />
                <div className="grid grid-cols-2 gap-2">
                    {
                        actions.map((action, idx) => 
                            <CustomButton
                                title={action.name} 
                                key={idx}
                                icon={action.icon}
                                buttontype={action.type}
                                variant={action.variant}
                                addedClass={action.addedClass}
                            />
                        )
                    }
                </div>
            </div>
        },
    ];

    const data =  [
        {
            id: 0, 
            name: 'John Doe', 
            last_login: 'May 30, 2023', 
            email: 'johndoe@gmail.com',
            mobile: '09122112323', 
            roles: [
                {
                    id: 0,
                    name: 'User'
                },
                {
                    id: 1,
                    name: 'Staff'
                },
                {
                    id: 2,
                    name: 'Administrator'
                },
                {
                    id: 3,
                    name: 'Developer'
                }
            ],
            spaces: [
                {
                    id: 0,
                    name: 'RMHC - Southern California'
                },
                {
                    id: 1,
                    name: 'RMHC - Central Texas'
                },
                {
                    id: 2,
                    name: 'RMHC - Central Texas'
                },
                {
                    id: 3,
                    name: 'RMHC - Central Texas'
                }
            ]
        },
    ];
    

    // Rendered Components

    // Functions
    const changeView = useCallback(() => {
        setView(!view);
    },[view])    

    return (
        <div>
            <CustomTemplate 
                showDivider
                headerTitle={view ? 'All Users' : 'Request Invitations'}
                headerActionButtons={headerBtns.filter(btn => btn?.showed)}
                actionButtons={view ? actionBtns : []}
            />

            {/* TABLE */}
            <CustomDataTable
                searchRef={inputSearchRef}
                placeholderSearch='Search Link'
                columns={columns}
                source={data}
                variant='stripe'
                onClickRow={null}
           />   
        </div>
    );
}