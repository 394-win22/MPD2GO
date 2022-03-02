/* globals cy */

describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with Login Page", () => {
    cy.visit("/");
    cy.get("[data-cy=Login]").should("contain", "Email Address");
  });

  it("shows Forgot Password when user clicks Forget Password Link", () => {
    cy.visit("/");
    cy.get("[data-cy=ForgotPasswordLink]").click();
    cy.get("[data-cy=ForgotPasswordModal]").should("contain", "Reset Password");
  });
});
