# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

config.vm.box = "ubuntu/focal64"

# Configuración de puertos
config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

# Desplegar las páginas web desde una carpeta local
config.vm.synced_folder "./www", "/var/www/html/"

# Nombre de la máquina virtual

config.vm.provider :virtualbox do |vb|
	vb.name = "vagrant-apache-ahorcado"
end

config.vm.provision "shell", inline: <<-SHELL
     apt-get update
     
     # Instalar apache
     apt-get install -y apache2
SHELL
end