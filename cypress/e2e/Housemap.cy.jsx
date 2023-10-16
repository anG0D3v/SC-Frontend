import { Routes } from "../../app/utils/routes";
describe('Housemap Page', () => {
    before(() => {
        cy.viewport(1500,1000)
    })

    beforeEach(() => {
        cy.login();
        cy.initReact();
        cy.react('CustomTemplate')
    });

    it('Should go to house map page and render it', () => {
        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('House Map').click();
        cy.urlContainsByText(Routes.HouseMap)
        cy.react('CustomTemplate').should('have.length', 1).within($template => {
           cy.wrap($template).within(() => {
            cy.get('h2').contains('Community Map')
            cy.get('li').should('have.length', 2).each(tab => {
                cy.get(tab).click({ multiple: true })
            })
            cy.get('h2').contains('Location')
           }) 
        })
    })
})