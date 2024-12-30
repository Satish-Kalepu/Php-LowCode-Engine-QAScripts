describe('PHPEngine', () => {
    it('should create an API for adding 2 numbers and configure it correctly', () => {
        cy.visit('http://localhost:8888/apimaker/')

        // Login
        cy.get('[placeholder="UserName"]').type('admin')
        cy.get('[placeholder="Password"]').type('Admin123!@#')
        cy.get('[value="LOGIN"]').click()
        cy.get('[placeholder="Captcha Code"]').type('1234')
        cy.get('[value="LOGIN"]').click()

        // Open app
        cy.get('[style="cursor: pointer;"]>b').contains('testingtable').click()

        // Open API section and create API
        cy.contains('a', 'APIs').click()
        cy.get('.btn.btn-outline-dark.btn-sm.ms-1').contains('Create API').click().wait(1000) 

        // Fill API details
        cy.get('[type="text"][placeholder="Name"]').type("simple-interest")
        cy.get('textarea').clear().type("calculating simple interest")
        cy.get('.form-select.form-select-sm').select('HTTP API')
        cy.get('.btn.btn-primary.btn-sm').click().wait(1000)

        // Check if API already exists and delete if necessary
        cy.get('.alert.alert-success').then(($span) => {
            const message = $span.text()

            if (message.includes('Already exists')) {
                cy.get('.btn-close').eq(0).click({ force: true }).wait(500)
                cy.contains('a', '/simple-interest')

                cy.get('tr').each((row) => {
                    cy.wrap(row).invoke('text').then((text) => {
                        if (text.includes('calculating simple interest')) {
                            cy.wrap(row).find('input.btn.btn-outline-danger').click()
                            return false
                        }
                    })
                })

                // Recreate the API
                cy.contains('a', 'APIs').click()
                cy.get('.btn.btn-outline-dark.btn-sm.ms-1').contains('Create API').click().wait(1000)

                cy.get('[type="text"][placeholder="Name"]').type("simple-interest")
                cy.get('textarea').clear().type("calculating simple interest")
                cy.get('.form-select.form-select-sm').select('HTTP API')
                cy.get('.btn.btn-primary.btn-sm').click().wait(500)
            }

            // Define the API functionality
            cy.get("[type='checkbox']").click({ multiple: true })
            cy.get('.btn.btn-outline-danger.btn-sm.ms-2').click({ force: true })

            // Add input properties
            cy.get('.btn.btn-success.btn-sm.px-1.py-0').click()
            cy.get('[placeholder="New Property"]').type("months")
            cy.get('.btn.btn-success.btn-sm.p-1').click()
            cy.get('.codeline_thing_pop').eq(0).click()
            cy.get('div').contains('Number').click()

            cy.get('.btn.btn-success.btn-sm.px-1.py-0').click()
            cy.get('[placeholder="New Property"]').type("principle_amount")
            cy.get('.btn.btn-success.btn-sm.p-1').click()
            cy.get('.codeline_thing_pop').eq(1).click()
            cy.get('div').contains('Number').click()

            cy.get('.btn.btn-success.btn-sm.px-1.py-0').click()
            cy.get('[placeholder="New Property"]').type("rate_of_interest")
            cy.get('.btn.btn-success.btn-sm.p-1').click()
            cy.get('.codeline_thing_pop').eq(2).click()
            cy.get('div').contains('Number').click()


            cy.get('.btn.btn-outline-dark.btn-sm.py-0').click()
            cy.get('[data-for="stages"]').contains('none').click()
            cy.get('.context_item.ps-2').contains('Let').click()
            cy.get('[data-allow="variable_name"]').type("c")
            cy.get('.codeline_thing_pop').eq(3).click({ force: true })
            cy.get('div').contains('Number').click()
            

            cy.get('.btn.btn-outline-dark.btn-sm.py-0').click()
            cy.get('[data-for="stages"]').contains('none').click()
            cy.get('.context_item.ps-2').contains('Math').click()
            cy.get('[data-var="d:lhs:v:v"]').click()
            cy.get('.context_item').contains('c: ').click()
            cy.get('.codeline_thing_pop').eq(4).click()
            cy.get('.context_item').contains('Variable').click()
            cy.get('[title="Variable"]').eq(0).click()
            cy.get('.context_item').contains('principle_amount: ').click()
        })
    })
})
