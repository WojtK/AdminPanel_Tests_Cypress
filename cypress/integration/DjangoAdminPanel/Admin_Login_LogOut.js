describe('Admin login and logout (correct and incorrect data)', () => {
    it('Log in (incorrect password)', () => {
        cy.visit('http://127.0.0.1:8000/admin/')
        cy.get('[id="id_username"]').type("admin")
        cy.get('[id="id_password"]').type("incorrect")
        cy.get('[value="Zaloguj się"]').click()
        cy.get('[class="errornote"')
    })
    it('Log in (incorrect login)', () => {
        cy.visit('http://127.0.0.1:8000/admin/')
        cy.get('[id="id_username"]').type("incorrect")
        cy.get('[id="id_password"]').type("admin")
        cy.get('[value="Zaloguj się"]').click()
        cy.get('[class="errornote"')
    })
    it('Log in', () => {
        cy.visit('http://127.0.0.1:8000/admin/')
        cy.get('[id="id_username"]').type("admin")
        cy.get('[id="id_password"]').type("admin")
        cy.get('[value="Zaloguj się"]').click()

    })
    it('Log out', () => {
        cy.wait(3000)
        cy.get('[href="/admin/logout/"]').click()

    })
})