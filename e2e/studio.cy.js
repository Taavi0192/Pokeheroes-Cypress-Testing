describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(4) > .row > .col-xs-12 > .home-list > :nth-child(1) > :nth-child(1)').click();
    cy.get('#navbar > :nth-child(1) > :nth-child(2) > a').click();
    cy.get(':nth-child(1) > :nth-child(3) > a').click();
    cy.get('.navbar-brand').click();
    cy.get('.home-list > :nth-child(17) > :nth-child(1)').should('have.text', 'Spies, Stubs & Clocks');
    cy.get(':nth-child(17) > ul > :nth-child(3)').click();
    cy.get(':nth-child(17) > ul > :nth-child(4) > a').should('have.attr', 'href', '/commands/spies-stubs-clocks');
    cy.get(':nth-child(5) > .container > .row > #utilities > h2').click();
    cy.get(':nth-child(13) > ul > :nth-child(2) > a').click();
    cy.get(':nth-child(1) > :nth-child(3) > .javascript').click();
    cy.get(':nth-child(1) > :nth-child(3) > .javascript').should('be.visible');
    cy.get(':nth-child(5) > .javascript').click();
    /* ==== End Cypress Studio ==== */
  })
})