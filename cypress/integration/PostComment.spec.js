describe("Test Commenting on Post", () => {
  it("goes to post", () => {
    cy.visit("/");
    cy.contains("This is a test post").click();
    cy.get(".ql-editor > p").click({ multiple: true });
    cy.focused().type("test comment");

    cy.get("[data-cy=submitPostBtn]").click();
    cy.get(
      ".mantine-RichTextEditor-root > .quill > .ql-container > .ql-editor"
    ).should("contain", "test comment");
  });
});
