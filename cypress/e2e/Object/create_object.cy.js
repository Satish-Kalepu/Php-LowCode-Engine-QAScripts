describe('PHP Engine', () => {
  let sampleData;
  before(() => {
    cy.fixture('sample_data.json').then((data) => {
      sampleData = data;
      Cypress.env('sampleData', sampleData);
    });
  });
  it('Object Data', () => {
    cy.visit('https://v2.backendmaker.com/apimaker/');
    login();
  });

  function login() {
    const user = Cypress.env('sampleData').user;
    cy.get('input[placeholder="UserName"]').type(user.username);
    cy.get('input[placeholder="Password"]').type(user.password);
    cy.get('input[value="LOGIN"]').click();
    cy.get('input[placeholder="Captcha Code"]').type(user.captcha);
    cy.get('input[value="LOGIN"]').click();
    openApp();
  }

  function openApp() {
    const appName = Cypress.env('sampleData').app.name;
    cy.get('b').contains(appName).click();
    cy.get('a').contains('Objects').click().wait(1000);
    createGraph();
  }

  function createGraph() {
    let foundTesting = false;
    cy.get('table.table.table-bordered.table-striped.w-auto:not(.table-sm) tbody tr').each(($row, index, $rows) => {
        cy.wrap($row).find('td').each(($cell, cellIndex) => {
            if ($cell.text().includes("testing")) {
                cy.wrap($row).find('a').click().wait(2000);
                openDatabase();
                foundTesting = true;
                return false; 
            }
        });
    }).then(() => {
        if (!foundTesting) {
          cy.log("didn't exist..creating new Database");
          createNewGraph();
        }
    });
  }

  function openDatabase() {
    const familyData = Cypress.env('sampleData').family;
    for (let index = 0; index < familyData.length; index++) {
        cy.get('div').contains('Create Node').click().wait(700);
        cy.get('[data-var="ref:thingnew:data:thing:i_of:v"]').click().wait(500);
        cy.get('[id="contextmenu_key1"]').type(familyData[index].i_of)
        cy.get('div.context_item').contains(familyData[index].i_of).click({force: true}).wait(1000);
        cy.get('[id="ref:thingnew:data:thing:l:v"]').type(familyData[index].l);
        cy.get('[value="Create Object"]').click().wait(1000);
    }
    cy.get('a').contains('Objects').click().wait(1000);
    cy.get('table.table.table-bordered.table-striped.w-auto:not(.table-sm) tbody tr').each(($row, index, $rows) => {
        cy.wrap($row).find('td').each(($cell, cellIndex) => {
            if ($cell.text().includes("testing")) {
                cy.wrap($row).find('a').click().wait(2000);
                createFamilyTree();
                return false; 
            }
        });
    })
  }

  function createNewGraph() {
    cy.log("Creating another graph...");
    const databaseName = Cypress.env('sampleData').database.name;
    cy.get('div').contains('Create Internal Graph Database').click();
    cy.get('input[placeholder="Database name"]').type(databaseName);
    cy.get('input[value="Create"]').click().wait(1000);
    createGraph();
  }

  function createFamilyTree() {
    const graphData = Cypress.env('sampleData').graph
    cy.get('[id="tabs_container_summary"]')
      .find('div.btn.btn-link.btn-sm')
      .each(($div) => {
        if ($div.text().includes('Family')) {
          cy.wrap($div).click();
          cy.log('Existed');
          return false;
        }
      })
      .then(() => {
        cy.log('Doesn\'t exist');
        cy.get('[id="tab_browse"]').click().wait(1000);
        cy.get('tbody').find('tr').then(($rows) => {
          let found = false;
          cy.wrap($rows).each(($row, index) => {
            if (found) {
              return false;
            }
            cy.wrap($row).find('td').each(($cell) => {
              if ($cell.text().includes(graphData.nodeType)) {
                cy.log("yesssss");
                found = true;
                cy.wrap($row).find('td').first().find('a').click().wait(500);
                insertData();
                return false;
              }
            });
          }).then(() => {
            if (!found) {
              cy.log("noooooo");
              createNewNode();
            }
          });
        });
      });
  }

  function createNewNode() {
    const graphData = Cypress.env('sampleData').graph;
    const familyData = Cypress.env('sampleData').family;
    cy.get('div').contains('Create Node').click();
    cy.get('[id="ref:thingnew:data:thing:l:v"]').type(graphData.nodeType);
    cy.get('[id="ref:thingnew:data:thing:props:p1:0:v"]').type(graphData.nodeProps);
    cy.get('div').contains('Enable Sub Nodes').click();
    cy.get(':nth-child(5) > .btn > .fa-regular').click();  
    let propsData = familyData[0].props;
    cy.log(propsData);
    let propsArray = Object.entries(propsData);  
    cy.log(propsArray);
    cy.log(propsArray.length);  
    propsArray.forEach(([key, value]) => {
      cy.get('[id="ref:thingnew:data:new_field:name:v"]').clear().type(key);
      cy.get('tr > :nth-child(3) > .btn').click({force: true});
      cy.get('[id="ref:thingnew:data:new_field:name:v"]').clear();
      cy.log(value);  
      if (Array.isArray(value)) {
        cy.log(value[0]);  
        if (value[0].includes("Person:") || value[0].includes("City:")) {
          cy.get('table.table.table-bordered.table-sm.w-auto').eq(2).find('tr').then(($rows) => {
            cy.log(`Found ${$rows.length} rows in the table`);
            cy.wrap($rows).each(($row, index) => {
              const rowIndex = index + 2;
              cy.log(`Processing row p${rowIndex} (index: ${index})`);
              const dataVarSelector = `[data-var="ref:thingnew:data:thing:z_t:p${rowIndex}:type"]`;
              const dataThingSelector = `[data-var="ref:thingnew:data:thing:z_t:p${rowIndex}:i_of:v"]`;
              cy.log(`Generated selector: ${dataVarSelector}`);
              cy.wrap($row).find('td').each(($cell, cellIndex) => {
                if ($cell.text().includes(key)) {
                  cy.log(`Clicking on selector: ${dataVarSelector}`);
                  cy.wrap($row).find(dataVarSelector).click().wait(1000);
                  cy.get('div.context_item').contains('Graph Node').click({force: true});
                  cy.wrap($row).find(dataThingSelector).click().wait(1000);
                  if (value[0].includes("Person:")) {
                    cy.get('[id="contextmenu_key1"]').clear().type("Person");
                    cy.get('div.context_item').click()            
                  }else if (value[0].includes("City:")) {
                    cy.get('[id="contextmenu_key1"]').clear().type("City");
                    cy.get('div.context_item').click()        
                  }
                  return;
                }
              });
            });
          });
        }
      }
    });
    cy.get('input[value="Create Object"]').click().wait(500);
    insertData();
  }

  function insertData() {
    const graphData = Cypress.env('sampleData').graph
    const familyData = Cypress.env('sampleData').family;
    cy.get('div').contains('Create Node').click().wait(700);
    cy.get('[data-var="ref:thingnew:data:thing:i_of:v"]').click()
    cy.get('[id="contextmenu_key1"]').type(graphData.nodeType)
    cy.get('div.context_item').contains(graphData.nodeType).click({force: true}).wait(1000);
    for (let index = 0; index < familyData.length; index++) {
        cy.get('[data-var="ref:thingnew:data:thing:l:t"]').click();
        cy.get('div.context_item').contains('Object Thing').click()
        cy.get('[data-var="ref:thingnew:data:thing:l:v"]').click().wait(1000)
        cy.get('[id="contextmenu_key1"]').type(familyData[index].l)
        cy.get('div.context_item').contains(familyData[index].l).click({force: true}).wait(1000);
        let data = familyData[index].props;
        cy.get('[id="ref:thingnew:data:thing:props:p2:0:v"]').type(String(data.Gender))
        return false;
    }
  }
  
});