FROM php:8.2-apache

# Install mysqli
RUN docker-php-ext-install mysqli

# Enable rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy backend
COPY backend/ /var/www/html/

# Copy React build
COPY frontend/build/ /var/www/html/

# Fix Apache config to allow access
RUN echo "<Directory /var/www/html/> AllowOverride All Require all granted </Directory>" >> /etc/apache2/apache2.conf

EXPOSE 80