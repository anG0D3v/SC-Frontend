import Api from "../../app/axios-utils/api";
import { Routes } from "../../app/utils/routes";
describe('Request Accomodation Page', () => {
    beforeEach(() => {
        cy.login();
    })
    
    it('Should render the page without an error', () => {
        cy.urlContainsByText(Routes.Dashboard)
        cy.findAndClickSelector('Request Accommodation')
        // Will get the id of the current logged in user
        cy.getUser().then((user) => {
            cy.intercept('GET', `${Api.REQUEST_ACCOMMODATION().RESOURCE}?page=1&user_id=${user?.id}&filterTab=&keyword=`).as('requestAccommodations');
        });
        cy.wait('@requestAccommodations').then((intercept) => {
            const response = intercept.response;
            expect(response.statusCode).eql(201);
            cy.wrap(response.body?.requestAccommodations).as('requestAccommodationData');
        })
        // Check if the response data of items array is not empty.
        cy.get('@requestAccommodationData').then(data => {
            if(data?.length === 0) {
                cy.textExist('No Records Found')
            }
        })
    })
})