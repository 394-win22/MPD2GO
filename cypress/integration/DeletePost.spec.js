let BASE_URL = "http://localhost:3000";

describe("Test Delete Post Page", () => {
  it("opens with createPost Page", () => {
    cy.visit("/createPost");
    cy.get("[data-cy=submitPostBtn]").should("contain", "Post");
  });

  it("create new post", () => {
    cy.get(".ql-editor > p").click();
    cy.focused().type("POST TO DELETE");
    cy.get("[data-cy=submitPostBtn]").click();
  });

  it("check if new post exists", () => {
    cy.visit("/");
    cy.get("[data-cy=postListBox]").should("contain", "POST TO DELETE");
  });

  it("deletes post", () => {
    cy.contains("POST TO DELETE").click();
    cy.get("[data-cy=postDotsMenu]").click();
    cy.get("[data-cy=postDelButton]").click();
    cy.get("[data-cy=postConfirmDelButton]").click();
    cy.url().should("eq", BASE_URL + "/");
    cy.contains("POST TO DELETE").should("not.exist");
  });
});
