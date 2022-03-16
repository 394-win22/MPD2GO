/*
  Collin Murch
  Individual Cypress Tests: Directory Page
*/

Cypress.Commands.add("visitDirectory", () => {
  cy.visit("/");
  cy.wait(1000);
  cy.get("[data-testid=PeopleAltIcon]").click();
});

describe("Directory Page", () => {
  it("View Directory Page", () => {
    cy.visitDirectory();
    cy.get("[data-testid=SearchIcon]").should("be.visible");
  });

  it("Filter Buttons Appear", () => {
    cy.visitDirectory();
    cy.get("[type=text]").should("be.visible").click();
    cy.contains("Staff").should("be.visible");
    cy.contains("Finance").should("be.visible");
  });

  it("Searching an Individual User Works", () => {
    cy.visitDirectory();
    cy.get("[type=text]").should("be.visible").click().type("User 2");
    cy.contains("Testing User 2").should("be.visible");
    cy.contains("Testing User 1").should("not.exist");
    cy.contains("Testing User 3").should("not.exist");
  });

  it("Searching an Many Users Work", () => {
    cy.visitDirectory();
    cy.get("[type=text]").should("be.visible").click().type("Testing User");
    cy.contains("Testing User 2").should("be.visible");
    cy.contains("Testing User 1").should("be.visible");
    cy.contains("Testing User 3").should("be.visible");
  });

  it("Clicking a User Goes to Profile", () => {
    cy.visitDirectory();
    cy.contains("Testing User 2").should("be.visible").click();
    cy.contains("Testing User 2").should("be.visible");
    cy.contains("Hi, I am test user 2").should("be.visible");
    cy.contains("Chicago, IL").should("be.visible");
  });
});
