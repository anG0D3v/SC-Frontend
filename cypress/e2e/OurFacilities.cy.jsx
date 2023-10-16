import { Routes } from "../../app/utils/routes";
describe('Our Facilities Page', () => {
    beforeEach(() => {
        cy.login();
    })
    
    it('Should render Our Facilities page without an error', () => {
        cy.urlContainsByText(Routes.Dashboard)
        cy.findAndClickSelector('Our Facilities');
        cy.urlContainsByText(Routes.OurFacilities)
        cy.componentContainsText('h2', 'Our Facilities')
        cy.waitForReact(1000, '#root');
        cy.react('CustomTemplate').should('have.length', 1).within(($template) => {
            cy.wrap($template).within((tmp) => {
                cy.get('li').should('have.length', 3).each($tab => {
                    cy.get($tab).click({ multiple: true })
                    cy.wait(1000)
                })
            })
        })  
        cy.componentExists('#dataTable')
    })
})