import { Routes } from "../../app/utils/routes";
describe('Users Page', () => {
    before(() => {
        cy.viewport(1500,1000)
    })

    beforeEach(() => {
        cy.login();
    });

    it('Should go to users page', () => {
        cy.waitForReact(1000, '#root')
        cy.urlContainsByText(Routes.Dashboard)
        cy.findAndClickSelector('Users')
        cy.urlContainsByText(Routes.Users)
        cy.get('table')
            .find('th')
            .should('contain', 'Name')
            .should('contain', 'Contact Details')
            .should('contain', 'Role')
            .should('contain', 'Space')
        cy.react('CustomButton', {props: { text: 'Request Invitations'}, exact: false}).should('exist').click();
        cy.get('h2').contains('Request Invitations');
        cy.get('table')
            .find('th')
            .should('contain', 'Email')
            .should('contain', 'Name')
            .should('contain', 'Phone Number')
            .should('contain', 'Date')
            .should('contain', 'House')
            .should('contain', 'Action')
        cy.findAndClickSelector('Go Back')
        cy.get('h2').contains('All Users');
    })
})