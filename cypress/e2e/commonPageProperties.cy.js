describe("Room functionalities", () => {
  it("Joins room, inspects room, leaves room, deletes room", () => {
    cy.visit("");
    cy.slogin();
    cy.get("#join-room-button").click();
    cy.get("#modal-input").type("cypress-test-room");
    cy.get(".modal-button").click();

    cy.get("span").should(($span) => {
      expect($span).to.have.length(2);
      expect($span.first()).to.contain("ChatBot");
    });

    // User shows in users list //
    cy.get(".usersList>li>p").should("be.visible");

    // Wait a while, backend & db might still be processing adding room
    cy.get(".leave-room-button").click();

    // Wait incase backend and db is still processing updating user rooms //
    cy.wait(2000);

    // For some reason in cypress room list won't update after leaving room. Works correctly in browser.
    // Re visit page to render rooms
    cy.visit("");

    // Room we joined should now be visible in our room list that is fetched from database //
    cy.get("#cypress-test-room") // Rooms have id of the room name.
      .should("be.visible")
      .should("have.class", "nav-select-room-join");

    // Activate delete mode
    cy.get("#delete-room-button").click();

    // Select room to delete
    cy.get("#cypress-test-room")
      .should("have.class", "nav-select-room-delete")
      .click();

    // Click again to delete
    cy.get("#delete-room-button").click();

    // Room should be deleted
    cy.get("#cypress-test-room").should("not.exist");
  });
});

describe("Room functionalities", () => {
  it("Joins room, inspects room, leaves room, deletes room", () => {
    cy.visit("");
    cy.slogin();
  });
});
