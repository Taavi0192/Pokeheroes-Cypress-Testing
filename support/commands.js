import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

Cypress.Commands.add('navigate_to_home', () => {
  cy.visit('https://pokeheroes.com');
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://pokeheroes.com/login');
  cy.get('input[name="username_login"]').type(username);
  cy.get('input[name="password_login"]').type(password);
  cy.get('input[type="submit"]').click();
});

addMatchImageSnapshotCommand();
