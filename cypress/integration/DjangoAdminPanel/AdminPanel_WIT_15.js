/*
Scenariusz WIT-15 [AdminPanel] - Dodawanie
i usuwanie komentarza z poziomu admin panelu
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Add and remove comment "cypres_com"', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add comment "cypres_com"', () => {
        cy.get('[href="/admin/blog/comment/add/"]').click()
        cy.get('[name="post"]').select("Post object (21)")
        cy.get('[name="name"]').type("cypres_com")
        cy.get('[name="email"]').type("cypres@cypress.com")
        cy.get('[name="body"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Delete comment "cypres_com"', () => {
        cy.get('[href="/admin/blog/comment/"]').first().click()
        cy.get('[id="searchbar"]').type("cypres_com")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click({multiple: true})
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})