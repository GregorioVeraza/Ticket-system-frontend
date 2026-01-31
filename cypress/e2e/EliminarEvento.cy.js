describe('Crear evento', () =>{
    beforeEach(() =>{
        cy.loginAsProducer();
        cy.log('Iniciando prueba de creación de evento');
        cy.get('[data-cy="crear-evento-button"]').click();
        cy.get('input[name="nombre"]').type('Concierto de Metal');
        cy.get('[data-cy="input-descripcion"]').type('Un concierto épico de metal.');
        cy.get('[data-cy="input-fecha"]').type('2024-12-31');
        cy.get('[data-cy="input-cantidad-entradas"]').clear().type('1');
        cy.get('[data-cy="input-nombre-entrada-1"]').type('General');
        cy.get('[data-cy="input-precio-entrada-1"]').type('50');
        cy.get('[data-cy="input-cantidad-entrada-1"]').clear().type('100');
        
        cy.get('button[type="submit"]').click();
    })
    
    it('Elimina un evento correctamente', () => {
        cy.log('Iniciando prueba de eliminar un evento');
        cy.get('[data-cy="eliminar-evento"]').click();
        cy.contains('Eliminar Evento').should('be.visible');
        cy.contains('¿Seguro que querés eliminar el evento Concierto de Metal?').should('be.visible');
        cy.get('[data-cy="confirmar-eliminacion"]').click();
        cy.get('[data-cy="card-Concierto de Metal"]').should('not.exist');
    })
})