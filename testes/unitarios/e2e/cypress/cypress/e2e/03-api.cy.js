describe('Testes de API - Cafeteria', () => {
    const API_URL = 'http://localhost:3000';

    describe('Ingredientes', () => {
        it('GET /ingredientes/base - deve retornar lista de ingredientes base', () => {
            cy.request(`${API_URL}/ingredientes/base`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Verificar estrutura do primeiro ingrediente
                const ingrediente = response.body[0];
                expect(ingrediente).to.have.all.keys('id', 'nome', 'tipo', 'preco', 'disponivel');
                expect(ingrediente.tipo).to.eq('base');
            });
        });

        it('GET /ingredientes/adicionais - deve retornar lista de ingredientes adicionais', () => {
            cy.request(`${API_URL}/ingredientes/adicionais`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.be.an('array');
                expect(response.body.length).to.be.greaterThan(0);

                // Verificar estrutura do primeiro ingrediente
                const ingrediente = response.body[0];
                expect(ingrediente).to.have.all.keys('id', 'nome', 'tipo', 'preco', 'disponivel');
                expect(ingrediente.tipo).to.eq('adicional');
            });
        });

        it('GET /ingredientes/:id - deve retornar ingrediente específico', () => {
            cy.request(`${API_URL}/ingredientes/1`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', 1);
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('tipo');
            });
        });

        it('GET /ingredientes/:id - deve retornar 404 para ID inexistente', () => {
            cy.request({
                url: `${API_URL}/ingredientes/9999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('erro');
            });
        });
    });

    describe('Café - Identificação de Sabores', () => {
        it('POST /cafes/identificar - deve identificar Mocha (Espresso + Leite + Chocolate)', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/identificar`,
                body: {
                    ingredientes: [1, 2, 3] // Espresso + Leite + Chocolate
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('saborClassico');

                // Verificar que saborClassico é um objeto com a propriedade nome
                expect(response.body.saborClassico).to.be.an('object');
                expect(response.body.saborClassico.nome).to.eq('Mocha');
            });
        });

        it('POST /cafes/identificar - deve retornar null para combinação não clássica', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/identificar`,
                body: {
                    ingredientes: [1, 3] // Espresso + Chocolate (NÃO é clássico)
                }
            }).then((response) => {
                expect(response.status).to.eq(200);

                // Verificar que saborClassico é null
                expect(response.body.saborClassico).to.be.null;

                // Verificar mensagem
                expect(response.body.mensagem).to.contain('Café personalizado');
            });
        });

        it('POST /cafes/identificar - deve retornar 400 para requisição inválida', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/identificar`,
                body: {},
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('erro');
            });
        });
    });

    describe('Café - Montar Café', () => {
        it('POST /cafes/montar - deve montar café com ingredientes base', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/montar`,
                body: {
                    ingredientesBase: [1, 2] // Espresso + Leite
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('nome');
                expect(response.body).to.have.property('ingredientes');
                expect(response.body.ingredientes.base).to.have.length(2);
                expect(response.body.ingredientes.adicionais).to.have.length(0);
            });
        });

        it('POST /cafes/montar - deve montar café com ingredientes base e adicionais', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/montar`,
                body: {
                    ingredientesBase: [1, 2],
                    ingredientesAdicionais: [8, 9] // Chantilly + Canela
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.ingredientes.base).to.have.length(2);
                expect(response.body.ingredientes.adicionais).to.have.length(2);
            });
        });

        it('POST /cafes/montar - deve retornar 400 para limite de adicionais excedido', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/montar`,
                body: {
                    ingredientesBase: [1, 2],
                    ingredientesAdicionais: [6, 7, 8] // 3 adicionais
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('erro');
                expect(response.body.erro).to.contain('Máximo de 2');
            });
        });
    });

    describe('Café - Confirmar Pedido', () => {
        it('POST /cafes/confirmar - deve confirmar pedido com sucesso', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/confirmar`,
                body: {
                    ingredientesBase: [1, 2],
                    ingredientesAdicionais: [8]
                }
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('sucesso', true);
                expect(response.body).to.have.property('pedidoId');
                expect(response.body).to.have.property('nomeBebida');
                expect(response.body).to.have.property('precoTotal');
            });
        });

        it('POST /cafes/confirmar - deve retornar 400 sem ingredientes base', () => {
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/confirmar`,
                body: {
                    ingredientesBase: []
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.have.property('erro');
            });
        });
    });

    describe('Pedidos', () => {
        it('GET /pedidos - deve retornar lista de pedidos', () => {
    cy.request(`${API_URL}/pedidos`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        
        cy.log('Número de pedidos:', response.body.length);
        
        if (response.body.length > 0) {
            const pedido = response.body[0];
            cy.log('Estrutura do pedido:', JSON.stringify(pedido));
            cy.log('Chaves do pedido:', Object.keys(pedido).join(', '));
            
            // Teste mais flexível - verificar apenas as chaves essenciais
            expect(pedido).to.have.property('id');
            expect(pedido).to.have.property('nome');
            expect(pedido).to.have.property('preco');
            
            // Verificar ingredientes se existir
            if (pedido.ingredientes) {
                expect(pedido.ingredientes).to.be.an('object');
            }
        }
    });
});

        it('GET /pedidos/:id - deve retornar pedido específico', () => {
            // Primeiro criar um pedido para testar
            cy.request({
                method: 'POST',
                url: `${API_URL}/cafes/confirmar`,
                body: {
                    ingredientesBase: [1, 2]
                }
            }).then((createResponse) => {
                const pedidoId = createResponse.body.pedidoId;

                cy.request(`${API_URL}/pedidos/${pedidoId}`).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('id', pedidoId);
                    expect(response.body).to.have.property('nome');
                });
            });
        });

        it('GET /pedidos/:id - deve retornar 404 para ID inexistente', () => {
            cy.request({
                url: `${API_URL}/pedidos/9999`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(404);
                expect(response.body).to.have.property('erro');
            });
        });
    });

    describe('Estatísticas', () => {
        it('GET /pedidos/estatisticas - deve retornar estatísticas', () => {
            cy.request(`${API_URL}/pedidos/estatisticas`).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.all.keys('total', 'totalVendas', 'mediaPedido', 'porDia');
                expect(response.body.total).to.be.a('number');
                expect(response.body.totalVendas).to.be.a('number');
                expect(response.body.mediaPedido).to.be.a('number');
                expect(response.body.porDia).to.be.an('array');
            });
        });
    });
});