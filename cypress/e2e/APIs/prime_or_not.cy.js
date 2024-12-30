describe('PHP Engine', () => {
    it('Prime or Not', () => {
        cy.visit('http://localhost:8888/apimaker/')

        // login
        cy.get(':nth-child(1) > :nth-child(2) > .form-control').type('admin')
        cy.get(':nth-child(2) > :nth-child(2) > .form-control').type('Admin123!@#')
        cy.get('.btn').click().wait(1000)
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').type('1234')
        cy.get('.btn').click()

        // open app
        cy.get('[style="cursor: pointer;"]>b').contains('MyFirstApp').click()

        // open api
        cy.contains('a', 'APIs').click()
        cy.get('.btn.btn-outline-dark.btn-sm.ms-1').contains('Create API').click().wait(1000) 

        cy.get('[type="text"][placeholder="Name"]').type("prime_or_not")
        cy.get('textarea').clear().type("Check whether given was a prime or Not")
        cy.get('.form-select.form-select-sm').select('HTTP API')
        cy.get('.btn.btn-primary.btn-sm').click().wait(1000)

        // checking if api was already existed or not
        cy.get('.alert.alert-success').then(($span) => {
            const respo = $span.text()

            cy.log(respo)

            if(respo == 'Already exists'){
                cy.get('.btn-close').eq(0).click({force: true}).wait(500)
                cy.contains('a', '/prime_or_not')

                // if exits, delete

                cy.get('tr').each((row) => {
                    cy.wrap(row).invoke('text')
                })
            }
        })
    })
})