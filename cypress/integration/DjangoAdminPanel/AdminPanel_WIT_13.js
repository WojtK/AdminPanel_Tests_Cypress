/*
Scenariusz WIT-13 [AdminPanel] -
Edycja nazwy tagu
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Add and remove tag "cypres_tag"', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Edit "cypres_tag"', () => {
        cy.get('[href="/admin/taggit/tag/add/"]').click()
        cy.get('[name="name"]').type("cypres_tag")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Change tag name to "zmieniony_tag"', () => {
        cy.get('[href="/admin/taggit/tag/"').first().click()
        cy.get('[id="searchbar"]').type("cypres_tag")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('#result_list > tbody > tr > th > a').click()
        cy.get('[name="name"]').clear().type("zmieniony_tag")
        cy.get('[value="Zapisz"]').click()
    })
    it('Delete tag "zmieniony_tag"', () => {
        cy.get('[href="/admin/taggit/tag/"]').first().click()
        cy.get('[id="searchbar"]').type("zmieniony_tag")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})