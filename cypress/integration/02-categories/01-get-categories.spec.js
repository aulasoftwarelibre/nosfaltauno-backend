describe('GET /categories', () => {
  beforeEach(() => {
    cy.task('db:clean');
  });

  it('Validate the database is empty', () => {
    cy.request({
      method: 'GET',
      url: 'categories',
    })
      .its('body')
      .should('have.length', 0);
  });
});
