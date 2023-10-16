import { Routes } from "../../app/utils/routes";

describe('Book A Bed Page', () => {
    before(() => {
        cy.viewport('macbook-15')
    })
    beforeEach(() => {
        cy.login();
    })
    
    it('Should render the page and see all the components', () => {
        let counter = 0;
        cy.urlContainsByText(Routes.Dashboard)
        cy.initReact();
        cy.findByText('Book a Bed').should('exist').click();
        cy.react('CustomButton', {props: { text: 'Save' }}).should('exist').click();
        
        // Enforced to submit without filling up the required fields
        cy.react('CustomForm').within(($form) => {
            expect($form).to.have.length(1)
            cy.wrap($form).within(() => {
                cy.get('label').each(($label) => {
                    const labelText = $label.text();
                    if (labelText.includes('is a required field')) {
                        counter += 1;
                    }
                }) .then(() => {
                    expect(counter).to.eq(4);
                });
            })
        })
        cy.haveErrorLabelClassOnSelector('Space is a required field')
        cy.haveErrorLabelClassOnSelector('Language is a required field')
        cy.haveErrorLabelClassOnSelector('Title is a required field')
        cy.haveErrorLabelClassOnSelector('Link is a required field')

        // Filling up the required fields
        cy.react('CustomInput', {props: {name: 'title'}}).type('Hello')
        cy.react('CustomInput', {props: {name: 'link'}}).type('Hello')
        cy.react('CustomButton', {props: { text: 'Save' }}).should('exist').click();

        //Should validate if link is a valid format or not
        cy.haveErrorLabelClassOnSelector('Link must be a valid URL')
        cy.textNotExist('Title is a required field')
        cy.react('CustomInput', {props: {name: 'link'}}).clear().type('https://www.google.com');
        cy.react('CustomSelect').should('have.length', 2);
        cy.react('CustomSelect').first().click().within(($select) => {
            cy.wrap($select).type('r{enter}');
        })
        cy.react('CustomSelect').last().click().within(($select) => {
            cy.wrap($select).type('Spa{enter}');
        })
        cy.react('CustomButton', {props: { text: 'Save' }}).should('exist').click();
        cy.textNotExist('Link must be a valid URL')

        // Revalidate if each required fields have a value
        cy.react('CustomForm').within(($form) => {
            expect($form).to.have.length(1)
            cy.wrap($form).within(() => {
                cy.get('label').each(($label) => {
                    const labelText = $label.text();
                    if (labelText.includes('is a required field')) {
                        counter += 1;
                    } else {
                        counter = 0;
                    }
                }).then(() => {
                    expect(counter).to.eq(0);
                });
            })
        })
    })
})