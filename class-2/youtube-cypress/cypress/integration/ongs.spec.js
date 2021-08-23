/// <reference types="cypress" />

describe('Ongs', () => {
  it('Should be able to create a new Ong.', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.back-link').click();
    cy.get('[data-cy=name]').type('Ong Test Name');
    cy.get('[data-cy=email]').type('ong@test.com');
    cy.get('[data-cy=whatsapp]').type('00123456789');
    cy.get('[data-cy=city]').type('Test City');
    cy.get('[data-cy=uf]').type('TT');

    cy.route('POST', '**/ongs').as('postOng');

    cy.get('[data-cy=submit]').click();

    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    })
  });

  it('Should be able to log in with an Ong.', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type(Cypress.env('createdOngId'));
    cy.get('.button').click();
  });
})