'use client'
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { BiEdit } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { MdSearch } from 'react-icons/md';
import { CustomButton, CustomInput, CustomLabel, CustomSelect, CustomTemplate, CustomUploader } from '@/components';

function Page(props) {
    // Initialization
    const tabs = [
        { key: 0, name: 'Community Map' },
        { key: 1, name: 'Community Location' },
    ];

    // View in tabs. 0 - For Community Map View. 1 - For Community Location
    const [keyView, setKeyView] = useState(tabs[0].key);

    const pinnedLocations = [
        { key: 0, name: 'Ronald McDonald House', icon: <HiLocationMarker size={20} />},
        { key: 1, name: 'Ronald McDonald Family Room CHOC at Mission', icon: <HiLocationMarker size={20}  />},
        { key: 2, name: 'Ronald Alberta', icon: <HiLocationMarker size={20} />},
    ];

    // Functions
    const changeView = useCallback((item) => {
        setKeyView(item.key);
    },[])

    // rendered Components
    const communityLocation = () => (
        <div className='grid grid-cols-2 gap-4'>
            <div className='drop-shadow-md rounded-md bg-white flex-1 p-5'>
                <CustomLabel 
                    children='Pinned Location'
                    variant='h5'
                />
                <div className="w-full flex items-center my-4">
                    <CustomInput
                        placeholder='Search for a place to add' 
                        size='small'
                        prefixicon={
                            <MdSearch size={20}  className="text-gray-400" />
                        } 
                    />
                </div>
                <div className={clsx('w-full overflow-x-auto', pinnedLocations?.length > 6  ? 'h-96' : 'h-auto')}>
                    <div className='w-full grid space-y-1'>
                    {
                        pinnedLocations?.map((location, idx) => (
                           <div className="w-full grid grid-flow-col-dense items-center justify-between p-3" key={idx}>
                                <CustomLabel 
                                    key={idx}
                                    addedClass='whitespace-pre-line'
                                    icon={location.icon}
                                    children={location.name}
                                />
                                <div className='grid grid-cols-2 w-full gap-1'>
                                    <CustomButton
                                        title='Edit' 
                                        addedClass='p-2 hover:bg-gray-300/40 rounded-md'
                                        icon={<BiEdit />}
                                    />
                                    <CustomButton 
                                        title='Remove' 
                                        variant='transparent'
                                        buttontype='error'
                                        icon={<FaTrashAlt />}
                                    />
                                </div>
                           </div>
                        ))
                    }
                     </div>
                </div>
            </div>
            <div className='drop-shadow-md rounded-md bg-white flex-1 p-5'>
                <CustomLabel 
                    children='Map View'
                />
            </div>
        </div>
    )

    const communityMap = () => (
        <>
            <div className='w-ful flex flex-grow justify-end'>
                <CustomSelect 
                    labelClass='font-semibold'
                    placeholder='Select houses'
                    label='Select space'
                    addedClass='w-80'
                />
            </div>
            <div>
                <CustomLabel children='Upload Plan as PDF or Photo' addedClass='mb-2' />
                <CustomUploader 
                    allowMultiple
                />
                <div className='w-ful flex flex-grow justify-end'>
                    <CustomButton text='Save' variant='default' />
                </div>
            </div>
        </>
    )

    return (
        <div>
            <CustomTemplate 
                tabItems={tabs}
                headerTitle={keyView === 0 ? 'Community Map' : 'Location'}
                onSelectTab={(item) => changeView(item)}
            />
            {
                keyView === 0 
                ?  communityMap()
                :  communityLocation()
            }
        </div>
    );
}

export default Page;