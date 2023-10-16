import jwtDecode from "jwt-decode";
import { Routes } from "../../app/utils/routes";
const visitDashboard = () => {
    cy.visit('http://rmhcsc.supportcommunity.loc:3000/dashboard');
};

describe('Test refresh token instance', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Should alert the user if token is about to expire', () => {
        const currentDateTime = Date.now();
        let decodedTokenExpInMs;
        cy.urlContainsByText(Routes.Dashboard)
        cy.getCookie('token').as('token');
        cy.get('@token').then(cookie => {
            cy.log('Token: ', cookie.value);
            decodedTokenExpInMs = jwtDecode(cookie.value).exp * 1000;
            cy.wrap(decodedTokenExpInMs).as('decodedTokenExpInMs');
        })

        cy.get('@decodedTokenExpInMs').then(value => {
            const differenceTokenExpToCurrentDateTime = value - currentDateTime;
            const convertedDifferenceToMinutes = Math.floor(differenceTokenExpToCurrentDateTime / 60000);
            const convertedDifferenceToSeconds = Math.floor(differenceTokenExpToCurrentDateTime / 1000);
            cy.wait(differenceTokenExpToCurrentDateTime);

            // If the user ignore to click refresh button
            cy.get('[id="defaultModal"]').should('be.visible').as('refreshTokenAlert');
            cy.get('@refreshTokenAlert').within(() => {
                cy.findByText('Your session is about to expire').should('be.visible');
            })
            cy.urlContainsByText(Routes.Login)
        })
    })

    it('Should enable user to refresh token before it expires', () => {
        const currentDateTime = Date.now();
        let decodedTokenExpInMs;
        cy.urlContainsByText(Routes.Dashboard)
        cy.getCookie('token').as('token');
        cy.get('@token').then(cookie => {
            cy.log('Token: ', cookie.value);
            decodedTokenExpInMs = jwtDecode(cookie.value).exp * 1000;
            cy.wrap(decodedTokenExpInMs).as('decodedTokenExpInMs');
        })

        cy.get('@decodedTokenExpInMs').then(value => {
            const differenceTokenExpToCurrentDateTime = value - currentDateTime;
            const convertedDifferenceToMinutes = Math.floor(differenceTokenExpToCurrentDateTime / 60000);
            const convertedDifferenceToSeconds = Math.floor(differenceTokenExpToCurrentDateTime / 1000);
            // cy.wait(differenceTokenExpToCurrentDateTime);
            // If the user click refresh button
            cy.get('[id="defaultModal"]', {timeout: differenceTokenExpToCurrentDateTime}).should('be.visible').as('refreshTokenAlert');
            cy.get('@refreshTokenAlert').within(() => {
                cy.findByText('Your session is about to expire').should('be.visible');
                cy.findByText('Refresh').click();
            })
            cy.get('@refreshTokenAlert').should('not.be.visible');
            cy.urlContainsByText(Routes.Dashboard)
        })
    })
})