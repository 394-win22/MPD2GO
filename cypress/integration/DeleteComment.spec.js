describe("Test deleting a comment on post", () => {
  it("goes to post", () => {
    cy.visit("/");
    cy.contains("This is a test post").click();

    //create post
    cy.get(".ql-editor > p").click({ multiple: true });
    cy.focused().type("test comment");

    cy.get("[data-cy=submitPostBtn]").click();
    cy.get(
      ".mantine-RichTextEditor-root > .quill > .ql-container > .ql-editor"
    ).should("contain", "test comment");
    cy.get("[data-cy=deleteMenu]").click();
    cy.get("[data-cy=deleteButton]").click();
    cy.contains("test comment").should("not.exist");
  });
});
