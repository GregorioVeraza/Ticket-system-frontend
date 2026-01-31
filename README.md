# Ticketing System – Frontend

Frontend del sistema de gestión de eventos desarrollado como Trabajo Integrador para la materia **Ingeniería de Aplicaciones Web**.
La aplicación permite a los usuarios autenticarse, visualizar eventos, comprar tickets y validar permisos según su rol.

---

## Descripción

Este frontend es una aplicación web desarrollada en **React** que consume una API REST para la gestión de eventos y tickets.  
La autenticación y autorización de usuarios se realiza mediante **Auth0**, utilizando roles para controlar el acceso a las distintas funcionalidades del sistema.
La gestión de los pagos se realiza mediante **Mercado Pago**.

---

## Funcionalidades principales

- Inicio de sesión y registro de usuarios mediante Auth0.
- Visualización de eventos disponibles.
- Compra de tickets para eventos.
- Restricción de funcionalidades según rol:
  - Usuario: compra de tickets.
  - Productor: gestión de eventos.
  - Staff: validación de tickets mediante código QR.
- Tests de interfaz de usuario con Cypress.

---

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Auth0
- Cypress
- HTML / CSS
