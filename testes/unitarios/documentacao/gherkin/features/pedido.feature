# language: pt
Funcionalidade: Realizar Pedido de Café
  Como um cliente da cafeteria
  Eu quero montar e confirmar meu café personalizado
  Para que eu possa fazer meu pedido

  Contexto:
    Dado que estou na página de montar café

  @RF001 @RF003
  Cenário: Montar café com ingredientes base e adicionais
    Quando eu selecionar os ingredientes base "Espresso" e "Leite"
    E confirmar o sabor "Latte"
    E adicionar os ingredientes adicionais "Chantilly" e "Canela"
    Então o resumo deve mostrar:
      | campo        | valor                       |
      | nome         | Latte com Chantilly e Canela|
      | base         | Espresso, Leite             |
      | adicionais   | Chantilly, Canela           |

  @RF005
  Cenário: Visualizar resumo dinâmico
    Quando eu selecionar "Espresso"
    Então o resumo deve atualizar mostrando "Espresso" nos ingredientes
    Quando eu selecionar "Leite"
    Então o resumo deve mostrar "Espresso" e "Leite"
    Quando eu confirmar o sabor
    Então o resumo deve mostrar o nome "Latte"

  @RF006 @RN006.1
  Cenário: Confirmar pedido com sucesso
    Quando eu montar um café válido
    E clicar em "Confirmar Pedido"
    Então devo ver uma mensagem "Pedido confirmado com sucesso"
    E um modal deve abrir com o resumo completo do pedido
    E o pedido deve ser salvo no histórico

  @RN006.2
  Cenário: Tentar confirmar pedido inválido
    Quando eu não selecionar nenhum ingrediente base
    Então o botão "Confirmar Pedido" deve estar desabilitado
    E não deve ser possível clicar nele

  @RF004 @RN004.1
  Cenário: Gerar nome da bebida com sabor clássico e adicionais
    Quando eu montar um "Latte" com "Chantilly"
    Então o nome gerado deve ser "Latte com Chantilly"

  @RF004 @RN004.1
  Cenário: Gerar nome da bebida personalizada com adicionais
    Quando eu montar um café personalizado com "Espresso" e "Chocolate"
    E adicionar "Chantilly" e "Canela"
    Então o nome gerado deve ser "Café Personalizado com Chantilly e Canela"

  @RF005 @RN005.4
  Cenário: Visualizar preço total (opcional)
    Quando eu selecionar "Espresso" (R$ 3,50) e "Leite" (R$ 2,00)
    E adicionar "Chantilly" (R$ 2,00)
    Então o resumo deve mostrar o preço total de R$ 7,50

  @RN-G02
  Cenário: Feedback visual para ações do usuário
    Quando eu selecionar um ingrediente
    Então devo ver um feedback visual imediato
    Quando eu cometer um erro (ex: limite de adicionais)
    Então devo ver uma mensagem de erro clara e não intrusiva

  @RN-G03.2
  Cenário: Limpar seleção (diferencial)
    Quando eu selecionar vários ingredientes
    E clicar em "Limpar Seleção"
    Então todas as seleções devem ser removidas
    E o resumo deve voltar ao estado inicial
    E devo ver uma mensagem "Seleção limpa"