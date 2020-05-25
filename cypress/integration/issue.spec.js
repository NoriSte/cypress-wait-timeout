/// <reference types="Cypress" />

context('Waiting for new text', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Should detect the new text with `cy.waitUntil`', () => {
    cy.window().then((win) => win.mutateAfterDelay(10000))

    cy.get('#root')
      .invoke('text')
      .waitUntil(
        (firstDate) =>
          cy
            .get('#root')
            .invoke('text')
            .then((newDate) => newDate !== firstDate),
        { timeout: 20000 }
      )
  })

  it('Should detect the new text without `cy.waitUntil`', () => {
    cy.window().then((win) => win.mutateAfterDelay(10000))

    cy.get('#root')
      .invoke('text')
      .then((firstDate) => {
        cy.get('#root', { timeout: 20000 }).should(($el) => {
          const newDate = $el.text()
          expect(newDate).to.not.eq(firstDate)
        })
      })
  })
})
