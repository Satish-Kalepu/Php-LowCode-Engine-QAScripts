describe('PHP Engine', () => {
    it('login', () => {
      cy.visit('https://v2.backendmaker.com/apimaker/');
      cy.get('input[placeholder="UserName"]').type("admin");
      cy.get('input[placeholder="Password"]').type("Admin123!@#");
      cy.get('input[value="LOGIN"]').click();
      cy.get('input[placeholder="Captcha Code"]').type("223366");
      cy.get('input[value="LOGIN"]').click();
    })
  })