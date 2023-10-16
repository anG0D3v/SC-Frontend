// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-pipe';
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('componentExists', (selector, options) => {
    cy.get(selector, { ...options }).should('exist');
});

Cypress.Commands.add('componentContainsText', (selector, value, options) => {
    cy.get(selector, { ...options }).contains(value);
});

Cypress.Commands.add('login', () => {
    cy.visit('http://rmhcsc.supportcommunity.loc:3000/');
    cy.intercept('POST', '/api/auth/login', (req) => {
        req.headers['X-Tenant'] = 'rmhcsc';
    }).as('login');

    cy.get('input[name=email]').type('admin@supportcommunity.com');
    cy.get('input[name=password]').type('SupportCommunity!21');

    cy.get('form').submit();

    cy.wait('@login').then((interception) => {
        const response = interception.response;
        if (response.body?.user) {
            cy.setCookie('user', `${JSON.stringify(response.body?.user)}`);
        }
        expect(response.statusCode).to.eq(200);
    });
});

Cypress.Commands.add('initReact', () => {
    cy.waitForReact(1000, '#root');
});

Cypress.Commands.add('haveErrorLabelClassOnSelector', (selector, options) => {
    cy.findByText(selector, { ...options }).should('have.class', 'error-label');
});

Cypress.Commands.add('haveNoErrorLabelClassOnSelector', (selector, options) => {
    cy.findByText(selector, { ...options }).should('not.have.class', 'error-label');
});

Cypress.Commands.add('textNotExist', (selector, options) => {
    cy.findByText(selector, { ...options }).should('not.exist');
});

Cypress.Commands.add('textExist', (selector, options) => {
    cy.findByText(selector, { ...options }).should('exist');
});

Cypress.Commands.add('urlContainsByText', (text, options) => {
    cy.url({ ...options }).should('contain', text);
});

Cypress.Commands.add('findAndClickSelector', (text, options) => {
    cy.findByText(text, { ...options })
        .should('exist')
        .click();
});

Cypress.Commands.add('getUser', () => {
    return cy.getCookie('user').then((cookie) => {
        if (cookie) {
            return JSON.parse(cookie.value);
        } else {
            throw new Error("Cookie 'userId' not found.");
        }
    });
});
