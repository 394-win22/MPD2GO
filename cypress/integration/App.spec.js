/* globals cy */

describe('Test App', () => {

	it('launches', () => {
		cy.visit('/');
	});

	it ('opens with Login Page', () => {
		cy.visit ('/');
		cy.get('[data-cy=Login]').should('contain', 'Email Address');
	  });

});
