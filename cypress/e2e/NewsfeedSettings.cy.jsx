import { Routes } from "../../app/utils/routes";
describe('Message Settings E2E', () => {
    before(() => {
        cy.login();
    })

    it('Should render the page without error', () => {
        cy.waitForReact(1000, '#root')
        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Newsfeed Settings').click();
        cy.urlContainsByText(Routes.NewsfeedSettings)
        cy.react('CustomSwitch').should('have.length', 3);
        cy.react('CustomSwitch').each($settings => {
            cy.wrap($settings).within(() => {
                cy.react('CustomSwitch').should('be.visible').click({ multiple: true });
            })
        });
    })
})