# backend/Dockerfile

FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (cache mais eficiente)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "server.js"]
