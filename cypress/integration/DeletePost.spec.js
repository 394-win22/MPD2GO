/* globals cy */

let BASE_URL = "http://localhost:3000";

Cypress.Commands.add("login", function () {
    cy.get("#email").should("be.visible").type("test@example.com");
    cy.get("#password").should("be.visible").type("password");
    cy.get("#submitLogin").click();
  });
  
  Cypress.Commands.add("logout", function () {
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find(".ql-editor").length) {
        cy.get("[data-testid=AccountCircleIcon]").click();
        cy.get("#logout_btn").click();
      }
    });
  });
  
  describe("Test Delete Post Page", () => {
    it("opens with createPost Page", () => {
      cy.visit("/createPost");
      cy.get("[data-cy=createPostBox]").should("contain", "Create a Post");
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
      cy.url().should('eq', BASE_URL+'/');
      cy.contains('POST TO DELETE').should('not.exist');
    });
  });