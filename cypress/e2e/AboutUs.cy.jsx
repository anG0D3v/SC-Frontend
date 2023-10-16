import { Routes } from "../../app/utils/routes";

describe('Stories', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should paginate, search, and filter the table', () => {
        let linkName;
        const tabs = [
            { id: 'MINE', name: 'Mine', key: 1, is_deleted: false },
            { id: 'DEL', name: 'Deleted', key: 2, is_deleted: true },
        ];


        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('About Us').click();

        // Pagination Test
        cy.get('.table-next-button').click(); // Click the "Next" button to go to the next page
        cy.get('.table-page-active').should('contain', '2'); // Check if the second page is active
        cy.get('.table-previous-button').click(); // Click the "Previous" button to go back to the first page

        // Search Test
        cy.get('#txtSearch').type('Mask Update'); // Type a search query

        // Wait for search results to load (you may need to adjust the selector)
        cy.get('#dataTable', { timeout: 10000 }).should('exist');

        // Verify that the search results contain the expected data
        cy.get('#dataTable').should('contain', 'Mask Update'); // Replace with the actual data you expect

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
        cy.get('#dataTable', { timeout: 10000 }).should('exist');

        // Clear the search input field
        cy.get('#searchPage').clear();

        cy.get('.table-page-active').should('contain', '1'); // Check if the second page is active

        tabs.forEach((tab) => {
            // Click the tab
            cy.get(`#tab-${tab.key}`).click();
            cy.wait(1000);

            // Wait for the DataTable to update (you may need to adjust the selector)
            cy.get('#dataTable', { timeout: 10000 }).should('exist');

            // Check if "No Records Found" is displayed
            cy.get('#dataTable').then(($dataTable) => {
                const dataTableText = $dataTable.text();

                if (dataTableText.includes('No Records Found')) {
                    // If "No Records Found" is found, it means there are no records for this tab
                    cy.get('#dataTable').should('contain', 'No Records Found');
                } else {
                    // If there are records, verify the "created by" and "status" columns
                    if (tab.id === 'MINE') {
                        // Check the "created by" column
                        cy.get('.col-4').should('contain', 'Support Community');
                    } else if (tab.id === 'DEL') {
                        // Check the "status" column
                        cy.get('.col-6').should('contain', 'Deleted');
                    }
                }
            });
            
        });

  });
});
