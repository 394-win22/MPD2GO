/* globals cy */

/*
 Group written Cypress commands
*/

Cypress.Commands.add('login', () => {
  cy.wait(2000)

  cy.get('body').then(($body) => {
		if ($body.find('[data-testid=GoogleIcon]').length) {
      cy.get('#email').should('be.visible').type('test@example.com')
      cy.get('#password').should('be.visible').type('password')
      cy.get('#submitLogin').click()
    }
  })
})

Cypress.Commands.add('logout', () => {
	cy.wait(2000)

	cy.get('body').then(($body) => {
		if ($body.find('.ql-editor').length) {
			cy.get('[data-testid=AccountCircleIcon]').click()
			cy.get('#logout_btn').click()
		}
	})
})

/*
  Collin Murch
  Individual Cypress Tests: Directory Page
*/

describe('Directory Page', () => {
  beforeEach(() => {
    // Logout if we are logged in
    cy.visit('/')
    cy.wait(1000)

    cy.logout()

    // Login
    cy.login()
  })

  it('View Directory Page', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-testid=PeopleAltIcon]').click()
    cy.get('[data-testid=SearchIcon]').should('be.visible')
  })

  it('Filter Buttons Appear', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-testid=PeopleAltIcon]').click()
    cy.get('[type=text]').should('be.visible').click()
    cy.contains('Staff').should('be.visible')
    cy.contains('Finance').should('be.visible')
  })

  it('Searching an Individual User Works', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-testid=PeopleAltIcon]').click()
    cy.get('[type=text]').should('be.visible').click().type('User 2')
    cy.contains('Testing User 2').should('be.visible')
    cy.contains('Testing User 1').should('not.exist')
    cy.contains('Testing User 3').should('not.exist')
  })

  it('Searching an Many Users Work', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-testid=PeopleAltIcon]').click()
    cy.get('[type=text]').should('be.visible').click().type('Testing User')
    cy.contains('Testing User 2').should('be.visible')
    cy.contains('Testing User 1').should('be.visible')
    cy.contains('Testing User 3').should('be.visible')
  })

  it('Clicking a User Goes to Profile', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('[data-testid=PeopleAltIcon]').click()
    cy.contains('Testing User 2').should('be.visible').click()
    cy.contains('Testing User 2').should('be.visible')
    cy.contains('Hi, I am test user 2').should('be.visible')
    cy.contains('Chicago, IL').should('be.visible')
  })
})