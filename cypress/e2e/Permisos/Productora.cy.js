describe('Probando que el productor puede acceder a crear eventos', () =>{
    beforeEach(() =>{
        cy.loginAsProducer();
        cy.visit('/');
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

    it ('Le aparece el boton de crear evento', () => {
        
        cy.get('[data-cy="crear-evento-button"]').should('be.visible');
    })

    it ('Le aparece el boton de editar evento', () =>{
        cy.get('[data-cy="editar-evento"]').first().should('be.visible');
    })

    it ('Le aparece el boton de eliminar evento', () =>{
        cy.get('[data-cy="eliminar-evento"]').first().should('be.visible');
    })
    
    it ('No puede acceder a comprar entradas', () =>{
        cy.get('[data-cy="card-Concierto de Metal"]').click();
        cy.get('[data-cy="ver-entradas-button"]').click();
        cy.contains("Para realizar esta acción necesitas inicar sesión.").should('be.visible');
    });
})