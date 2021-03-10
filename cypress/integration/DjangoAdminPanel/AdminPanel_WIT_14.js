/*
Scenariusz WIT-14 [AdminPanel] -Edycja
 zawartosci postu
 */

function Log_In(login, password) {
    cy.visit('http://127.0.0.1:8000/admin/')
    cy.get('[id="id_username"]').type("admin")
    cy.get('[id="id_password"]').type("admin")
    cy.get('[value="Zaloguj się"]').click()
}

describe('Edit post "cypres_post"', () => {
    beforeEach(() => {
        Log_In("admin", "admin")
    })
    it('Add post "cypres_post_edycja"', () => {
        cy.get('[href="/admin/blog/post/add/"]').click()
        cy.get('[name="title"]').type("cypres_post_edycja")
        cy.get('[name="author"]').type("1")
        cy.get('[name="body"]').type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
        cy.get('[name="status"]').select("Published")
        cy.get('[name="tags"]').type("cypres-post")
        cy.get('[value="Zapisz"]').click()
        cy.get('[class="success"]').contains('został dodany pomyślnie')
    })
    it('Check if "cypres_post_edycja" is visible on the blog', () => {
        cy.visit('http://127.0.0.1:8000/blog/list/')
        cy.get('[id="blog_post"]').contains("cypres_post_edycja")
        cy.get('[class="tags"]').contains("cypres-post")
    })
    it('Edit post', () => {
        cy.get('[href="/admin/blog/post/"]').first().click()
        cy.get('[id="searchbar"]').type("cypres_post_edycja")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('#result_list > tbody > tr:nth-child(1) > th > a').click()
        cy.get('[name="title"]').clear().type("cypres_post_zmieniony")
        cy.get('[name="body"]').clear().type("Edytowana tresc")
        cy.get('[value="Zapisz"]').click()
    })
    it('Check if "cypres_post_zmieniony" is visible on the blog', () => {
        cy.visit('http://127.0.0.1:8000/blog/list/')
        cy.get('[id="blog_post"]').contains("cypres_post_zmieniony")
    })
    it('Delete post "cypres_post_zmieniony"', () => {
        cy.get('[href="/admin/blog/post/"]').first().click()
        cy.get('[id="searchbar"]').type("cypres_post_zmieniony")
        cy.get('[value="Szukaj"]').click()
        cy.get('[class="action-checkbox"]').click()
        cy.get('[name="action"]').select('delete_selected')
        cy.get('[title="Wykonaj wybraną akcję"]').click()
        cy.get('[value="Tak, na pewno"]').click()
        cy.get('[class="success"]').contains('Pomyślnie usunięto')
    })
})