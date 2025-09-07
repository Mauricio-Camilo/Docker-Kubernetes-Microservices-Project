FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

ARG BACKEND1_URL
ARG BACKEND2_URL

COPY src/ /usr/share/nginx/html

RUN echo "window.BACKEND_URLS = {" > /usr/share/nginx/html/config.js && \
    echo "  'backend-1': '$BACKEND1_URL'," >> /usr/share/nginx/html/config.js && \
    echo "  'backend-2': '$BACKEND2_URL'" >> /usr/share/nginx/html/config.js && \
    echo "};" >> /usr/share/nginx/html/config.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
