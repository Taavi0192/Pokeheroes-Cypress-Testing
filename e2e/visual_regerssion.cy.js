describe('Visual Regression Testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should match the support', () => {
    cy.login('Username', 'Password');
    cy.visit('https://panel.pokeheroes.com/support.php');
    cy.matchImageSnapshot('support');
  });

  it('should match the homepage', () => {
    cy.matchImageSnapshot('homepage');
  });

  it('should match the login page', () => {
    cy.get('#topnav_wrapper').find('a[href="login"]').click();
    cy.matchImageSnapshot('login-page');
  });
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.on('window:before:load', (win) => {
  win.fetch = null;
});