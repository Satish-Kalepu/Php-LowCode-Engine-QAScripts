describe('PHPEngine', () => {
    it('Create new file', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click()
        cy.get('input[placeholder="Captcha Code"]').clear().type('223366')
        cy.get('.btn').click().wait(500)

        cy.get('a').contains('testing-app').click();
        cy.get('a').contains('Global APIs').click().wait(500);
        cy.get('select').eq(0).select('testing-app.backendmaker.com');
        cy.get('button').contains('My APIs').click();
        cy.get('button').contains('/adding_2_numbers').click();
        cy.get('.btn.btn-outline-dark.btn-sm').contains('Test').click();
        cy.get('.btn.btn-outline-dark.btn-sm.py-0').contains('Generate Temporary Access key').click();
        
        cy.get('.ace_content').should('exist').wait(1000);

        const jsonContent = `{
            "a": 123,
            "b": 321
        }`;

        cy.get('.ace_editor.ace-tm')
        .then((aceElem) => {
            const aceEditor = aceElem[0].env.editor;
            aceEditor.setValue(jsonContent);
        });
        cy.get('input.btn').click().wait(1000);
        cy.get('pre[style="margin: 0px; padding: 0px 10px; background-color: rgb(248, 240, 248); border: 1px solid rgb(204, 204, 204);"]')
        .then(($pre) => {
            const responseText = $pre.text().trim();
            const parsedResponse = JSON.parse(responseText);
        
            expect(parsedResponse.status).to.equal('success');
            expect(parsedResponse.data).to.equal(444);
        });
    })
})