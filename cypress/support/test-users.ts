/**
 * Usuarios y datos de prueba para Cypress
 */

export const TEST_USERS = {
  STAFF: {
    email: Cypress.env('TEST_USER_STAFF_EMAIL'),
    password: Cypress.env('TEST_USER_STAFF_PASSWORD'),
    id: Cypress.env('TEST_USER_STAFF_ID'),
    role: 'staff',
  },
  PRODUCER: {
    email: Cypress.env('TEST_USER_PRODUCER_EMAIL'),
    password: Cypress.env('TEST_USER_PRODUCER_PASSWORD'),
    id: Cypress.env('TEST_USER_PRODUCER_ID'),
    role: 'producer',
  },
  ADMIN: {
    email: Cypress.env('TEST_USER_ADMIN_EMAIL'),
    password: Cypress.env('TEST_USER_ADMIN_PASSWORD'),
    id: Cypress.env('TEST_USER_ADMIN_ID'),
    role: 'admin',
  },
  REGULAR: {
    email: Cypress.env('TEST_USER_REGULAR_EMAIL'),
    password: Cypress.env('TEST_USER_REGULAR_PASSWORD'),
    id: Cypress.env('TEST_USER_REGULAR_ID'),
    role: 'user',
  },
};

/**
 * Ejemplo de uso en tests:
 * 
 * describe('Tests con diferentes roles', () => {
 *   it('Should work as Producer', () => {
 *     cy.login(TEST_USERS.PRODUCER.email, TEST_USERS.PRODUCER.password)
 *     cy.contains('Crear Evento').should('be.visible')
 *   })
 * 
 *   it('Should work as Staff', () => {
 *     cy.login(TEST_USERS.STAFF.email, TEST_USERS.STAFF.password)
 *     cy.contains('Escanear QR').should('be.visible')
 *   })
 * })
 */
