describe('PHPEngine', () => {
    let generatedKey;
    it('Create new file', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click()
        cy.get('input[placeholder="Captcha Code"]').clear().type('223366')
        cy.get('.btn').click().wait(500)

        cy.get('a').contains('testing-app').click();
        cy.get('a').contains('Authentication').click();
        cy.get('a').contains('Access Keys').click().wait(500);
        cy.get('[style="height: calc(100% - 150px); overflow: auto;"] > :nth-child(1) > div > .btn').click().wait(500)
        cy.get('input[placeholder="Purpose/Name"]').clear().type('testing').wait(500);
        cy.get('select.form-select.form-select-sm.w-auto').eq(0).select('tables');
        cy.get('#key_edit_modal > .modal-dialog > .modal-content > .modal-footer > .btn-outline-dark').click().wait(1000)

        cy.get('.text-success').invoke('text').then((text) => {
            generatedKey = text.match(/Created new key: (\S+)/)[1];
        })
        cy.then(() => {
            cy.get('.btn-close').eq(1).click();
            cy.get('a').contains('Global APIs').click();
            cy.get('select').eq(0).select('testing-app.backendmaker.com');
            cy.get('button').contains('My APIs').click();
            cy.get('button').contains('/adding_2_numbers').click();
            cy.get('.btn.btn-outline-dark.btn-sm').contains('Test').click().wait(1000);
            cy.get('input.form-control.form-control-sm').type(generatedKey).wait(1000)

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
})