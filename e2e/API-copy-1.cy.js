// cypress/e2e/intercept_spec.cy.js
describe('Kitchen Sink Intercept Example', () => {
  beforeEach(() => {
    // Visit the Kitchen Sink page before each test
    cy.visit('https://example.cypress.io');
  });

  it('should intercept and mock a GET request', () => {
    // Intercept the GET request to /comments/1
    cy.intercept('GET', '**/comments/1', {
      statusCode: 200,
      body: {
        postId: 1,
        id: 1,
        name: 'Mocked Comment',
        email: 'mocked@example.com',
        body: 'This is a mocked comment'
      },
    }).as('getComment');

    // Visit a page that triggers the GET request
    cy.visit('https://example.cypress.io/commands/network-requests');

    // Click the button to fetch the comment
    cy.contains('Get Comment').click();

    // Wait for the intercepted request and verify the response
    cy.wait('@getComment').its('response.statusCode').should('equal', 200);

    // Verify the UI updates with the mocked data
    cy.get('.network-comment').should('contain', 'This is a mocked comment');
  });

  it('should send a POST request and verify the response', () => {
    // Send a POST request
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.cypress.io/comments',
      body: {
        postId: 1,
        name: 'New Comment',
        email: 'new@example.com',
        body: 'This is a new comment'
      }
    }).then((response) => {
      // Verify the response status code
      expect(response.status).to.equal(201);

      // Verify the response body
      expect(response.body).to.have.property('postId', 1);
      expect(response.body).to.have.property('name', 'New Comment');
      expect(response.body).to.have.property('email', 'new@example.com');
      expect(response.body).to.have.property('body', 'This is a new comment');
    });
  });
});
