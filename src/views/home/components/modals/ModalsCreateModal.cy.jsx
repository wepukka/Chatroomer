import React from "react";
import { CreateModal } from "./Modals";

describe("<CreateModal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateModal isOpenModal={true} />);
  });
});

describe("<CreateModal />", () => {
  it("Shows error msg with empty input", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateModal isOpenModal={true} />);
    cy.get("input").should("be.empty");
    cy.get(".modal-button").click();
    cy.get(".modal-error").should("have.text", "Please insert room name.");
  });
});
