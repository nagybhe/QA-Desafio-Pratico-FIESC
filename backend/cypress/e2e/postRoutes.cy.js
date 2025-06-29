describe('Testes POST - Login e Cadastro de Livros', () => {
    const api = 'http://localhost:3000';

    // Teste de login inválido
    it('Login com credenciais inválidas deve falhar', () => {
        cy.request({
            method: 'POST',
            url: `${api}/auth/login`,
            failOnStatusCode: false,
            body: {
                email: 'naoexiste@teste.com',
                password: 'senhaerrada'
            }
        }).then((res) => {
            expect(res.status).to.eq(401);
            expect(res.body).to.have.property('error', 'Credenciais inválidas');
        });
    });

    // Teste de login válido
    it('Login com credenciais válidas deve retornar token', () => {
        cy.request('POST', `${api}/auth/login`, {
            email: 'teste@teste.com',
            password: '123456'
        }).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.property('token');
            Cypress.env('token', res.body.token); // guardar token para próximos testes
        });
    });

    // Teste de cadastro de livro
    it('Cadastrar um novo livro com token válido', () => {
        const token = Cypress.env('token');
        cy.request({
            method: 'POST',
            url: `${api}/livros`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: {
                titulo: 'Dom Casmurro',
                autor: 'Machado de Assis',
                ano: 1899,
                user_id: 1
            }
        }).then((res) => {
            expect(res.status).to.eq(201);
            expect(res.body).to.include({
                titulo: 'Dom Casmurro',
                autor: 'Machado de Assis',
                ano: 1899,
                user_id: 1
            });
        });
    });

    // Teste de cadastro de livro sem token ou token inválido
    it('Cadastrar livro sem token ou token inválido deve falhar', () => {
        cy.request({
            method: 'POST',
            url: `${api}/livros`,
            failOnStatusCode: false,
            body: {
                titulo: 'Livro Invalido',
                autor: 'Autor X',
                ano: 2023,
                user_id: 1
            }
        }).then((res) => {
            // Se sua API exige autenticação, deve responder 401 ou 403
            expect([401, 403]).to.include(res.status);
        });
    });
});
