# Usamos una versión estable de WordPress con Apache
FROM wordpress:6.4-php8.1-apache

# AQUÍ ESTÁ EL ARREGLO:
# Borramos los módulos conflictivos de Apache antes de que arranques
RUN rm -f /etc/apache2/mods-enabled/mpm_event.conf
RUN rm -f /etc/apache2/mods-enabled/mpm_worker.conf

# Forzamos el uso del módulo correcto (Prefork) compatible con PHP
RUN a2enmod mpm_prefork