FROM php:8.2-apache

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

WORKDIR /var/www/html

RUN rm -rf /var/www/html/*

COPY backend/ /var/www/html/
COPY frontend/build/ /var/www/html/

RUN echo "DirectoryIndex index.html index.php" >> /etc/apache2/apache2.conf

RUN echo "<Directory /var/www/html/> \
Options Indexes FollowSymLinks \
AllowOverride All \
Require all granted \
</Directory>" >> /etc/apache2/apache2.conf

EXPOSE 80