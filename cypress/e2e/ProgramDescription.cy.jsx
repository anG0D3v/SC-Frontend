import { Routes } from "../../app/utils/routes";
describe('ProgramDescription', () => {
    beforeEach(() => {
        cy.login()
    });

    it('should go the program description page then search and filter the records using search box and tabs', () => {
        const tabs = [
            { id: 'ALL', name: 'All', key: 0, is_deleted: false },
            { id: 'ACT', name: 'Published', key: 1, is_deleted: false },
            { id: 'INA', name: 'Deleted', key: 2, is_deleted: false },
        ];
        
        cy.urlContainsByText(Routes.Dashboard)
        cy.findAndClickSelector('Program Description', { timeout: 10000 });

        // ALIASES
        cy.get('#dataTable').as('list');
        cy.get('#txtSearch').as('searchBox');

        // SEARCH -- VALIDATE IF RECORD EXISTS
        cy.get('@searchBox').type('Nuestro programa y servicios');
        cy.get('@list', { timeout: 10000 }).should('exist');
        cy.get('@list').should('contain', 'Nuestro programa y servicios');
        cy.get('@searchBox').clear();

        // SEARCH -- VALIDATE IF RECORD NOT EXISTS
        cy.get('@searchBox').type('Un!qu3 K3ywordz');
        cy.componentContainsText('@list', 'No Records Found');
        cy.get('#txtSearch').clear();

        // TAB -- 
        tabs.forEach((tab) => {
            // Click the tab
            cy.get(`#tab-${tab.key}`).click();
            cy.wait(1000);

            // Wait for the DataTable to update (you may need to adjust the selector)
            cy.componentExists('@list', { timeout: 15000 });
            // Check if "No Records Found" is displayed
            cy.get('@list').then(($dataTable) => {
                const dataTableText = $dataTable.text();

                if (dataTableText.includes('No Records Found')) {
                    // If "No Records Found" is found, it means there are no records for this tab
                    cy.get('#dataTable').should('contain', 'No Records Found');
                } else {
                    // If there are records, verify that the DataTable is filtered correctly
                    if (tab.id != 'ALL') {
                        cy.get('#dataTable').should('contain', tab.name);
                    }
                }
            });
            
        });
    });
});
