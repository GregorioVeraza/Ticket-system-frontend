describe('App carga correctamente', () => {
  it('Carga la página principal', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Festival de Cine')
  })
})

describe('EventosContext', () => {
  it('debería cargar eventos mock en testing', () => {
    cy.visit('/')
    // Los eventos mock ya estarán cargados
    cy.contains('Concierto de Rock').should('be.visible')
  })
})