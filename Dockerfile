FROM php:8.2-apache

# Install mysqli
RUN docker-php-ext-install mysqli

# Enable rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Clean default files
RUN rm -rf /var/www/html/*

# Copy backend + frontend build
COPY backend/ /var/www/html/
COPY frontend/build/ /var/www/html/

# Set default index file properly (safe way)
RUN printf "DirectoryIndex index.html index.php\n" >> /etc/apache2/apache2.conf

# Allow access (safe single-line version)
RUN printf "<Directory /var/www/html/>\nAllowOverride All\nRequire all granted\n</Directory>\n" >> /etc/apache2/apache2.conf

EXPOSE 80