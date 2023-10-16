import { Routes } from "../../app/utils/routes";
describe('ProgramDescription', () => {
    beforeEach(() => {
        cy.login();
    });

    it('should go the announcement page then search and filter the records using search box and tabs', () => {
        const tabs = [
            { id: 'all', name: 'All', key: 0, is_deleted: false },
            { id: 'SEN', name: 'Sent and Saved', key: 1, is_deleted: false },
            { id: 'SCH', name: 'Scheduled', key: 2, is_deleted: false },
            { id: 'SAV', name: 'Draft', key: 3, is_deleted: false },
            { id: 'TRA', name: 'Trashed', key: 4, is_deleted: true },
        ];
        
        cy.urlContainsByText(Routes.Dashboard)
        cy.findByText('Announcements', { timeout: 10000 }).click();
        cy.get(`#tab-0`).click();
        // ALIASES
        cy.get('#dataTable').as('list');
        cy.get('#txtSearch').as('searchBox');

        // SEARCH -- VALIDATE IF RECORD EXISTS
        cy.get('@searchBox').type('New COVID Policy');
        cy.get('@list', { timeout: 15000 }).should('exist');
        cy.get('@list').should('contain', 'New COVID Policy');
        cy.get('@searchBox').clear();

        // SEARCH -- VALIDATE IF RECORD NOT EXISTS
        cy.get('@searchBox').type('Un!qu3 K3ywordz');
        cy.get('@list').contains('No Records Found').should('exist');
        cy.get('#txtSearch').clear();

        // TAB -- 
        tabs.forEach((tab) => {
            // Click the tab
            cy.get(`#tab-${tab.key}`).click();
            cy.wait(1000);

            // Wait for the DataTable to update (you may need to adjust the selector)
            cy.get('@list', { timeout: 15000 }).should('exist');
            // Check if "No Records Found" is displayed
            cy.get('@list').then(($dataTable) => {
                const dataTableText = $dataTable.text();

                if (dataTableText.includes('No Records Found')) {
                    // If "No Records Found" is found, it means there are no records for this tab
                    cy.get('#dataTable').should('contain', 'No Records Found');
                } else {
                    // If there are records, verify that the DataTable is filtered correctly
                    if (tab.id != 'all') {
                        cy.get('#dataTable').should('contain', tab.name);
                    }
                }
            });
        });
    });
});
