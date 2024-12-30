describe('PHPEngine', () => {
    it('should create an API for adding 2 numbers and configure it correctly', () => {
        cy.visit('https://v2.backendmaker.com/apimaker/')

        // Login
        cy.get('[placeholder="UserName"]').type('admin')
        cy.get('[placeholder="Password"]').type('Admin123!@#')
        cy.get('[value="LOGIN"]').click()
        cy.get('[placeholder="Captcha Code"]').type('223366')
        cy.get('[value="LOGIN"]').click()

        // Open app
        cy.get('[style="cursor: pointer;"]>b').contains('test1').click()

        // Open API section and create API
        cy.contains('a', 'APIs').click()
        cy.get('.btn.btn-outline-dark.btn-sm.ms-1').contains('Create API').click().wait(1000) 

        // Fill API details
        cy.get('[type="text"][placeholder="Name"]').type("adding_2_numbers")
        cy.get('textarea').clear().type("addition of 2 numbers")
        cy.get('.form-select.form-select-sm').select('HTTP API')
        cy.get('.btn.btn-primary.btn-sm').click().wait(1000)

        // Check if API already exists and delete if necessary
        cy.get('.alert.alert-success').then(($span) => {
            const message = $span.text()

            if (message.includes('Already exists')) {
                cy.get('.btn-close').eq(0).click({ force: true }).wait(500)
                cy.contains('a', '/adding_2_numbers')

                cy.get('tr').each((row) => {
                    cy.wrap(row).invoke('text').then((text) => {
                        if (text.includes('addition of 2 numbers')) {
                            cy.wrap(row).find('input.btn.btn-outline-danger').click()
                            return false
                        }
                    })
                })

                // Recreate the API
                cy.contains('a', 'APIs').click()
                cy.get('.btn.btn-outline-dark.btn-sm.ms-1').contains('Create API').click().wait(1000)

                cy.get('[type="text"][placeholder="Name"]').type("adding_2_numbers")
                cy.get('textarea').clear().type("addition of 2 numbers")
                cy.get('.form-select.form-select-sm').select('HTTP API')
                cy.get('.btn.btn-primary.btn-sm').click().wait(500)
            }

            // Define the API functionality
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

            cy.get('#s2_ladom_pupop > .modal-dialog > .modal-content > .modal-header > .btn-close').click()
            cy.get('.save_block_a > .btn').click().wait(1000)


            // cy.get('.test_menu_div_a').click()
            // cy.get('select').select('test1.backendmaker.com (cloud)')
            // cy.get(':nth-child(3) > :nth-child(1) > .btn').click()

            // testing no of cases 
            
            
            // for (let index = 0; index < 11; index++) {
            //     cy.get('pre').click({force: true})
            //     cy.get('[data-for="s2_tttttttset"]').type('5')

            //     cy.get('#s2_ladom_pupop > .modal-dialog > .modal-content > .modal-header > .btn-close').click({force: true})
            // }
        })
    })
})
