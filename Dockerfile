FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

RUN printf '<Directory /var/www/html/>\nAllowOverride All\nRequire all granted\n</Directory>\n' >> /etc/apache2/apache2.conf
COPY frontend/build/ /var/www/html/
COPY backend/ /var/www/html/backend/

EXPOSE 80