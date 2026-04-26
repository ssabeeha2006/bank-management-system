FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

# 🔥 FIX: enable .htaccess
RUN echo '<Directory /var/www/html/>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/override.conf

RUN a2enconf override

# copy frontend build
COPY frontend/build/ /var/www/html/

# copy backend
COPY backend/ /var/www/html/backend/

EXPOSE 80