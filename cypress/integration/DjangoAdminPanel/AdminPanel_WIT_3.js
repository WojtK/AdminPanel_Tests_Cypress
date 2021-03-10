/*
Scenariusz WIT-3 [AdminPanel] - Dodanie
i usunięcie grupy
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Add and remove group', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add group "cypres_grupa"', () => {
        cy.get('[href="/admin/auth/group/add/"]').click()
        cy.get('[name="name"]').type("cypres_grupa")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Delete group "cypres_grupa"', () => {
        cy.get('[href="/admin/auth/group/"').first().click()
        cy.get('[id="searchbar"]').type("cypres_grupa")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})