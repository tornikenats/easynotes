# production environment
FROM nginx:1.15-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]