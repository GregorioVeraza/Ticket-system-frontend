/// <reference types="cypress" />
// Custom commands for testing

import { TEST_USERS } from './test-users'

/**
 * Mockea Auth0 para devolver un usuario específico
 */
const mockAuth0User = (role: string) => {
  // Interceptar llamadas a Auth0
  cy.intercept('https://test.auth0.com/**', (req) => {
    req.reply({
      statusCode: 200,
      body: {
        isAuthenticated: true,
        user: {
          sub: `${role}-user-001`,
          email: `${role}@example.com`,
          email_verified: true,
          nickname: role,
          name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
          picture: 'https://example.com/pic.jpg',
          role: role,
          updated_at: new Date().toISOString(),
        },
        isLoading: false,
        error: null,
      }, 
    })
  })
}

/**
 * Login como Producer
 */
Cypress.Commands.add('loginAsProducer', () => {
  mockAuth0User('producer')
  cy.visit('http://localhost:5173/')
  cy.wait(1000) // Esperar a que Auth0 cargue
})

/**
 * Login como Staff
 */
Cypress.Commands.add('loginAsStaff', () => {
  mockAuth0User('staff')
  cy.visit('http://localhost:5173/')
  cy.wait(1000)
})

/**
 * Login como Admin
 */
Cypress.Commands.add('loginAsAdmin', () => {
  mockAuth0User('admin')
  cy.visit('http://localhost:5173/')
  cy.wait(1000)
})

/**
 * Login como usuario regular
 */
Cypress.Commands.add('loginAsUser', () => {
  mockAuth0User('user')
  cy.visit('http://localhost:5173/')
  cy.wait(1000)
})

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsProducer(): Chainable<void>
      loginAsStaff(): Chainable<void>
      loginAsAdmin(): Chainable<void>
      loginAsUser(): Chainable<void>
    }
  }
}
