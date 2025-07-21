---
title: IVPN para Linux - Aplicación VPN de código abierto para Linux
description: IVPN para Linux te ofrece una protección integral contra filtraciones de privacidad con el firewall IVPN, conexión automática en redes Wi-Fi inseguras y Multi-hop.
h1: IVPN para Linux
subtitle: Compatible con 64-bit Linux 3.10+
url: /es/apps-linux/
platform: linux
layout: apps-single
imageLight: /images-static/uploads/apps/linux-app-3.3.7-light@2x.png
imageDark: /images-static/uploads/apps/linux-app-3.3.7-dark@2x.png
contents:
- item:
    title: Funciones
    anchor: features
- item:
    title: Paquetes
    anchor: packages
- item:
    title: Instalar desde el repositorio de IVPN
    anchor: install
    subitems:
    - item:
        title: Ubuntu
        anchor: ubuntu
    - item:
        title: Debian
        anchor: debian
    - item:
        title: Mint
        anchor: mint
    - item:
        title: Fedora
        anchor: fedora
    - item:
        title: CentOS/Alma/Rocky
        anchor: centos
    - item:
        title: Arch Linux
        anchor: arch
    - item:
        title: Fedora Silverblue
        anchor: silverblue
- item:
    title: Instalar desde los archivos binarios
    anchor: binaries
- item:
    title: Instalar desde el código fuente
    anchor: source
- item:
    title: Instalar desde Snap
    anchor: snap
- item:
    title: Enlaces útiles
    anchor: useful-links
---
## Funciones {#features}

* Protocolos WireGuard y OpenVPN.
* GUI o CLI (interfaz de línea de comandos).
* Controles de privacidad de WireGuard - Define un calendario de rotación automática de claves y direcciones IP.
* AntiTracker que bloquea anuncios, adware, páginas web maliciosas y rastreadores de recopilación de datos.
* Firewall/killswitch - Posibilidad de configurarlo a demanda o siempre activo. Ofrece protección integral contra filtraciones DNS, IPv6, WebRTC y desconexiones.
* Capacidad para definir redes Wi-Fi de confianza y crear reglas para la conexión/desconexión automática de la VPN.
* Rutas VPN de Multi-hop. Conéctate a través de múltiples servidores en jurisdicciones diferentes para mejorar la privacidad.
* Permitir el tráfico LAN cuando estés conectado a la VPN.
* Función de pausado para cuando sea necesario deshabilitar temporalmente la conexión VPN.
* Opción Obfsproxy para eludir la censura.
* Servidores DNS personalizados, con DoH.
* Tunelización dividida para permitir que las aplicaciones designadas eviten el túnel VPN.
* Conexión automática de inicio y al unirse a una red Wi-Fi insegura

## Paquetes {#packages}

### Paquete base 

El paquete base contiene todo lo que necesitas para conectarte a IVPN con una interfaz de línea de comandos. La aplicación IVPN GUI se proporciona como un paquete separado que puedes encontrar a continuación.  
[Historial de cambios](https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md) 

### Aplicación GUI IVPN 

Ten en cuenta que es necesario instalar el paquete base antes de instalar la aplicación GUI.  
[Historial de cambios](https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md)  

## Instalar desde el repositorio IVPN {#install}

### Ubuntu {#ubuntu}

```pkgconfig
# Añadir la clave GPG de IVPN
curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.gpg | gpg --dearmor > ~/ivpn-archive-keyring.gpg

sudo mv ~/ivpn-archive-keyring.gpg /usr/share/keyrings/ivpn-archive-keyring.gpg

# Establecer permisos apropiados para la clave GPG
sudo chown root:root /usr/share/keyrings/ivpn-archive-keyring.gpg && sudo chmod 644 /usr/share/keyrings/ivpn-archive-keyring.gpg

# Añadir el repositorio IVPN
curl -fsSL https://repo.ivpn.net/stable/ubuntu/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list

# Establecer permisos apropiados para el repositorio
sudo chown root:root /etc/apt/sources.list.d/ivpn.list && sudo chmod 644 /etc/apt/sources.list.d/ivpn.list

# Actualizar la información del repositorio de APT
sudo apt update

# Para instalar el software IVPN (CLI y UI)
sudo apt install ivpn-ui

# Para instalar solo IVPN CLI
sudo apt install ivpn
```

### Debian {#debian}

```pkgconfig
# Añadir la clave GPG de IVPN
curl -fsSL https://repo.ivpn.net/stable/debian/generic.gpg | gpg --dearmor > ~/ivpn-archive-keyring.gpg

sudo mv ~/ivpn-archive-keyring.gpg /usr/share/keyrings/ivpn-archive-keyring.gpg

# Establecer permisos apropiados para la clave GPG
sudo chown root:root /usr/share/keyrings/ivpn-archive-keyring.gpg && sudo chmod 644 /usr/share/keyrings/ivpn-archive-keyring.gpg

# Añadir el repositorio IVPN
curl -fsSL https://repo.ivpn.net/stable/debian/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list

# Establecer permisos apropiados para el repositorio
sudo chown root:root /etc/apt/sources.list.d/ivpn.list && sudo chmod 644 /etc/apt/sources.list.d/ivpn.list

# Actualizar la información del repositorio de APT
sudo apt update

# Para instalar el software IVPN (CLI y UI)
sudo apt install ivpn-ui

# Para instalar solo IVPN CLI
sudo apt install ivpn
```

### Mint {#mint}

```pkgconfig
# Añadir la clave GPG de IVPN
curl -fsSL https://repo.ivpn.net/stable/mint/generic.gpg | gpg --dearmor > ~/ivpn-archive-keyring.gpg

sudo mv ~/ivpn-archive-keyring.gpg /usr/share/keyrings/ivpn-archive-keyring.gpg

# Establecer permisos apropiados para la clave GPG
sudo chown root:root /usr/share/keyrings/ivpn-archive-keyring.gpg && sudo chmod 644 /usr/share/keyrings/ivpn-archive-keyring.gpg

# Añadir el repositorio IVPN
curl -fsSL https://repo.ivpn.net/stable/mint/generic.list | sudo tee /etc/apt/sources.list.d/ivpn.list

# Establecer permisos apropiados para el repositorio
sudo chown root:root /etc/apt/sources.list.d/ivpn.list && sudo chmod 644 /etc/apt/sources.list.d/ivpn.list

# Actualizar la información del repositorio de APT
sudo apt update

# Para instalar el software IVPN (CLI y UI)
sudo apt install ivpn-ui

# Para instalar solo IVPN CLI
sudo apt install ivpn
```

### Fedora {#fedora}

```pkgconfig
# [Fedora 40 y versiones anteriores] Agregar el repositorio IVPN
sudo dnf config-manager --add-repo https://repo.ivpn.net/stable/fedora/generic/ivpn.repo

# [Fedora 41+] Agregar el repositorio IVPN
sudo dnf config-manager addrepo --from-repofile=https://repo.ivpn.net/stable/fedora/generic/ivpn.repo

# [Fedora 42+]
sudo dnf install iptables-legacy

# Para instalar el software IVPN (CLI y UI)
sudo dnf install ivpn-ui

# Para instalar solo IVPN CLI
sudo dnf install ivpn
```

### CentOS/Alma/Rocky {#centos}

```pkgconfig
# Instalar epel-release
sudo dnf install epel-release

# Instalar OpenVPN
sudo dnf install openvpn

# Agregar el repositorio IVPN
sudo dnf config-manager --add-repo https://repo.ivpn.net/stable/centos/generic/ivpn.repo

# Para instalar el software IVPN (CLI y UI)
sudo dnf install ivpn-ui

# Para instalar solo IVPN CLI
sudo dnf install ivpn

# Requerido para CentOS 8
sudo dnf install libXScrnSaver
```

### Arch Linux {#arch}

AUR - Repositorio de usuarios de ArchLinux. Puede ser utilizado por distribuciones basadas en ArchLinux: ArchLinux, Manjaro...

Paquete base: [ivpn](https://aur.archlinux.org/packages/ivpn/)  
Paquete UI: [ivpn-ui](https://aur.archlinux.org/packages/ivpn-ui/)  

El uso de un asistente AUR/Pacman wrapper automatiza el proceso de instalación:

```pkgconfig
yay -S ivpn
yay -S ivpn-ui
```

Nota: Hay disponibles otras utilidades de ayuda de AUR/Pacman wrapper.

### Fedora Silverblue {#silverblue}

El cliente IVPN se puede instalar en [Fedora Silverblue](/knowledgebase/linux/fedora-silverblue/).

## Instalar desde los archivos binarios {#binaries}

### .DEB

[Paquete base](https://repo.ivpn.net/stable/pool/ivpn_3.14.34_amd64.deb)  
SHA256: 5f96db5af1eaf7bf2db2393ee61451fe8e2e0ba33366def5d9e79b73a1598c42  

[Paquete UI](https://repo.ivpn.net/stable/pool/ivpn-ui_3.14.34_amd64.deb)  
SHA256: d0e99f7b482867065f17f86989aa7d2feb66ea345f6d74874164761a27bb2ac5  

### .RPM

[Paquete base](https://repo.ivpn.net/stable/pool/ivpn-3.14.34-1.x86_64.rpm)  
SHA256: 91127c4f14bea92ee90b219c09497f169237cbd821185a2494a34a72dd7ffb8b  

[Paquete UI](https://repo.ivpn.net/stable/pool/ivpn-ui-3.14.34-1.x86_64.rpm)  
SHA256: 03cde206dc599779f2f6683d845a741e69ce4cd4bf63ce004ec61e9512ec5db0  

## Instalar desde el código fuente {#source}

[Daemon + CLI](https://github.com/ivpn/desktop-app#compilation_linux_daemon)  
[UI](https://github.com/ivpn/desktop-app#compilation_linux_ui)  

## Instalar desde Snap {#snap}

Descarga la aplicación IVPN en [Snap Store](https://snapcraft.io/ivpn) usando el comando `sudo snap install ivpn`.  

<p>
    <a href="https://snapcraft.io/ivpn">
        <img class="features__image--light" src="/images-static/uploads/snap-store-white@2x.png" alt="Get it from the Snap Store" width="182">
        <img class="features__image--dark" src="/images-static/uploads/snap-store-black@2x.png" alt="Get it from the Snap Store"  width="182">
    </a>
</p>

### Notas de Snap:

* Se requiere el programa daemon [snapd](https://snapcraft.io/docs/installing-snapd).
* Desinstala las versiones anteriores (DEB, RPM, etc.) de la aplicación IVPN antes de cambiar al canal de Snap y viceversa.
* La función **Tunelización dividida** no está disponible debido a fuertes restricciones del entorno Snap.

## Enlaces útiles {#useful-links}

Si prefieres no utilizar la aplicación IVPN, sigue la guía de configuración correspondiente a continuación.

* [WireGuard usando terminal](/setup/linux-wireguard/)
* [WireGuard usando NetworkManager](/setup/linux-wireguard-netman/)
* [OpenVPN usando terminal](/setup/linux-terminal/)
* [OpenVPN usando NetworkManager](/setup/linux-netman/)
* [IPSec con IKEv2](/setup/linux-ipsec-with-ikev2/)
