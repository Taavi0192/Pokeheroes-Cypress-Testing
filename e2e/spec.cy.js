// cypress/integration/pokeheroes_spec.js
describe('PokeHeroes Tests', () => {
  before(() => {
    // Runs once before all tests in the block
    // cy.visit('https://pokeheroes.com/');
    cy.navigate_to_home();
    cy.wait(5000); // Add a wait to ensure the page fully loads
  });

  beforeEach(() => {
    // Runs before each test in the block
    // cy.visit('https://pokeheroes.com/');
    cy.navigate_to_home();
    cy.wait(5000); // Add a wait to ensure the page fully loads
  });

  it('should display the "Home" text in the sidebar', () => {
    cy.get('#sidebar span b').contains('Home').should('be.visible');
  });

  it('should click the "?" button', () => {
    cy.get('#lovebox span a img[alt="Question Mark Icon"]')
      .click({ multiple : true });
  });

  it('should find and click the "Log In" button', () => {
    cy.get('#topnav_wrapper').find('a[href="login"]').click();
    cy.wait(5000);
    // cy.get('input[name="username_login"]').click().type('myUsername');
    cy.login('Riako', 'Password123$');
  });

  it('should simulate a mouseover event', () => {
    cy.get('input').trigger('mouseover');
  });

  it('should log in with multiple users', () => {
    cy.fixture('users').then((users) => {
      users.forEach((user) => {
        cy.login(user.username, user.password);
        // Add assertions to verify successful login
        // cy.url().should('include', 'dashboard');
        // Log out if needed to prepare for next login
        // cy.get('a[href="logout"]').click();
      });
    });
  });

  it('should log in using environment variables', () => {
    cy.get('#topnav_wrapper').find('a[href="login"]').click();
    cy.get('input[name="username_login"]').type(Cypress.env('username'));
    cy.get('input[name="password_login"]').type(Cypress.env('password'));
    cy.get('input[type="submit"]').click();
  });

});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.on('window:before:load', (win) => {
  win.fetch = null;
});