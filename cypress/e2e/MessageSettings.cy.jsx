import { Routes } from "../../app/utils/routes";
describe('Message Settings E2E', () => {
    before(() => {
        cy.login();
    })

    it('Should render the page without error', () => {
        cy.waitForReact(1000, '#root')
        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Message Settings').click();
        cy.urlContainsByText(Routes.MessageSettings)
        cy.react('CustomSwitch').should('be.visible').click();
    })
})