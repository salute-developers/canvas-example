describe('index', () => {
    before(() => {
        cy.start();
    });

    it('pathname корректный', () => {
        cy.location('pathname').should('eq', '/sber/@mobile');
    });
});
