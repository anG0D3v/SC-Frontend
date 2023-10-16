import { Routes } from "../../app/utils/routes";

describe('Social Link', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Should go to social media links page perform search, adding record, update and delete', () => {
        let linkName;
        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Social Media Links').click();
        cy.intercept('POST', '/api/admin/social-links/').as('addLink');
        
        // Should show no record found if the search key didn't match to the records
        cy.get('input#txtSearch').type('Xiaomis');
        cy.findByText('No Records Found').should('be.visible', true);
        cy.get('input#txtSearch').clear({force: true});
        cy.get('input#txtSearch').type('Disney+');
        cy.findByText('No Records Found').should('exist', true);
        cy.get('table').find('tbody > tr').should('have.length.greaterThan', 0);
        cy.get('input#txtSearch').clear({force: true});

        // Open modal 
        cy.findByText('Add New Social Media Link').click();
        cy.get('form').should('exist');

        // Invoke validations
        cy.get('form').within($form => {
            cy.findByText('Save').click();
            cy.get('[id="error-text"]').should('have.length', 2).each($label => {
                const error = $label.text();
                if (!error && error === 'Link Name is a required field') {
                    expect(error).to.equal('Link Name is a required field');
                } else if (!error && error === 'Path is a required field') {
                    expect(error).to.equal('Path is a required field');
                }
            })    
        })

        // Add Record
        cy.get('form').within($form => {
            cy.get('input').eq(0).type('Redmi');
            cy.get('input').eq(1).type('https://www.xiaomi.com');
            cy.get('input').eq(0).invoke('val').then(value => {
                cy.wrap(value).as('linkName');
            })
            cy.get('h6#error-text').should('not.exist', true)
            cy.root().submit();

            cy.wait('@addLink').then((intercept) => {
                const response = intercept.response;
                expect(response.statusCode).to.eql(201)
            })

            cy.get('@addLink').then(newLink => {
               const link = newLink.response.body?.social_link;
               cy.wrap(link).as('link');
            })
        })

        // Update Existing Record
        cy.get('@link').then(value => {
            cy.get('table').contains('td', value?.name);
            cy.intercept('PUT', `/api/admin/social-links/${value?.id}`).as('updateLink');
        })      
        cy.get('table').find('tr').eq(1).click();
        cy.get('form').should('exist');
        cy.get('form').within(() => {
            cy.get('[id="defaultModal"]').should('exist');
            cy.get('[id="defaultModal"]').within(() => {
                cy.get('button[title="Edit"]').click();
            })
            cy.get('input').eq(0).clear({force: true})
            cy.get('input').eq(0).type('Redmi2');
            cy.root().submit();
            cy.wait('@updateLink').then((intercept) => {
                const response = intercept.response;
                expect(response.statusCode).to.eql(201);
            })
        })

        // Delete Record
        cy.get('@link').then(value => {
            cy.get('table').contains('td', value?.name);
            cy.intercept('DELETE', `/api/admin/social-links/${value?.id}`).as('deleteLink');
        })
        cy.get('table').find('tr').eq(1).click();
        cy.get('form').should('exist');

        cy.get('form').within(() => {
            cy.get('[id="defaultModal"]').should('exist');
            cy.get('[id="defaultModal"]').within(() => {
                cy.get('button[title="Delete"]').click();
                cy.get('.rc-modal-footer').find('button[id=btnDelete]').should('exist');
                cy.get('.rc-modal-footer').find('button[id=btnDelete]').click({ force: true });
                cy.wait('@deleteLink').then((intercept) => {
                    const response = intercept.response;
                    expect(response.statusCode).to.eql(201);
                    const data = response.body;
                    cy.wrap(data).as('data');
                })
            })
        })

        cy.get('@data').then(value => {
            cy.contains(value?.social_link?.name)
                .parent('tr')
                .within(() => {
                    cy.get('td').eq(4).should('have.text', 'Deleted')
            })
        })
    })
});
