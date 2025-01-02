describe('PHPEngine',() => {
    it('Tables Creating', () => {
        cy.fixture('CreateTableDetails.json').then((credentials) => {
            const { URL, username, password, captcha, applicationName, description, api_1, api_1description, table_name, table_description } = credentials

            // open Url
            cy.visit(URL)

            // login
            cy.get('[placeholder="UserName"]').type(username)
            cy.get('[placeholder="Password"]').type(password)
            cy.get('[value="LOGIN"]').click()
            cy.get('[placeholder="Captcha Code"]').type('223366')
            cy.get('[value="LOGIN"]').click()

            // create APP
            // cy.get('.btn.btn-outline-dark.btn-sm').contains('Create App').click()
            // cy.get('[placeholder="App name"]').type(applicationName).wait(500)
            // cy.get('[placeholder="Description"]').type(description)
            cy.get('.btn.btn-danger.btn-sm').contains('Create').click({force: true}).wait(1000)

            // open app
            cy.contains('b', applicationName).click()
            // cy.get(':nth-child(5) > [style="padding: 10px;"] > :nth-child(2) > :nth-child(2)').select('home').wait(500)
            // cy.get('[value="UPDATE"]').click({multiple: true}).wait(500)
            
            // select table
            cy.contains('a', 'Internal Tables').click()

            // create table
            // cy.contains('button', 'Create Table').click()
            // cy.get('[placeholder="Name"]').type(table_name) //table name
            // cy.get('textarea').type(table_description).wait(500) //api description
            // cy.get('.btn.btn-primary.btn-sm').click({force: true})

            cy.contains('a','Import CSV/JSON/XLS').click() //file import button
            cy.get('[type="file"]').selectFile('customers-1000.csv') //selecting file
            cy.get('[value="Import"]').click() //importing
            cy.get('[value="Proceed"]').click().wait(5000) //proceed to import

            cy.get('.btn.btn-outline-secondary.btn-sm').contains('Back').click().wait(5000); //check table created or not
            // cy.get('.btn.btn-outline-danger.btn-sm').click() //delete the table

            //check the db for table leftover
            cy.log("check the db for table leftover")

            cy.get('[style="min-width: 200px;"]').should('have.text', 'customers1000csv').click()
            cy.contains('a', 'Records').click().wait(2000)

            // cy.get('div').should('have.text', 'Records: 1000')
            cy.get('[style="padding: 5px 10px;"]>div').should('have.text', 'Records: 1000')

            cy.get('[style="float: right;"]').contains('Back').click()
            cy.get('.btn.btn-outline-danger.btn-sm').click() //delete the table
        })
    })
})