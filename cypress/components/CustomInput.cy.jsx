/* eslint-disable no-undef */
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { CustomInput } from '../../app/components';

describe('CustomInput.jsx', () => {
    // before(() => {
    //     cy.visit('https://localhost:3000');
    //     cy.waitForReact();
    //   });
    afterEach(() => {
        cy.wait(2000);
    })
    it('Should render the component', () => {
        cy.mount(<div className='p-5'><CustomInput placeholder='Your Name' /></div>);
    })
    it('Should accept character based on max length', () => {
       cy.mount(<div className='p-5'><CustomInput name='username' placeholder='Username' maxLength={5} /></div>);
       cy.get('input[name="username"]').as('custom-input')
       cy.get('@custom-input').invoke('attr', 'maxlength').should('eq', '5')
       cy.get('@custom-input').type('123456');
       cy.get('@custom-input').should('have.value', '12345')
    });
    it('Should render validation', () => {
        cy.mount(<div className='p-5'><CustomInput label='Username' name='username' placeholder='Username' error='Username is a required field' /></div>);
        cy.get('input[name="username"]').as('custom-input');
        cy.get('@custom-input').should('have.class', 'error');
        cy.get('#error-text').should('be.visible').and('have.class', 'error-label').as('errorLabel');
        cy.get('@errorLabel').should(($label) => {
            expect($label).to.have.text('Username is a required field')
        })
    })
    it('Should display an icon', () => {
        cy.mount(<div className='p-5'><CustomInput
            type="email"
            prefixicon={
                <MdEmail
                    size={20}
                    className="text-gray-400"
                />
            }
            name="email"
            label="Email Address"
            placeholder="johndoe@example.com"
        /></div>)
        cy.get('input[name="email"]').as('custom-input');
        cy.get('@custom-input').should('have.attr', 'type', 'email');
        cy.get('svg').should('exist');
    })
    it('Should toggle to show or hide password input', () => {
        cy.mount(<div className='p-5'>
            <CustomInput
                type="password"
                maxLength={5}
                name="password"
                label="Password"
                placeholder="**********"
            />
        </div>)
        cy.get('input[name="password"]').as('custom-input');
        cy.get('@custom-input').should('have.attr', 'type', 'password').and('have.attr', 'placeholder', '**********')
        cy.get('@custom-input').type('@test123');
        cy.get('button').click();
        cy.get('@custom-input').should('have.attr', 'type', 'text')
        cy.wait(3000)
        cy.get('button').click();
        cy.get('@custom-input').should('have.attr', 'type', 'password')
    })
})