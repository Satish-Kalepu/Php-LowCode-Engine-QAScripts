describe('PHPEngine', () => {
    it('Create new file', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click()
        cy.get('input[placeholder="Captcha Code"]').clear().type('223366')
        cy.get('.btn').click().wait(500)

        cy.get('a').contains('testing-app').click();
        cy.get('a').contains('Functions').click();
        cy.get('button').contains('Create Function').click().wait(500);
        cy.get('input[placeholder="Name"]').clear().type('additionFunction');
        cy.get('.btn.btn-primary.btn-sm').contains('Create').click().wait(1000);

        cy.get('a').contains('additionFunction').click()


        // adding 2 numbers

        cy.get("[type='checkbox']").click({ multiple: true })
        cy.get('.btn.btn-outline-danger.btn-sm.ms-2').click({ force: true })

        // Add input properties
        cy.get('.btn.btn-success.btn-sm.px-1.py-0').click()
        cy.get('[placeholder="New Property"]').type("a")
        cy.get('.btn.btn-success.btn-sm.p-1').click()
        cy.get('.codeline_thing_pop').eq(0).click()
        cy.get('div').contains('Number').click()

        cy.get('.btn.btn-success.btn-sm.px-1.py-0').click()
        cy.get('[placeholder="New Property"]').type("b")
        cy.get('.btn.btn-success.btn-sm.p-1').click()
        cy.get('.codeline_thing_pop').eq(1).click()
        cy.get('div').contains('Number').click()

        // Define result variable and math operation
        cy.get('.btn.btn-outline-dark.btn-sm.py-0').click()
        cy.get('[data-for="stages"]').contains('none').click()
        cy.get('.context_item.ps-2').contains('Let').click()
        cy.get('[data-allow="variable_name"]').type("c")
        cy.get('.codeline_thing_pop').eq(2).click({ force: true })
        cy.get('div').contains('Number').click()

        cy.get('.btn.btn-outline-dark.btn-sm.py-0').click()
        cy.get('[data-for="stages"]').contains('none').click()
        cy.get('.context_item.ps-2').contains('Math').click()
        cy.get('[data-var="d:lhs:v:v"]').click()
        cy.get('.context_item').contains('c: ').click()
        cy.get('.codeline_thing_pop').eq(3).click()
        cy.get('.context_item').contains('Variable').click()
        cy.get('[title="Variable"]').eq(0).click()
        cy.get('.context_item').contains('a: ').click()
        cy.get('.codeline_thing_pop').eq(4).click()
        cy.get('.context_item').contains('Variable').click()
        cy.get('[title="Variable"]').eq(1).click()
        cy.get('.context_item').contains('b: ').click()

        // Set up JSON response
        cy.get('.btn.btn-outline-dark.btn-sm.py-0').click()
        cy.get('[data-for="stages"]').contains('none').click()
        cy.get('.context_item.ps-2').contains('RespondJSON').click()
        cy.get('pre').click()
        cy.get('[data-type="dropdown2"]').eq(9).click({ force: true })
        cy.get('.context_item').contains('Variable').click()
        cy.get('[title="Variable"]').eq(3).click()
        cy.get('.context_item').contains('c: ').click()

        cy.get('#popup_modal_close_btn').click()
        cy.get('.save_block_a > .btn').click().wait(1000)
    })
})