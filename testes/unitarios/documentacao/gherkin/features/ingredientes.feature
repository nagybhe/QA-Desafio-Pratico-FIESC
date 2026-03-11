# language: pt
Funcionalidade: Gerenciamento de Ingredientes
  Como um cliente da cafeteria
  Eu quero visualizar os ingredientes disponíveis
  Para que eu possa escolher quais usar no meu café

  Contexto:
    Dado que estou na página de montar café

  @RF001
  Cenário: Visualizar ingredientes base
    Quando a página carregar
    Então devo ver uma lista de ingredientes base contendo:
      | ingrediente |
      | Espresso    |
      | Leite       |
      | Chocolate   |
      | Sorvete     |
      | Espuma      |

  @RF001
  Cenário: Visualizar ingredientes adicionais
    Quando a página carregar
    Então devo ver uma lista de ingredientes adicionais contendo:
      | ingrediente        |
      | Caramelo           |
      | Calda de Chocolate |
      | Chantilly          |
      | Canela             |
      | Chocolate em pó    |
      | Nutella            |

  @RN001.4 @RN003.4
  Cenário: Interface visual indica ingredientes selecionados
    Quando eu clicar no ingrediente "Espresso"
    Então o botão do Espresso deve mudar de cor
    E deve ficar visualmente diferente dos não selecionados

  @RN001.3
  Cenário: Validar limite mínimo de ingredientes base
    Quando eu não selecionar nenhum ingrediente base
    E tentar confirmar o sabor
    Então devo ver uma mensagem "Selecione ao menos um ingrediente base"

  @RN003.3
  Cenário: Validar limite máximo de ingredientes adicionais
    Quando eu selecionar 3 ingredientes adicionais
    Então apenas os 2 primeiros devem ser selecionados
    E devo ver uma mensagem de limite excedido