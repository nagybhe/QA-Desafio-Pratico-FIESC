# language: pt
Funcionalidade: Identificação de Sabores Clássicos
  Como um cliente da cafeteria
  Eu quero que o sistema identifique sabores clássicos
  Para que eu possa saber se minha combinação é uma receita tradicional

  Contexto:
    Dado que estou na página de montar café
    E selecionei ingredientes base

  @RF002 @RN002.3
  Cenário: Identificar sabor Latte
    Quando eu selecionar os ingredientes "Espresso" e "Leite"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Sabor clássico reconhecido: Latte"
    E o resumo deve mostrar "Latte" como nome da bebida

  @RF002 @RN002.3
  Cenário: Identificar sabor Mocha
    Quando eu selecionar os ingredientes "Espresso", "Leite" e "Chocolate"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Sabor clássico reconhecido: Mocha"
    E o resumo deve mostrar "Mocha" como nome da bebida

  @RF002 @RN002.3
  Cenário: Identificar sabor Macchiato
    Quando eu selecionar os ingredientes "Espresso", "Leite" e "Espuma"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Sabor clássico reconhecido: Macchiato"
    E o resumo deve mostrar "Macchiato" como nome da bebida

  @RF002 @RN002.3
  Cenário: Identificar sabor Affogato
    Quando eu selecionar os ingredientes "Sorvete" e "Espresso"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Sabor clássico reconhecido: Affogato"
    E o resumo deve mostrar "Affogato" como nome da bebida

  @RF002 @RN002.3
  Cenário: Identificar sabor Espresso Puro
    Quando eu selecionar apenas o ingrediente "Espresso"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Sabor clássico reconhecido: Espresso Puro"
    E o resumo deve mostrar "Espresso Puro" como nome da bebida

  @RF002 @RN002.4
  Cenário: Identificar combinação não clássica
    Quando eu selecionar os ingredientes "Espresso" e "Chocolate"
    E clicar em "Confirmar sabor"
    Então devo ver a mensagem "Café personalizado"
    E o resumo deve mostrar "Café personalizado" como nome da bebida

  @RN002.5
  Cenário: Feedback visual da identificação
    Quando eu confirmar um sabor clássico
    Então a interface deve destacar visualmente o nome do sabor
    E mostrar uma mensagem de sucesso