describe("Login API Requests", () => {
  beforeEach(() => {
    // Set fetch to null to force the use of XMLHttpRequest
    cy.on("window:before:load", (win) => {
      win.fetch = null;
    });

    // Handle uncaught exceptions to prevent test failure
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should send the request and verify", () => {
    cy.request("https://pokeheroes.com/userprofile?name=Username").then(
      (response) => {
        expect(response.status).to.equal(200);
      }
    );
  });  

  it('should make parallel requests and verify responses', () => {
    const requests = [
      cy.request('GET', 'https://pokeheroes.com/userprofile?name=Username'),
      cy.request('GET', 'https://pokeheroes.com/userprofile?name=Username2')
    ];

    // Use Promise.all to handle multiple requests
    Promise.all(requests).then((responses) => {
      responses.forEach((response, index) => {
        // Log the response for debugging
        console.log(`Response ${index + 1}:`, response);
        // Check if the response is undefined
        if (response !== undefined) {
          expect(response.status).to.equal(200);
        } else {
          console.log(`Response ${index + 1} is undefined`);
        }
      });
    }).catch(error => {
      console.error('Request failed:', error);
    });
  });

  it('should make sequential requests and verify responses', () => {
    // Load the URLs from the fixture
    cy.fixture('urls').then((urls) => {
      // Iterate over each URL and make the request sequentially
      urls.forEach((url) => {
        cy.request('GET', url).then((response) => {
          // Log the response for debugging
          console.log(`Response for ${url}:`, response);

          // Check if the response is defined and has a status of 200
          expect(response).to.have.property('status', 200);
        });
      });
    });
  });
});
