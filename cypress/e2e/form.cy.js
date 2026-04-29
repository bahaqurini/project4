describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234');
    cy.get('[data-cy="cardSet-btn"]').click();
  });
  it('should show the form when the toggle button is clicked', () => {
    cy.get('[data-cy="toggle_form"]').should('be.visible').should('contain', 'Add New Set');
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should('be.visible');
  });
  it('should hide the form when the toggle button is clicked again', () => {
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should('be.visible');
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should('not.be.visible');
  });
  it('should submit the form and add a new card set to the library', () => {
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should('be.visible').should('contain', 'Card Set Title')
    .within(() => {
      cy.get('[id="titleInput"]').type('Test Set');
      cy.get('input[type="submit"]').should('be.visible').click();
      // cy.get('[data-cy="card_set_library"]').should('contain', 'Test Set');
    });
    cy.get('[data-cy="5"]').should('be.visible').should('contain', 'Test Set');
  });
  it ('should click on a card select it and show the card details and can add cards', () => {
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="toggle_form"]').should('be.visible').should('contain', 'Add New Card');
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="card_form"]').should('be.visible').within(() => {
      cy.get('[id="termInput"]').type('Test Term');
      cy.get('input[id="descriptionInput"]').type('Test Description');
      cy.get('input[type="submit"]').should('be.visible').click();
    });
    cy.get('div[class="term"]').should('be.visible').should('contain', 'Test Term');

  }
  );
})  