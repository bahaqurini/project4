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
  it('should not submit the form if the title is empty and show an error message', () => {
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should('be.visible').should('contain', 'Card Set Title')
    .within(() => {
      cy.get('input[type="submit"]').should('be.visible').click();
      cy.contains('TITLE CANNOT BE EMPTY').should('be.visible') ;
    }); 
  });
  it ('should click on a card select it and show the card details and can add cards', () => {
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="toggle_form"]').should('be.visible').should('contain', 'Add New Card');
    cy.get('[data-cy="toggle_form"]').click();
    // the better way to do this is to use the within command to scope the search for the form elements within the card_form element, this way we don't have to repeat the selector for the card_form element multiple times and it makes the test more readable and maintainable.
    // cy.get('[data-cy="card_form"]').should('be.visible').within(() => {
    //   cy.get('[id="termInput"]').type('Test Term');
    //   cy.get('input[id="descriptionInput"]').type('Test Description');
    //   cy.get('input[type="submit"]').should('be.visible').click();
    // });
    // as video show an alternative to the within command we can also use the find command to search for the form elements within the card_form element, this way we can still keep the test readable and maintainable without having to repeat the selector for the card_form element multiple times.
    cy.get('[data-cy="card_form"]').should('be.visible');
    cy.get('[data-cy="card_form"]').find('[id="termInput"]').type('Test Term');
    cy.get('[data-cy="card_form"]').find('input[id="descriptionInput"]').type('Test Description');
    cy.get('[data-cy="card_form"]').find('input[type="submit"]').should('be.visible').click();
    cy.get('div[class="term"]').should('be.visible').should('contain', 'Test Term');

  }
  );
  it('should show an error message if the term or description is empty when adding a new card', () => {
    cy.get('[data-cy="1"]').click();
    cy.get('[data-cy="toggle_form"]').should('be.visible').should('contain', 'Add New Card');
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="card_form"]').should('be.visible').within(() => {
      cy.get('input[type="submit"]').should('be.visible').click();
      // cy.get('[class="error"]').should('be.visible').should('contain', 'TERM AND DESCRIPTION CANNOT BE EMPTY');
      cy.contains('TERM AND DESCRIPTION CANNOT BE EMPTY').should('be.visible');
      cy.get('[id="termInput"]').type('Test Term');
      cy.get('input[type="submit"]').should('be.visible').click();
      // cy.get('[class="error"]').should('be.visible').should('contain', 'DESCRIPTION CANNOT BE EMPTY');
      cy.contains('DESCRIPTION CANNOT BE EMPTY').should('be.visible');
      cy.get('[id="termInput"]').clear();
      cy.get('input[id="descriptionInput"]').type('Test Description');
      cy.get('input[type="submit"]').should('be.visible').click();
      // cy.get('[class="error"]').should('be.visible').should('contain', 'TERM CANNOT BE EMPTY');
      cy.contains('TERM CANNOT BE EMPTY').should('be.visible');
    });
  });
});