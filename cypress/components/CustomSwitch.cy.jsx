import React from 'react'
import CustomSwitch from '../../app/components/switch/CustomSwitch'

describe('<CustomSwitch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomSwitch />)
  })
})