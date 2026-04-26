FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

# Enable override properly
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Copy frontend
COPY frontend/build/ /var/www/html/

# Copy backend
COPY backend/ /var/www/html/backend/

EXPOSE 80