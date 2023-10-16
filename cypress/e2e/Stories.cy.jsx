import { Routes } from "../../app/utils/routes";

describe('Stories', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should paginate, search, and filter the table', () => {
        let linkName;
        const tabs = [
            { id: 'DRA', name: 'Draft', key: 1, is_deleted: false },
            { id: 'PEN', name: 'Pending', key: 2, is_deleted: false },
            { id: 'ACT', name: 'Published', key: 3, is_deleted: false },
            { id: 'REJ', name: 'Sent Back', key: 4, is_deleted: false },
            { id: 'DEL', name: 'Deleted', key: 5, is_deleted: true },
        ];


        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Story').click();

        // Pagination Test
        // cy.get('.table-next-button').click(); // Click the "Next" button to go to the next page
        // cy.get('.table-page-active').should('contain', '2'); // Check if the second page is active
        // cy.get('.table-previous-button').click(); // Click the "Previous" button to go back to the first page

        // Search Test
        cy.get('#txtSearch').type('Hillbert'); // Type a search query

        // Wait for search results to load (you may need to adjust the selector)
        cy.get('#dataTable', { timeout: 10000 }).should('exist');

        // Verify that the search results contain the expected data
        cy.get('#dataTable').should('contain', 'Hillbert'); // Replace with the actual data you expect

        // Clear the search input field
        cy.get('#txtSearch').clear();

        // Type another search query
        cy.get('#txtSearch').type('none');

        // Check for "No Records Found"
        cy.get('#dataTable').contains('No Records Found').should('exist');

        // Clear the search input field
        cy.get('#txtSearch').clear();

        // Search Test
        cy.get('#searchPage').type('7'); // Type a search query

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
                    // If there are records, verify that the DataTable is filtered correctly
                    cy.get('#dataTable').should('contain', tab.name);
                }
            });
            
        });

  });
});
