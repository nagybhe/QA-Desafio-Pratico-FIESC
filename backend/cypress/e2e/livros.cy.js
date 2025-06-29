describe('Testes das Rotas de Livros', () => {
    const api = 'http://localhost:3000';

    it('Deve responder rota base /livros', () => {
        cy.request(`${api}/livros`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.mensagem).to.eq('Rota base /livros funcionando!');
        });
    });

    it('Deve listar todos os livros cadastrados', () => {
        cy.request(`${api}/livros/all`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('Deve cadastrar um novo livro', () => {
        const token = Cypress.env('token');

        cy.request({
            method: 'POST',
            url: `${api}/livros`,
            headers: {
                Authorization: `Bearer ${token}`  // Caso use autenticação no futuro
            },
            body: {
                titulo: 'O Tempo e o Vento',
                autor: 'Érico Veríssimo',
                ano: 1949,
                user_id: 1
            }
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.have.property('titulo', 'O Tempo e o Vento');
        });
    });
});
