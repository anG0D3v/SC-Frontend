/* eslint-disable no-undef */
/* eslint-disable import/order */
// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18';
import '../../app/styles/main.css';
import 'cypress-react-selector';

Cypress.Commands.add('mount', mount);

// Example use:
// cy.mount(<MyComponent />)
