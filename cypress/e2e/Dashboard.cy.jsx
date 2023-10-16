import { Routes } from "../../app/utils/routes";

describe('Dashboard Page', () => {
    // beforeEach(() => {
    //     cy.visit('http://localhost:3000/dashboard');
    //     cy.viewport('macbook-11')
    // })
    beforeEach(() => {
        cy.login();
    });
    afterEach(() => {
        cy.wait(2000)
    })
    it('Should go to the dashboard', () => {
      cy.urlContainsByText(Routes.Dashboard)
    })
    // it('Should have header in the page and render it\'s content', () => {
    //     cy.get('img').should('exist');
    //     cy.get('img').should('have.attr', 'src', '/logo.png');
    //     cy.get('input[name="search"]').as('searchbox');
    //     cy.get('@searchbox').should('exist');
    //     cy.get('@searchbox').type('sample');
    //     cy.get('#user-profile').should('exist');
    //     cy.get('#user-profile').should('have.attr', 'src', 'https://flowbite.com/docs/images/people/profile-picture-5.jpg')
    // })
    // it('Should display sidebar and render it\'s content', () => {
    //     cy.get('aside').should('exist');
    //     cy.get('[id^=accordion-card]').should('exist').should('have.length', 2);
    //     cy.get('[id^=accordion-card]').each(($accordion) => {
    //         cy.wrap($accordion).find('button').click();
    //         cy.wait(2000);
    //         cy.wrap($accordion).find('button').click();
    //     })
    // })
    // it('Should be able to navigate to different page', () => {
    //     cy.get('[id^=accordion-card]').each(($accordion) => {
    //         cy.wrap($accordion).within(() => {
    //             cy.get('.rc-collapse.show').within(() => {
    //                 cy.get('a.list-default').click({ multiple: true });
    //                 cy.wait(2000);
    //             })
    //         })
    //     })
    // })
})