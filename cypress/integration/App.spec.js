/* globals cy */

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

describe("Test App", () => {
  it("launches & logout", () => {
    cy.visit("/");
    cy.logout();
  });

  it("opens with Login Page", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").should("contain", "Email Address");
  });

  it("shows Forgot Password when user clicks Forget Password Link", () => {
    cy.visit("/");
    cy.get("[data-cy=ForgotPasswordLink]").click();
    cy.get("[data-cy=ForgotPasswordModal]").should("contain", "Reset Password");
    cy.get("[data-cy=closeResetPasswordModel]").click();
  });

  it("login", () => {
    cy.login();
    cy.get(".ql-editor").should("contain", "This is a test post");
  });
});
