describe("Test the ablility to make a pizza", function(){
    beforeEach(function(){
        cy.visit("http://localhost:3000")
        cy.get('[href="/pizza"]').click();
    })
    it("Test the ability to make a pizza", function(){
        cy.get('#name').type("Marc").should('have.value', "Marc")
        cy.get('form > :nth-child(7)').click()
        cy.get(':nth-child(13) > input').click()
        cy.get(':nth-child(14) > input').click()
        cy.get('.submit').click()
    });
    it("test validation errors", function(){
        cy.get('#name').type("Marc").should('have.value', "Marc").clear()
        cy.get('[data-cy="nameError"]').should('be.visible')
    })
})