describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').click();
    cy.get('#get > a').should('have.text', 'cy.get()');
    cy.get('#query-btn').click();
    cy.get('#contains > a').should('be.visible');
    cy.get(':nth-child(6) > :nth-child(1) > pre > .javascript > :nth-child(6)').click();
    cy.get('#root > a').click();
    cy.wait(10000);
    cy.get('#Syntax').should('have.id', 'Syntax');
    /* ==== End Cypress Studio ==== */
  })
})