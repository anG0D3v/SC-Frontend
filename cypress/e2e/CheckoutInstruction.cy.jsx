import { Routes } from "../../app/utils/routes";

describe('Checkout Instruction', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should paginate, search, and filter the table', () => {
        let linkName;
        const tabs = [
            { id: 'DEL', name: 'Deleted', key: 2, is_deleted: true },
        ];

        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Checkout Instructions').click();

        // Search Test
        cy.get('#txtSearch').type('WHAT ARE THE OFFICE HOURS?'); // Type a search query

        cy.wait(1000);
        // Wait for search results to load (you may need to adjust the selector)
        cy.get('#dataTable', { timeout: 3000 }).should('exist');

        // Verify that the search results contain the expected data
        cy.get('#dataTable').should('contain', 'WHAT ARE THE OFFICE HOURS?'); // Replace with the actual data you expect

        // Clear the search input field
        cy.get('#txtSearch').clear();

        // Type another search query
        cy.get('#txtSearch').type('none');

        // Check for "No Records Found"
        cy.get('#dataTable').contains('No Records Found').should('exist');

        // Clear the search input field
        cy.get('#txtSearch').clear();

        // Search Test
        cy.get('#searchPage').type('3'); // Type a search query

         // Wait for search results to load (you may need to adjust the selector)
        cy.get('#dataTable', { timeout: 3000 }).should('exist');

        // Clear the search input field
        cy.get('#searchPage').clear();

        cy.get('.table-page-active').should('contain', '1'); // Check if the second page is active

        tabs.forEach((tab) => {
            // Click the tab
            cy.get(`#tab-${tab.key}`).click();
            cy.wait(2000);

            // Wait for the DataTable to update (you may need to adjust the selector)
            cy.get('#dataTable', { timeout: 3000 }).should('exist');

            // Check if "No Records Found" is displayed
            cy.get('#dataTable').then(($dataTable) => {
                const dataTableText = $dataTable.text();

                if (dataTableText.includes('No Records Found')) {
                    // If "No Records Found" is found, it means there are no records for this tab
                    cy.get('#dataTable').should('contain', 'No Records Found');
                } else {
                    if (tab.id == 'PUB') {
                        cy.get('.col-6').should('contain', 'Published');
                    } else if (tab.id == 'DEL') {
                        if (!dataTableText.includes('No Records Found')) {
                            cy.get('.col-6').should('contain', 'Deleted');
                        } else {
                            cy.get('#dataTable').should('contain', 'No Records Found');
                        }
                    }
                }
            });
            
        });

  });
});
