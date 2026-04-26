FROM php:8.2-apache

RUN docker-php-ext-install mysqli

COPY backend/ /var/www/html/
COPY frontend/ /var/www/html/

RUN a2enmod rewrite

EXPOSE 80