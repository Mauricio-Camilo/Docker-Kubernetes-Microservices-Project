# Usa imagem oficial do Nginx
FROM nginx:alpine

# Remove arquivos default do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Define argumentos de build
ARG BACKEND1_URL
ARG BACKEND2_URL

# Copia os arquivos do frontend para o diretório do Nginx
COPY src/ /usr/share/nginx/html

# Gera config.js dinamicamente com as URLs dos backends
RUN echo "window.BACKEND_URLS = {" > /usr/share/nginx/html/config.js && \
    echo "  'backend-1': '$BACKEND1_URL'," >> /usr/share/nginx/html/config.js && \
    echo "  'backend-2': '$BACKEND2_URL'" >> /usr/share/nginx/html/config.js && \
    echo "};" >> /usr/share/nginx/html/config.js

# Expõe a porta 80
EXPOSE 80

# Comando padrão do Nginx já serve os arquivos
CMD ["nginx", "-g", "daemon off;"]
