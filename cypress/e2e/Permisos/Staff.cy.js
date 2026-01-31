describe('Probando que el staff puede acceder a escanear QR', () => {
    beforeEach(() => {
        cy.loginAsStaff();
        cy.log('Iniciando prueba de permisos de staff');
    })

    it('No puede acceder a la pagina principal', () => {
        cy.visit('/');
        cy.contains('No tienes permisos para acceder a esta página').should('be.visible');
    })

    it('Permite acceder a la ruta de staff para escanear qr', () => {
        cy.visit('/scanner');
        cy.contains('Escanear Código QR').should('be.visible');
    })
}
)