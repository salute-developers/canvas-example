describe('index', () => {
    before(() => {
        cy.start();
    });

    it('pathname корректный', () => {
        cy.location('pathname').should('eq', '/sber/@sberbox');
    });

    it('загрузилась', () => {
        cy.matchImageSnapshot();
    });
});
