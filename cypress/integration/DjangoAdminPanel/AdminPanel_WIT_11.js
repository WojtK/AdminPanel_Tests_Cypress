/*
Scenariusz WIT-11 [AdminPanel] -
Edycja nazwy grupy
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Edit group name', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add group "cypres_grupa"', () => {
        cy.get('[href="/admin/auth/group/add/"]').click()
        cy.get('[name="name"]').type("cypres_grupa")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Change group name to "zmieniona_grupa"', () => {
        cy.get('[href="/admin/auth/group/"').first().click()
        cy.get('[id="searchbar"]').type("cypres_grupa")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('#result_list > tbody > tr > th > a').click()
        cy.get('[name="name"]').clear().type("zmieniona_grupa")
        cy.get('[value="Zapisz"]').click()
    })
    it('Delete group "zmieniona_grupa"', () => {
        cy.get('[href="/admin/auth/group/"').first().click()
        cy.get('[id="searchbar"]').type("zmieniona_grupa")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})