/*
Scenariusz WIT-60 [AdminPanel] - Dodanie i
usunięcie profilu przez admin panel
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Add and remove profile "cypres_profil"', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add user "cypres_profil"', () => {
        cy.get('[href="/admin/auth/"]').click()
        cy.get('[href="/admin/auth/user/add/"]').click()
        cy.get('[id="id_username"]').type("cypres_profil")
        cy.get('[id="id_password1"]').type("TestTest10!")
        cy.get('[id="id_password2"]').type("TestTest10!")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Add "cypres_profile" to profile', () => {
        cy.get('[href="/admin/account/profile/add/"]').click()
        cy.get('[name="user"]').select("cypres_profil")
        cy.get('[value="Zapisz"]').click()
    })
    it('Check that "cypres_profil" is displayed', () => {
        cy.get('[href="/admin/account/profile/"]').first().click()
        //cy.get('[class="results"]').should('have.text', 'cypres_profil')
        cy.get('[class="results"]').contains("cypres_profil")
    })
    it('Delete user "cypres_profil"', () => {
        cy.get('[href="/admin/auth/"]').click()
        cy.get('[href="/admin/auth/user/"').first().click()
        cy.get('[id="searchbar"]').type("cypres_profil")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[href="#"]').click()
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})