import * as uuid from 'uuid';

describe('POST /categories', () => {
  let categoryId;

  beforeEach(() => {
    cy.task('db:clean');

    categoryId = uuid.v4();
  });

  it('Creates a category', () => {
    const category = {
      _id: categoryId,
      title: 'Sports',
    };

    cy.request({
      method: 'POST',
      url: 'categories',
      body: category,
    })
      .its('status')
      .should('equal', 204);
  });
});
