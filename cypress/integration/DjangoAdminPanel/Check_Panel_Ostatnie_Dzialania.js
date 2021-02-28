function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Check panel "Ostatnie dzialania"', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add user "panel"', () => {
        cy.get('[href="/admin/auth/"]').click()
        cy.get('[href="/admin/auth/user/add/"]').click()
        cy.get('[id="id_username"]').type("panel")
        cy.get('[id="id_password1"]').type("TestTest10!")
        cy.get('[id="id_password2"]').type("TestTest10!")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Delete user "panel"', () => {
        cy.get('[href="/admin/auth/"]').click()
        cy.get('[href="/admin/auth/user/"').first().click()
        cy.get('[id="searchbar"]').type("panel")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[href="#"]').click()
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
    it('Check Panel "Ostatnie dzialania"', () => {
        cy.get('[href="/admin/"').click()
        cy.get('#recent-actions-module > ul > li:nth-child(1)').contains("panel")
        cy.get('#recent-actions-module > ul > li:nth-child(2)').contains("panel")
    })
})