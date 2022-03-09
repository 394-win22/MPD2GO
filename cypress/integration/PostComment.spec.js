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

describe("Test Commenting on Post", () => {
	it("goes to post", () => {
		cy.visit("/");
		cy.contains('This is a test post').click()
		// cy.get("[data-cy=AddCommentTextField]").should("be.visible").clear().type("test comment");
		// cy.get("[data-cy=AddCommentTextField]").should("be.visible").clear().type("test comment");
		cy.get('.css-1w7qqfi > .mantine-RichTextEditor-root > .quill > .ql-container > .ql-editor > p').click();
		cy.focused().type("test comment");


		cy.get('.css-1w7qqfi > .MuiBox-root > .MuiButton-root').click()
		cy.get('.makeStyles-contentContainer-10 > .mantine-RichTextEditor-root > .quill > .ql-container > .ql-editor').should("contain", "test comment");
		// cy.get(".MuiAvatar-img").click()
		// cy.get(".MuiTypography-h4").should("contain", "Testing User 2");
	});

});
