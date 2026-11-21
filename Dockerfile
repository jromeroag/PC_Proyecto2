FROM nginx:stable-alpine

ENV PORT=10000
ENV NGINX_ENVSUBST_FILTER=^PORT$

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY index.html /usr/share/nginx/html/index.html
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY models/ /usr/share/nginx/html/models/
COPY views/ /usr/share/nginx/html/views/
COPY controllers/ /usr/share/nginx/html/controllers/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 10000
