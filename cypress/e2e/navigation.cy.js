describe('navigation spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234');
  });
  it ('should have a header title', () => {
    cy.get('[data-cy="header"]').should('contain', 'Study Night');
  });

  it('should navigate to the about page', () => {
    cy.get('[data-cy="about-btn"]').click();
    cy.get('[data-cy="about_page"]').should('contain', 'About Study Night');
  });
  it('should navigate to the card sets page', () => {
    cy.get('[data-cy="cardSet-btn"]').click();
    cy.get('[data-cy="study-set-header"]').should('contain', 'Study Set Library');
    cy.get('[data-cy="toggle_form"]').should('be.visible').should('contain', 'Add New Set');
  });
  it('should navigate back to the home page', () => {
    cy.get('[data-cy="about-btn"]').click();
    cy.get('[data-cy="home-btn"]').click();
    cy.get('[data-cy="header"]').should('contain', 'Study Night');
  });
})