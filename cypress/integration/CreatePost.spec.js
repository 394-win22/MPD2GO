describe("Test Create Post Page", () => {
  it("opens with createPost Page", () => {
    cy.visit("/createPost");
    cy.get("[data-cy=submitPostBtn]").should("contain", "Post");
  });

  it("create new post", () => {
    cy.get(".ql-editor > p").click();
    cy.focused().type("cypress test creating post");
    cy.get("[data-cy=submitPostBtn]").click();
  });

  it("check if new post exists", () => {
    cy.visit("/");
    cy.get("[data-cy=postListBox]").should(
      "contain",
      "cypress test creating post"
    );
  });
});
