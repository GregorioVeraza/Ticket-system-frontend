describe('Probando que el user no puede crear eventos', () => {
    beforeEach(() => {
        cy.loginAsUser();
        cy.log('Iniciando prueba de permisos de user');
    })

    it('No muestra el botón de crear evento para user', () => {
        cy.get('[data-cy="crear-evento-button"]').should('not.exist');
    })

    it('No muestra los botones de editar y eliminar evento para user', () => {
        cy.get('[data-cy="editar-evento"]').should('not.exist');
        cy.get('[data-cy="eliminar-evento"]').should('not.exist');
    })

    it('No permite acceder a la ruta de staff para escanear qr', () => {
        cy.visit('/scanner');
        cy.contains('No tienes permisos para acceder a esta página').should('be.visible');
    })
}
)