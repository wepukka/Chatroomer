describe("Mobile tests", () => {
  it("Navbars works correctly", () => {
    cy.visit("/");
    cy.slogin();

    // Should be hidden by on pc view
    cy.get(".toggle-side-nav").should("not.be.visible");

    // Switch to mobile view
    cy.viewport(400, 550);

    // Navbar toggle button should become visible when using smaller viewport
    cy.get(".toggle-side-nav").should("be.visible");

    // Side nav should be hidden by default
    cy.get(".side-nav").should("not.be.visible");

    // Changes side-nav to be shown
    cy.get(".toggle-side-nav").click();
    cy.get(".side-nav").should("be.visible");

    // .toggle-nav button hides side nav
    cy.get(".toggle-nav").click();
    cy.get(".side-nav").should("not.be.visible");
  });
});
