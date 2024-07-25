describe("API Mocking and Intercepts", () => {
  beforeEach(() => {
    // Set fetch to null to force the use of XMLHttpRequest
    cy.on("window:before:load", (win) => {
      win.fetch = null;
    });

    // Handle uncaught exceptions to prevent test failure
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Visit the login page before each test
    cy.visit("https://pokeheroes.com/login");
    cy.login("Username", "Password");
    cy.wait(10000);
  });

  it("should mock a network error", () => {
    // Intercept the GET request and force a network error
    cy.intercept("GET", "**/userprofile?name=Username", {
      forceNetworkError: true,
    }).as("networkError");

    // Attempt to visit the user profile page
    cy.visit("https://pokeheroes.com/userprofile?name=Username", {
      failOnStatusCode: false,
    }).then((response) => {
      // The visit command does not return a response, so use the intercept to catch the error
    });

    // Wait for the intercepted request and verify the network error
    cy.wait("@networkError").then((interception) => {
      expect(interception.error.message).to.include("Failed to fetch");
    });

    // Listen for uncaught exceptions and prevent the test from failing
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("Failed to fetch")) {
        // Return false to prevent Cypress from failing the test
        return false;
      }
    });

    // Alternatively, you can catch the specific error and assert it
    cy.on("fail", (error) => {
      if (error.message.includes("socket hang up")) {
        // Prevent the test from failing
        return false;
      }
      throw error; // Throw any other error
    });
  });

  it("should mock a delayed response", () => {
    cy.intercept("GET", "**/userprofile?name=Username", (req) => {
      req.reply((res) => {
        res.delay = 50000; // Delay the response by 2000ms (2 seconds)
        // res.send({
        //   statusCode: 200,
        //   body: { name: 'Taavi', message: 'Delayed response' },
        // });
      });
    }).as("delayedProfile");

    cy.contains("Username").click();
  });

  it("should mock the API response and verify the request", () => {
    cy.intercept(
      "GET",
      "https://pokeheroes.com/userprofile?name=Username",
      (req) => {
        req.redirect("https://pokeheroes.com/userprofile.php?name=Kuroo");
      }
    ).as("redirectRequest");

    cy.contains("Username").click();

    cy.wait("@redirectRequest");
  });
  
});
