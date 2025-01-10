describe('PHPEngine', () => {
    it('Create new file', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click()
        cy.get('input[placeholder="Captcha Code"]').clear().type('223366')
        cy.get('.btn').click().wait(500)

        cy.get('a').contains('testing-app').click();
        cy.get('a').contains('Databases').click();
        cy.get('button').contains('Add Database').click().wait(500);
        cy.get('input[placeholder="Please Enter Database Description"]').clear().type('testing db');
        cy.get('select.form-select').select('MySql');
        cy.get('.btn.btn-sm.btn-outline-dark').contains('Save').click();
    })
})