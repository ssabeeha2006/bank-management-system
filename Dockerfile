FROM php:8.2-apache

RUN docker-php-ext-install mysqli

# Copy backend PHP files
COPY backend/ /var/www/html/backend/

# Copy frontend build
COPY frontend/build/ /var/www/html/

# Enable rewrite
RUN a2enmod rewrite

# Allow access
RUN echo '<Directory /var/www/html/> \
    AllowOverride All \
    Require all granted \
</Directory>' >> /etc/apache2/apache2.conf

EXPOSE 80