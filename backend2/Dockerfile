# Imagem base Node.js
FROM node:20

# Diretório da aplicação
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY src/ ./src

# Expõe a porta (só para documentação, não precisa ser fixa)
EXPOSE 4002

# Comando para iniciar a aplicação
CMD ["npm", "start"]
