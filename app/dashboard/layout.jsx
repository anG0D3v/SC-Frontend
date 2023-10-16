'use client'
import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { AiFillCar } from 'react-icons/ai';
import { BsFillStarFill } from 'react-icons/bs';
import { FaConnectdevelop, FaPlus } from 'react-icons/fa';
import {
    HiSpeakerphone,
    HiBell,
    HiMap,
    HiViewGridAdd,
    HiInformationCircle,
    HiNewspaper,
    HiChatAlt,
    HiGlobe,
    HiLocationMarker,
    HiServer,
    HiUsers,
    HiKey,
    HiFlag,
    HiPhoneIncoming,
    HiBadgeCheck,
    HiUserCircle,
    HiGift,
    HiViewBoards,
    HiOfficeBuilding
} from 'react-icons/hi';
import { TbToolsOff } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { CustomHeader, CustomSidebar, CustomAccordion, CustomListItem, CustomButton, CustomLabel, CustomModal } from '@/components';
import { userFulfilled, userLogout } from '@/redux/reducer/user';
import { AuthServices } from '@/services';
import { initializedCookie } from '@/utils/auth-action';
import { TOKEN_EXPIRATION_OFFSET } from '@/utils/constants';
import { Routes } from '@/utils/routes';
import showToaster from '@/utils/toast';
import { getCookie } from '@/utils/utils';

export default function DashboardLayout({
    children,
  }) {
    const [showAlert, setShowAlert] = useState(false);
    const refreshMutation = useMutation({
        mutationFn: () => AuthServices.refresh()
    })
    const dispatch = useDispatch();
    const [remainingTime, setRemainingTime] = useState(120);
    const router = useRouter();
    const path = usePathname();
    const menuItems = [
        {
            key: 0,
            url: Routes.Announcements,
            text: 'Announcements',
            icon: <HiSpeakerphone size={20} />,
            isFavorited: true
        },
        {
            key: 1,
            url: Routes.GuestServices,
            text: 'Guest Services',
            icon: <HiBell size={20} />,
            isFavorited: true
        },
        {
            key: 2,
            url: Routes.NeighborhoodGuide,
            text: 'Neighborhood Guide',
            icon: <HiMap size={20} />,
            isFavorited: true
        },
        {
            key: 3,
            url: Routes.Shuttle,
            text: 'Shuttle',
            icon: <AiFillCar size={20} />,
            isFavorited: true
        },
        {
            key: 4,
            url: Routes.CommunityConfiguration,
            text: 'Community Configuration',
            icon: <HiViewGridAdd size={20} />,
            isFavorited: false
        },
        {
            key: 5,
            url: Routes.AboutUs,
            text: 'About Us',
            icon: <HiInformationCircle size={20} />,
            isFavorited: false
        },
        {
            key: 6,
            url: Routes.NewsfeedSettings,
            text: 'Newsfeed Settings',
            icon: <HiNewspaper size={20} />,
            isFavorited: false
        },
        {
            key: 7,
            url: Routes.MessageSettings,
            text: 'Message Settings',
            icon: <HiChatAlt size={20} />,
            isFavorited: false
        },
        {
            key: 8,
            url: Routes.Resources,
            text: 'Resources',
            icon: <HiGlobe size={20} />,
            isFavorited: false
        },
        {
            key: 9,
            url: Routes.HouseMap,
            text: 'House Map',
            icon: <HiLocationMarker size={20} />,
            isFavorited: false
        },
        {
            key: 10,
            url: Routes.BookABed,
            text: 'Book a Bed',
            icon: <HiServer size={20} />,
            isFavorited: false
        },
        {
            key: 11,
            url: Routes.Users,
            text: 'Users',
            icon: <HiUsers size={20} />,
            isFavorited: false
        },
        {
            key: 12,
            url: Routes.RolesAndPermissions,
            text: 'Roles and Permissions',
            icon: <HiKey size={20} />,
            isFavorited: false
        },
        {
            key: 13,
            url: Routes.Flag,
            text: 'Flag',
            icon: <HiFlag size={20} />,
            isFavorited: false
        },
        {
            key: 14,
            url: Routes.FindOutsideHelp,
            text: 'Find Outside Help',
            icon: <HiPhoneIncoming size={20} />,
            isFavorited: false
        },
        {
            key: 15,
            url: Routes.CheckOutInstructions,
            text: 'Checkout Instructions',
            icon: <HiBadgeCheck size={20} />,
            isFavorited: false
        },
        {
            key: 16,
            url: Routes.Profile,
            text: 'Profile',
            icon: <HiUserCircle size={20} />,
            isFavorited: false
        },
        {
            key: 17,
            url: Routes.GiveBack,
            text: 'Give Back',
            icon: <HiGift size={20} />,
            isFavorited: false
        },
        {
            key: 18,
            url: Routes.Story,
            text: 'Story',
            icon: <HiGift size={20} />,
            isFavorited: false
        },
        {
            key: 19,
            url: Routes.SocialMediaLinks,
            text: 'Social Media Links',
            icon: <FaConnectdevelop size={20} />,
            isFavorited: false
        },
        {
            key: 20,
            url: Routes.OurFacilities,
            text: 'Our Facilities',
            icon: <HiOfficeBuilding size={20} />,
            isFavorited: false
        },
        {
            key: 20,
            url: Routes.ProgramDescription,
            text: 'Program Description',
            icon: <FaConnectdevelop size={20} />,
        },
        {
            key: 20,
            url: Routes.RequestAccommodation,
            text: 'Request Accommodation',
            icon: <HiBell size={20} />,
            isFavorited: true
        },
    ];

    const menus = useCallback((isFavorite) => menuItems.filter(item => item.isFavorited === isFavorite).map((item, idx) => <CustomListItem active={path === item.url} key={item.key} url={item.url} icon={item.icon} text={item.text}  />),[menuItems]);
    
    const renderEmptyState = () => (
        <div className='p-2 flex items-center justify-center flex-col space-y-2'>
            <TbToolsOff size={25} />
            <CustomLabel children='No favorite tool(s) at this moment' addedClass='text-center' />
        </div>
    )
    
    const sidebarMenus = [
        {
            id: 0,
            text: 'Favorites',
            iconLeft: <BsFillStarFill />,
            iconRight: <FaPlus className='rc-accordion-icon' />,
            children: menus(true).length !== 0 ? menus(true) : renderEmptyState()
        },
        {
            id: 1,
            text: 'Tools',
            iconLeft: <HiViewBoards/>,
            iconRight: <FaPlus className='rc-accordion-icon' />,
            children: menus(false)
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if(typeof getCookie('token') === 'undefined') {
                router.replace(Routes.Login);
                router.push(Routes.Login);
                clearInterval(interval)
                setTimeout(() => {
                    dispatch(userLogout());
                },[3000])
            } else {
                const currentDateTime = Date.now();
                const decodedTokenExpInMs = jwtDecode(getCookie('token'))?.exp * 1000;
                const differenceTokenExpToCurrentDateTime = decodedTokenExpInMs - currentDateTime;
                const convertedDifferenceToMinutes = Math.floor(differenceTokenExpToCurrentDateTime / 60000);
                const convertedDifferenceToSeconds = Math.floor(differenceTokenExpToCurrentDateTime / 1000);
                setRemainingTime(convertedDifferenceToSeconds);
                if(convertedDifferenceToMinutes <= Math.floor(TOKEN_EXPIRATION_OFFSET / 60000)) {
                    setShowAlert(true);      
                }
            }
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    },[getCookie('token')])

    const modalBody = () => (
        <div className='w-full flex items-center justify-center text-center flex-col px-5'>
            <Image alt='refresh' src='/images/refresh.png' height={300} width={300}/>
            <CustomLabel variant='h2' text='Your session is about to expire' addedClass='text-primary-gray-600' />
            <div className='my-5'>
                <CustomLabel 
                    addedClass='text-sm' 
                    children={`Are you still here? Your session will expire in approximately ${TOKEN_EXPIRATION_OFFSET / 60000} minutes. 
                        If you don't click the refresh button, you will be logged out automatically.`}
                    variant='subtitle' 
                />
            </div>
            {
                remainingTime > 0 &&  
                    <>
                        <CustomLabel 
                            variant='subtitle'
                            addedClass='text-base my-5'
                            children={`Time Remaining: ${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')}`}
                        />
                         <CustomButton 
                            isLoading={refreshMutation?.isLoading}
                            addedClass='mt-5'
                            variant='default'
                            text='Refresh'
                            onClick={onRefresh}
                            disabled={remainingTime < 0}
                        />
                    </>
            }
        </div>
    )
   
    const onRefresh = () => {
        refreshMutation.mutate({}, {
            onSuccess: (response) => {
                dispatch(userFulfilled(response?.data))
                initializedCookie(response?.data)
                setShowAlert(false);
            },
            onError: (error) => {
                showToaster('Something went wrong. ' + error?.response?.data?.message, 'error');
            }
        })
    }

    /* ----- RENDER MENUS ----- */
    const renderMenus = () => 
        sidebarMenus.map((menu) => (
            <div className="divide-y" key={menu.id}>
                <CustomAccordion
                    id={menu.id}
                    key={`sidebar-${menu.id}`}
                    isOpenOnLoad
                    variant="transparent"
                    header={menu.text}
                    iconLeft={menu.iconLeft}
                    iconRight={menu.iconRight}
                    content={menu.children}
                />
            </div>
        ));

    return (
       <section>
        <div className="min-h-screen flex flex-col">
            <div className="mb-[50px]">
                <CustomHeader />
            </div>
            <CustomSidebar children={renderMenus()} />
            <div className="p-4 sm:ml-64">
                <div className="rc-container">
                    {children}
                </div>
            </div>
        </div>
        <CustomModal 
            visible={showAlert}
            addedClass='flex items-center justify-center'
            showDefaultActions={false}
            children={modalBody()}
        />
       </section>
    )
}

DashboardLayout.propTypes = {
    children: PropTypes.any,
};
