describe('Testes de Autenticação', () => {
    const api = 'http://localhost:3000';

    it('Deve responder rota base /auth', () => {
        cy.request(`${api}/auth`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.mensagem).to.eq('Rota base /auth funcionando!');
        });
    });

    it('Deve falhar com login inválido', () => {
        cy.request({
            method: 'POST',
            url: `${api}/auth/login`,
            failOnStatusCode: false,
            body: {
                email: 'usuario@invalido.com',
                password: 'errado'
            }
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property('error', 'Credenciais inválidas');
        });
    });

    it('Deve fazer login com sucesso e salvar token', () => {
        cy.request('POST', `${api}/auth/login`, {
            email: 'teste@teste.com',
            password: '123456'
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('token');
            Cypress.env('token', res.body.token); // armazena para outros testes
        });
    });
});
