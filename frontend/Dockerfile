# Etapa 1: Build da aplicação React
FROM node:18-alpine as build

WORKDIR /app

# Copiar dependências
COPY package*.json ./
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Servir com nginx
FROM nginx:alpine

# Copiar arquivos do build para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]