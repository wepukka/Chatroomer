const USERNAME = "cypress-test-user";
const PASSWORD = USERNAME;

describe("authentication", () => {
  it("connects to site", () => {
    cy.connect();
  });

  it("Login with invalid params, should show error message", () => {
    cy.connect();
    cy.get("#login-username").type("INVALID_USER_432432014213412");
    cy.get("#login-password").type("INVALID_PASSWORD_43204932049023");
    cy.get("button").click();
    cy.get(".auth-error-msg").should("be.visible");
  });

  it("Register with username that is not available", () => {
    cy.connect();
    cy.get(".auth-member").click();
    cy.get("#register-username").type(USERNAME);
    cy.get("#register-password").type(PASSWORD);
    cy.get("button").click();
    cy.get(".auth-error-msg").should("be.visible");
  });
});
