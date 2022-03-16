describe("Profile Page", () => {
  it("Access Other User Profile", () => {
    cy.visit("/");
    cy.contains("Testing User 2").click();
    cy.get(".MuiAvatar-img").click();
    cy.get(".MuiTypography-h5").should("contain", "Testing User 2");
  });

  it("Access Other User Team", () => {
    cy.contains("Testing User 2").click();
    cy.get("[cy-data=viewTeam]").should("contain", "View Test Team 2").click();
    cy.get(".MuiCardContent-root").should("contain", "Testing User 2");
  });

  it("Access User's Profile Page", () => {
    cy.visit("/profile/");
    cy.get(".MuiTypography-h5").should("contain", "Testing User 1");
    cy.get("[cy-data=viewTeam]").should("contain", "View Test Team 1").click();
    cy.get(".MuiCardContent-root").should("contain", "Testing User 1");
  });

  it("Edit Profile", () => {
    cy.visit("/profile/");
    cy.get('[data-testid="EditIcon"]').click();
    cy.get('[cy-data="editBio"]').click();
    cy.get("#bio").type(" edit");
    cy.get('[cy-data="submitBio"]').click();
    cy.get('[cy-data="submitEdition"]').click();
    cy.get(".css-opxngx-MuiTypography-root").should("contain", "edit");
  });
});
