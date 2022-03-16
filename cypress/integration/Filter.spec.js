// Filter.spec.js created with Cypress by Fortune Emmanuel-King
//
// Cypress.Commands.add("visitDirectory", () => {
//     cy.visit("/");
// });


describe('Testing Filters in Home page', function(){
    it("Shows filters", () => {
        cy.visit("/");
        cy.wait(1000);
        cy.get('.MuiInputBase-input.css-yz9k0d-MuiInputBase-input').should("be.visible").click();
        // cy.contains("ExampleTestTeam").should("be.visible");
        cy.contains("Finance").should("be.visible");
        cy.contains("Marketing").should("be.visible");
        cy.contains("Software Development").should("be.visible");
    });

    it("Show all posts with Tag", ()=>{
        cy.visit("/");
        cy.wait(1000);
        cy.get('.MuiInputBase-input.css-yz9k0d-MuiInputBase-input').should("be.visible").click();
        cy.contains("Marketing").should("be.visible").click();
        cy.contains("Testing User 1").should("be.visible");
    });

    it("Team 1 filter", ()=>{
        cy.visit("/");
        cy.wait(1000);
        cy.get('.MuiInputBase-input.css-yz9k0d-MuiInputBase-input').should("be.visible").click();
        cy.contains("Test Team 2").should("be.visible").click();
        cy.contains("Testing User 2").should("be.visible");
        cy.contains("Testing User 1").should("not.exist");
    });



})
