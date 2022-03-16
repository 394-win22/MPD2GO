describe("Test deleting a comment on post", () => {
  it("goes to post", () => {
    cy.visit("/");
    cy.contains("This is a test post").click();

    cy.get("[data-cy=deleteMenu]").click();
    cy.get("[data-cy=deleteButton]").click();
    cy.contains("test comment").should("not.exist");
  });
});
