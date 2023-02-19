describe('successful login', () => {
  beforeEach(() => {
    cy.visit('/')
})
  it('logins', () => {
    cy.login('test@test.com', 'test')

    cy.contains('Добро пожаловать test@test.com').should('be.visible')
  })

  it('Login line not filled', () => {
    cy.viewport(320, 568)
    cy.login(null, 'test')

    cy.get('#mail')
    .then((elements) => elements[0].checkValidity())
    .should('be.false')

    cy.get('#mail')
    .then((elements) => elements[0].validationMessage)
    .should('contain','Заполните это поле.')
  })

  it('Login error', () => {
    cy.login('test@tes', 'test')

    cy.get('#mail')
    .then((elements) => elements[0].checkValidity())
    .should('be.true')

    cy.get('#mail')
    .then((elements) => elements[0].validationMessage)
    .should('contain','')
       
})
});

describe('Favorites page must be empty', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.login('test@test.com', 'test')
})
  it('Find a book', () => {
    cy.viewport(1280, 800)
    cy.get('.card-img').click()
    cy.get('#title').type('Kasper')
    cy.contains('Submit').click()
    cy.contains('Kasper').should('be.visible')
  })

  it('add book to favorites', () => {
    cy.contains('Add to favorite' ).click()
    cy.contains('Delete from favorite').should('be.visible')

  })

  it('remove book from favorites', () => {
    cy.get('h4').click()
    cy.contains('Delete from favorite').click()
    cy.contains('Please add some book to favorit on home page!')
    .should('be.visible')
  })
})