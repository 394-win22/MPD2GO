

describe("Profile Page", () => {
    it("Access Other User Profile", () => {
        cy.visit("/");
        cy.contains('Testing User 2').click()
        cy.get(".MuiAvatar-img").click()
        cy.get(".MuiTypography-h4").should("contain", "Testing User 2");
      });

      it("Access User's Profile Page", () => {
        cy.visit("/profile/");
        cy.get(".MuiTypography-h4").should("contain", "Testing User 1");
      });

      it("Edit User's Profile Page", () => {
        cy.visit("/profile/");
        cy.contains('Edit Profile').click()
        cy.get("[name=displayName]").should("be.visible").clear().type("Testing User 1 Edit");
        cy.get("[name=email]").should("be.visible").clear().type("testEdit@example.com");
        cy.get("[name=bio]").should("be.visible").clear().type("Hi, I am test user Edited");
        cy.get("[name=location]").should("be.visible").clear().type("Moon");
        cy.get("[name=year]").should("be.visible").clear().type("2023");
        cy.get('#mui-component-select-teamId').click()
        cy.get('.MuiList-root > [tabindex="-1"]').click()
        cy.get('.css-m69qwo-MuiStack-root > .MuiButton-contained').click()
    });

    it("Check After Edit", () => {
        cy.visit("/profile/");
        cy.get('.MuiTypography-h4').should("contain", "Testing User 1 Edit");
        cy.get("[cy-data=bio]").should("contain", "Hi, I am test user Edited");
        cy.get("[cy-data=location]").should("contain", "Moon");
        cy.get("[cy-data=class]").should("contain", "Class of 2023");
        cy.get("[cy-data=teamButton]").should("contain", "View Test Team 2");
    });

    it("Edit User's Profile Page Back", () => {
        cy.visit("/profile/");
        cy.contains('Edit Profile').click()
        cy.get("[name=displayName]").should("be.visible").clear().type("Testing User 1");
        cy.get("[name=email]").should("be.visible").clear().type("test@example.com");
        cy.get("[name=bio]").should("be.visible").clear().type("Hi, I am test user");
        cy.get("[name=location]").should("be.visible").clear().type("Chicago");
        cy.get("[name=year]").should("be.visible").clear().type("2022");
        cy.get('#mui-component-select-teamId').click()
        cy.get('.MuiList-root > [tabindex="-1"]').click()
        cy.get('.css-m69qwo-MuiStack-root > .MuiButton-contained').click()
    });
});