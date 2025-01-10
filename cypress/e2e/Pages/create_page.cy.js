describe('PHPEngine', () => {
    it('Create new file', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click()
        cy.get('input[placeholder="Captcha Code"]').clear().type('223366')
        cy.get('.btn').click().wait(500)

        cy.get('a').contains('testing-app').click();
        cy.get('a').contains('Pages').click();
        cy.get('button').contains('Create PAGE').click().wait(500);
        cy.get('input[placeholder="Name"]').clear().type('testing');
        cy.get('select.form-select').select('html');
        cy.get('.btn.btn-primary.btn-sm').contains('Create').click();
    })
})