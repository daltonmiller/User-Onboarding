describe("this is our first test!", () => {
    it("Should return true", () => {
        expect(true).to.equal(true)
    })

})
describe("testing form inputs", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3001/")
    })
    it("visits the name input", () => {
        //name
        cy.get('#name').type("dalton Miller")
        .should("have.value", "dalton Miller")
        .type(" is awesome").should("have.value", "dalton Miller is awesome")
        .clear()
        //check name error
        cy.contains("username must be at least 3 characters")
        //checkbox check
        cy.get('#terms').check().should("be.checked")
        //email 
        cy.get('#email').type("dalton@gmail.com")
        .should("have.value", "dalton@gmail.com")
        .clear()
        //check email error
        cy.contains("must include email address")
        //password
        cy.get('#motivation').type("password")
        .should("have.value", "password")
        //submit
        cy.get('form').submit(onsubmit)



    })
})