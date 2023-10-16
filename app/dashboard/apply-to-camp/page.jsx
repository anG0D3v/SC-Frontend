'use client';
import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MdEmail } from 'react-icons/md';
import {
    QueryProvider,
    MultipleLink,
    CustomTemplate,
    CustomButton,
    CustomDropdown,
    CustomListItem
}  from '../../components';

export default function ApplyToCamp() {
    return (
        <QueryProvider>
            <RenderApplyToCamp />
        </QueryProvider>
    );
}

function RenderApplyToCamp() {

    const dropDownItems = [
        { key: 0, name:'My Profile', component:  <CustomListItem icon={<CgProfile size={20} />} text='My Profile' />},
        { key: 1, name:'Messages', component:  <CustomListItem icon={<MdEmail size={20} />} text='Emails' />},
        { key: 2, name: 'Settings', component:  <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Settings' />}
    ]
    
    const menuItems = () => dropDownItems.map(item => item.component);

    const [data,] = useState({ 
        campData: [
            {
                id: 1,
                labelTitle: 'Apply To Camp Title',
                placeholderTitle: 'Enter Title',
                labelLink: 'Apply To Camp Link',
                placeholderLink: 'Enter Link',        
                title: 'Camp Fire Event',
                link: 'http://localhost:3000/',
                house: 2
            },
            {
                id: 2,
                labelTitle: 'Apply To Camp Title',
                placeholderTitle: 'Enter Title',
                labelLink: 'Apply To Camp Link',
                placeholderLink: 'Enter Link',        
                title: 'Support Community Event',
                link: 'http://supportcommunity.com/',
                house: 3
            }
        ],
    });

    const houseList= [
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />}, 
        { key: 0, name:'Template1', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 1' />},
        { key: 1, name:'Template2', component: <CustomListItem icon={<GiSettingsKnobs size={20} />} text='Template 2' />}
    ]
    
    const houseItems = () => houseList.map(item => item.component);

    const renderHouse = () => {
        return (
            <>
                <CustomDropdown items={houseItems()} text='Select House' variant="outline"/>
            </>
        );
    }

    const renderLinks = () => {
        return data.campData.map((item, index) => (
            <MultipleLink 
                titleLabel={item.labelTitle}
                titlePlaceholder={item.placeholderTitle}
                linkLabel={item.labelLink}
                linkPlaceholder={item.placeholderLink}
                titleValue={item.title}
                linkValue={item.link}
                houseElement={renderHouse()}
                house={1}
                key={index}
                houseCount={2}
            />
        ));
    };

    return (
        <div className="w-full min-h-screen py-10">
            <CustomTemplate
                headerTitle="Apply To Camp"
                headerClass="header"
            />
            <div className='w-full flex justify-end'>
                 <div>
                    <CustomDropdown items={menuItems()} text='Select Language' variant='outline'/>
                </div>
            </div>
            
            {renderLinks()}

            <div className="w-full flex justify-end">
                <div className="flex justify-end">
                    <CustomButton
                        id={'button'}
                        key={1}
                        variant='ghost'
                        icon={<BiPlus size={15} />}
                        text='Add New'
                        addedclass="text-sm flex items-center justify-center"
                    />
                </div>
            </div>
        </div>
    );
}