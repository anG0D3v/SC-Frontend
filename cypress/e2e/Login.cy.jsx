describe('Login', () => {
    before(() => {
        cy.viewport(1000,800)
    })

    beforeEach(() => {
        cy.visit('http://rmhcsc.supportcommunity.loc:3000/auth/login');
        cy.waitForReact(1000, '#root');
    })
    
    it('Should show an error message for the required fields', () => {
        cy.get('button').contains('Continue').click();
        cy.contains('Email is a required field').should('be.visible').should(($label) => {
            expect($label).to.have.text('Email is a required field');
        });
        cy.contains('Password is a required field').should('be.visible').should(($label) => {
            expect($label).to.have.text('Password is a required field');
        });
    });

    it('Should perform login', () => {
        cy.intercept('POST', 'http://localhost:8000/api/auth/login', (req) => {
            req.headers['X-Tenant'] = 'rmhcsc'
        }).as('login');

        cy.get('input[name=email]').type('admin@supportcommunity.com');
        cy.get('input[name=password]').type('SupportCommunity!21');

        cy.get('form').submit();
  
        cy.wait('@login').then((interception) => {
            const response = interception.response;
            expect(response.statusCode).to.eq(200);
        });
    })

    it('Should check invalid credentials', () => {
        cy.intercept('POST', 'http://localhost:8000/api/auth/login', (req) => {
            req.headers['X-Tenant'] = 'rmhcsc'
        }).as('login');

        cy.get('input[name=email]').type('admin@supportcommunity.com');
        cy.get('input[name=password]').type('SupportCommunity!21s');

        cy.get('form').submit();
  
        cy.wait('@login').then((interception) => {
            const response = interception.response;
            expect(response.statusCode).to.eq(401);
        });
    })

    it('Should work remember me functionality', () => {
        cy.get('input[name=email]').type('admin@supportcommunity.com').as('emailInput');
        cy.get('input[name=password]').type('SupportCommunity!21s').as('passwordInput');
        cy.get('input[type=checkbox]').first().check({ force: true });
        cy.getCookie('email').should('exist').as('emailCookie');
        cy.getCookie('password').should('exist').as('passwordCookie');
        cy.reload();
        cy.get('@emailCookie').then((cookie) => {
            cy.get('@emailInput').invoke('val').then($text => {
                expect($text).not.empty.to.be.true;
            })
        })
        cy.get('@passwordCookie').then((cookie) => {
            cy.get('@passwordInput').invoke('val').then($text => {
                expect($text).not.empty.to.be.true;
            })
        })
    })
})