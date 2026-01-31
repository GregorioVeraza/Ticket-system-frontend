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
    
    it('Actualiza un nombre de evento correctamente', () => {
        cy.log('Iniciando prueba de actualización de evento');
        cy.get('[data-cy="editar-evento"]').click();
        cy.contains('Actualizar Evento').should('be.visible');
        cy.get('input[name="nombre"]').clear().type('Concierto de Rock');
        cy.get('button[type="submit"]').click();
        cy.contains('Concierto de Rock').should('be.visible');
    })

    it('Actualiza tipos de entrada correctamente', () => {
        cy.log('Iniciando prueba de actualización de tipos de entrada');
        cy.get('[data-cy="editar-evento"]').click();
        cy.contains('Agregar entrada').should('be.visible');
        cy.get('button').contains('Agregar entrada').click();
        cy.get('input[name="tipoEntrada.1.nombre"]').type('VIP');
        cy.get('input[name="tipoEntrada.1.precio"]').type('150');
        cy.get('input[name="tipoEntrada.1.cantidadEntradas"]').clear().type('50');
        cy.get('button[type="submit"]').click();
        cy.contains('$-150').should('be.visible');
    })
})