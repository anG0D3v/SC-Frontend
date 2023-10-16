import { Routes } from "../../app/utils/routes";

const visitLogin = () => {
    cy.visit('http://rmhcsc.supportcommunity.loc:3000/');
};

describe('Test Request an Invitation', () => {
    beforeEach(() => {
        visitLogin();
        cy.viewport('macbook-11')
    })

    it('Should go to request an invitation page when click signup', () => {
       cy.initReact();
       cy.react('CustomLabel', { props: { variant: 'link', children: 'Sign up' }, exact: false}).should('be.visible').click({multiple: true});
       cy.urlContainsByText(Routes.RequestInvitation)
       cy.get('input[name=firstName]').type('John');
       cy.get('input[name=lastName]').type('Doe');
       cy.get('input[name=email]').type('jd@gmail.com');
       cy.react('CustomPhoneInput').type('123213123')
       cy.react('CustomButton', { props: { text: 'Next', variant: 'default' }}).should('exist').click();

       // Choose A Space
       cy.urlContainsByText(Routes.ChooseASpace)
       cy.initReact();
       cy.findAndClickSelector('Back to Login');
       cy.urlContainsByText(Routes.Login)
    })
})