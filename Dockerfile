FROM php:8.2-apache

# Install mysqli extension
RUN docker-php-ext-install mysqli

# Enable Apache rewrite
RUN a2enmod rewrite

# Copy backend (PHP files)
COPY backend/ /var/www/html/

# Copy frontend build (React)
COPY frontend/build/ /var/www/html/

EXPOSE 80