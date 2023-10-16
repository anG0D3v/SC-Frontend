/* eslint-disable react/no-children-prop */
/* eslint-disable no-undef */
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { BsFillGearFill, BsFillTrashFill } from 'react-icons/bs';
import { MdHistory } from 'react-icons/md';
import { CustomTemplate, CustomButton } from '@/components';

describe('Custom Template Component', () => {
    beforeEach(() => {
        cy.viewport(1024, 768)
    })
    afterEach(() => {
        cy.wait(2000)
    })
    it('Should render in the page', () => {
        cy.mount(
            <div className='p-5'>
                <CustomTemplate headerTitle='About Us' />
            </div>
        )
    })
    it('Should render header actions button if present', () => {
        const headerBtns =  [
            { key: 1, name: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
            { key: 2, name: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
        ]
        const headerButtons = () => headerBtns.map(btn => ( <CustomButton key={btn.key} variant={btn.variant} icon={btn.icon} text={btn.name} addedclass='text-sm flex items-center justify-center'/>))
        cy.mount(
            <div className='p-5'>
                <CustomTemplate headerTitle='About Us' headerActionButtons={headerButtons()} />
            </div>
        )
        cy.get('button').should('have.length', 2);
    })
    it('Should show tabs if pressent', () => {
        const tabs = [
            {
                id: 'all',
                name: 'All About Us Content',
                key: 0
            },
            {
                id: 'mine',
                name: 'Mine',
                key: 1
            },
            {
                id: 'deleted',
                name: 'Deleted',
                key: 2
            }
        ];
        const headerBtns =  [
            { key: 1, name: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
            { key: 2, name: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
        ]
        const headerButtons = () => headerBtns.map(btn => ( <CustomButton key={btn.key} variant={btn.variant} icon={btn.icon} text={btn.name} addedclass='text-sm flex items-center justify-center'/>))
        cy.mount(
            <div className='p-5'>
                <CustomTemplate headerTitle='About Us' tabItems={tabs} headerActionButtons={headerButtons()} />
            </div>
        )
        cy.get('ul').children().should('have.length', tabs.length);
    })
    it('Contain action button if present', () => {
        const tabs = [
            {
                id: 'all',
                name: 'All About Us Content',
                key: 0
            },
            {
                id: 'mine',
                name: 'Mine',
                key: 1
            },
            {
                id: 'deleted',
                name: 'Deleted',
                key: 2
            }
        ];
        const headerBtns =  [
            { key: 1, name: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
            { key: 2, name: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
        ]
        const actionBtns =  [
            { key: 0, name: 'Delete',  variant:'default', type: 'error', icon: <BsFillTrashFill size={15} /> },
            { key: 1, name: 'Add New Content',  variant:'default',  icon: <BiPlus size={15} /> },
            { key: 2, name: 'Add New Category', variant:'ghost',  icon: <BiPlus size={15} /> },
        ]
        const headerButtons = () => headerBtns.map(btn => ( <CustomButton key={btn.key} variant={btn.variant} icon={btn.icon} text={btn.name} addedclass='text-sm flex items-center justify-center'/>))
        const actionButtons = () => actionBtns.map(btn => ( <CustomButton  id={`action-button-${btn.key}`} key={btn.key} variant={btn.variant} buttontype={btn.type} icon={btn.icon} text={btn.name} addedclass='text-sm flex items-center justify-center'/>))
        cy.mount(
            <div className='p-5'>
                <CustomTemplate headerTitle='About Us' tabItems={tabs} headerActionButtons={headerButtons()} actionButtons={actionButtons()} />
            </div>
        )
        cy.get('[id^=action-button]').should('exist', true).and('have.length', 3)
    })
    it('Should contain children if present', () => {
        const tabs = [
            {
                id: 'all',
                name: 'All About Us Content',
                key: 0
            },
            {
                id: 'mine',
                name: 'Mine',
                key: 1
            },
            {
                id: 'deleted',
                name: 'Deleted',
                key: 2
            }
        ];
        const headerBtns =  [
            { key: 1, name: 'History',  variant:'transparent', icon: <MdHistory size={15} /> },
            { key: 2, name: 'Settings', variant:'transparent', icon: <BsFillGearFill size={15} /> }
        ]
        const actionBtns =  [
            { key: 0, name: 'Delete',  variant:'default', type: 'error', icon: <BsFillTrashFill size={15} /> },
            { key: 1, name: 'Add New Content',  variant:'default',  icon: <BiPlus size={15} /> },
            { key: 2, name: 'Add New Category', variant:'ghost',  icon: <BiPlus size={15} /> },
        ]
        const headerButtons = () => headerBtns.map(btn => ( <CustomButton key={btn.key} variant={btn.variant} icon={btn.icon} text={btn.name} addedClass='text-sm flex items-center justify-center'/>))
        const actionButtons = () => actionBtns.map(btn => ( <CustomButton  id={`action-button-${btn.key}`} key={btn.key} variant={btn.variant} buttonType={btn.type} icon={btn.icon} text={btn.name} addedClass='text-sm flex items-center justify-center'/>))
        cy.mount(
            <div className='p-5'>
                <CustomTemplate headerTitle='About Us' tabItems={tabs} headerActionButtons={headerButtons()} actionButtons={actionButtons()} children={<h1>Content</h1>} />
            </div>
        )
        cy.get('#main-children').should('exist').as('main-children');
        cy.get('@main-children').within(() => {
            cy.get('h1').should($label => {
                expect($label).to.have.text('Content')
            })
        })
    }) 
})