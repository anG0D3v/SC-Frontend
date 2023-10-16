'use client'
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { BiLogOutCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import {  MdSearch } from 'react-icons/md';
import { CustomAvatar, CustomButton, CustomInput, CustomListItem } from '..';
import useAppStore from '@/hooks/useAppStore';
import { AuthServices } from '@/services';
import showToaster from '@/utils/toast';
import { capitalizeFirstLetter, useCustomCookies} from '@/utils/utils';

function CustomHeader(props) {
    const { removeCookie } = useCustomCookies(['authorized', 'token'])
    const user = useAppStore('user');
    const dropDownItems = [
        { key: 0, name:'My Profile', component:  <CustomListItem icon={<CgProfile size={20} />} addedClass='rounded-none' text='My Profile' />},
    ];

    // Rendered Components
    const menuItems = () => dropDownItems.map(item => item.component);

    const dropdownFooter = () => <>
        <CustomButton id='btnSignOut' onClick={signOut} text='Sign Out' addedClass='text-base' iconPosition='left' icon={<BiLogOutCircle />} />
    </>

    const dropdownHeader = () => <>
        <div>{capitalizeFirstLetter(user?.info?.user_name)}</div>
        <div className="font-medium truncate">{user?.info?.email}</div>
    </>

    // Functions
    const logoutMutation = useMutation({
        mutationFn: () => AuthServices.logout()
    })
    const signOut = () => {
        logoutMutation.mutate({}, 
            { 
                onSuccess: (response) => {
                    showToaster(response?.data?.message, 'success');
                    clearCookies();
                }
            }
        );
    }

    const clearCookies = () => {
        removeCookie('authorized', { path: '/', expires: new Date(),  maxAge: 0 });
        removeCookie('token', { path: '/', expires: new Date(),  maxAge: 0 });
    }

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                            
                        <div className='flex-1 flex items-center flex-wrap w-full'>
                            <div className='sm:w-1/3 hidden lg:block w-full'>
                                <Link href="/">
                                    <Image src="/logo.png" className='ml-10 sm:w-36' height={100} width={100} alt="Support Community" />
                                </Link>
                            </div>
                            <div className='w-full xs:w-2/3 sm:w-full md:w-2/3'>
                                <CustomInput
                                    name='search' 
                                    placeholder='Search Tools' 
                                    prefixicon={
                                        <MdSearch size={20}  className="text-gray-400" />
                                    } 
                                    addedClass=' bg-gray-100 border-0' 
                                    size='small'
                                />
                            </div>
                        </div>

                        <div className='flex-1 w-full sm:w-1/2 xs:w-1/2 md:w-full flex justify-end gap-2'>
                            <CustomAvatar 
                                textPosition='left'
                                addedClass='cursor-pointer'
                                text={capitalizeFirstLetter(user?.info?.user_name)}
                                helperText={user?.info?.email}
                                size='medium'
                                url='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                dropdown={{
                                    items: menuItems(),
                                    header: dropdownHeader(),
                                    footer: dropdownFooter()
                                }}
                                altText='profile'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default CustomHeader;