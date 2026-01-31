describe('Crear evento', () =>{
    beforeEach(() =>{
        cy.loginAsProducer();
    })
    it('crea un nuevo evento correctamente', () => {
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
        cy.contains('Evento creado con éxito').should('be.visible');
    })
    it('muestra errores al dejar campos obligatorios vacíos', () => {
        cy.log('Iniciando prueba de validación de campos obligatorios');
        cy.get('[data-cy="crear-evento-button"]').click();
        cy.get('button[type="submit"]').click();
        cy.contains('La fecha es requerida').should('be.visible');
        cy.contains('La descripción es requerida').should('be.visible');
        cy.contains('La cantidad de entradas es requerida').should('be.visible');
        cy.contains('Debe ingresar el nombre').should('be.visible');
    })
})

describe('usuario no producer', () =>{
    beforeEach(() =>{
        cy.loginAsRegular();
    })
    it('no muestra el boton de crear evento', () => {
        cy.log('Verificando que el botón de crear evento no esté visible para usuarios no productores');
        cy.get('[data-cy="crear-evento-button"]').should('not.exist');
    })
})