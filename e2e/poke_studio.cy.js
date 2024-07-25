describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > .nav_button').click();
    cy.get(':nth-child(2) > [style="text-align: left"] > input').clear('T');
    cy.get(':nth-child(2) > [style="text-align: left"] > input').type('Username');
    cy.get(':nth-child(3) > [style="text-align: left"] > input').click();
    cy.get(':nth-child(3) > [style="text-align: left"] > input').clear('S');
    cy.get(':nth-child(3) > [style="text-align: left"] > input').type('Password');
    cy.get(':nth-child(4) > td > input').click();
    cy.get(':nth-child(2) > .nav_button').click();
    cy.get(':nth-child(2) > .nav_button').click();
    /* ==== End Cypress Studio ==== */
  })
})

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.on('window:before:load', (win) => {
  win.fetch = null;
});