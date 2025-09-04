# Usa imagem oficial do Nginx
FROM nginx:alpine

# Remove arquivos default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do frontend para o diretório do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando padrão do Nginx já serve os arquivos
CMD ["nginx", "-g", "daemon off;"]
