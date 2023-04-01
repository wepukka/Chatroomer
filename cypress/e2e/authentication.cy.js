describe("authentication", () => {
  it("connects to site", () => {
    cy.visit("/");
  });

  //
  it("Try to register with username that is not available, should show error message", () => {
    cy.visit("/");
    cy.register(Cypress.env("test_user"), Cypress.env("test_password"));
    cy.get("button").click();
    cy.get(".auth-error-msg").should("be.visible");
  });

  //
  it("Try to login with user that doesn't exist, should show error message", () => {
    cy.visit("/");
    cy.login("invalid_username_123123214", "invalid_userpassword_21312313");
    cy.get(".auth-error-msg").should("be.visible");
  });

  //
  it("Login with correct credentials, should be successful => add cookies => redirect to page where are certain classes", () => {
    cy.visit("/");
    cy.slogin();
    cy.get("button").click();

    // Since app signs you in if response is successful, you can basically be signed in before auth cookie is added
    // Wait for cookie to be added
    cy.wait(2000);

    // Access token should be added to cookies //
    cy.getCookies()
      .should("have.length", 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property("name", "accessToken");
      });

    // Username should be same that we logged in with //
    cy.get("#username").should("contain", Cypress.env("test_user"));

    cy.get(".log-out").click();

    // Logout removes cookies
    cy.getCookies().should("have.length", 0);
  });
});
