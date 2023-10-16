/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React from 'react'
import 'cypress-react-selector'
import { BsFacebook } from 'react-icons/bs';
import { CustomButton } from '../../app/components';


describe('CustomButton.cy.jsx', () => {
  afterEach(() => {
    cy.wait(500)
  })
  it('Should render correctly.', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn')
  })
  it('Should render a color green button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' buttontype='success' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-solid-success')
  })
  it('Should render a color red button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' buttontype='error' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-solid-error')
  })
  it('Should render a color warning button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' buttontype='warning' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-solid-warning')
  })
  it('Should render an outline default button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='outline' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-outline')
  })
  it('Should render an outline success button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='outline' buttontype='success' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-outline-success')
  })
  it('Should render an outline error button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='outline' buttontype='error' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-outline-error')
  })
  it('Should render an outline warning button', () => {
    cy.mount(<CustomButton text='Click Me!' variant='outline' buttontype='warning' />);
    cy.get('button').should('have.text', 'Click Me!');
    cy.get('button').should('have.class', 'btn-outline-warning')
  })
  it('Should render a button with an icon', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' icon={<BsFacebook />} />);
    cy.get('button').should('have.text', 'Click Me!').as('custom-button');
    cy.get('@custom-button').within(() => {
      cy.get('svg').should('exist');
    })
  })
  it('Should render a loading spinner in a button', () => {
    // cy.waitForReact();
    // cy.react('CustomButton', { props: { text: 'Click Me!', variant: 'default', isLoading: true } }).getProps('isLoading').should('be.true');
    cy.mount(<CustomButton variant='default' isLoading={true} />);
    cy.get('button').should('have.text', 'Loading...').as('custom-button');
  })
  it('Allow user to click the button and fire an log in console.', () => {
    cy.mount(<CustomButton text='Click Me!' variant='default' onClick={() => console.log('Hello')} />);
    cy.get('button').click();
  })
})