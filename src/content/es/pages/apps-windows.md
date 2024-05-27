---
title: IVPN para Windows - Aplicación VPN de código abierto para tu PC Windows
description: IVPN para Windows te ofrece una protección integral contra filtraciones de privacidad con el firewall IVPN, conexión automática en redes Wi-Fi inseguras y Multi-hop.
h1: IVPN para Windows
subtitle: Compatible con Windows 10 / 11 (64-bit)
url: /es/apps-windows/
params:
  translated: true
platform: windows
layout: apps
image: apps/windows-app-3.3.7
releases: [{
    cta: Download,
    download: https://repo.ivpn.net/windows/bin/IVPN-Client-v3.14.2.exe,
    github: https://github.com/ivpn/desktop-app,
    changelog: https://github.com/ivpn/desktop-app/blob/master/CHANGELOG.md,
    checksum: [
        {
            title: SHA256,
            value: 78e363c6405134ab4424650f2d0435c5a2f4120fcd1b0d4ce062fcd3f6dc471a
        }
    ]
}]
---
## Funciones

- Protocolos WireGuard y OpenVPN.
- GUI o CLI (interfaz de línea de comandos).
- Controles de privacidad de WireGuard - Define un calendario de rotación automática de claves y direcciones IP.
- AntiTracker que bloquea anuncios, adware, páginas web maliciosas y rastreadores de recopilación de datos.
- Firewall/killswitch - Posibilidad de configurarlo a demanda o siempre activo. Ofrece protección integral contra filtraciones DNS, IPv6, WebRTC y desconexiones.
- Capacidad para definir redes Wi-Fi de confianza y crear reglas para la conexión/desconexión automática de la VPN.
- Rutas VPN de Multi-hop. Conéctate a través de múltiples servidores en jurisdicciones diferentes para mejorar la privacidad.
- Permitir el tráfico LAN cuando estés conectado a la VPN.
- Función de pausado para cuando sea necesario deshabilitar temporalmente la conexión VPN.
- Opción Obfsproxy para eludir la censura.
- Servidores DNS personalizados, con DoH.
- Túneles divididos.
- Actualización automática.
- Conexión automática de inicio y al unirse a una red Wi-Fi insegura.

## Configuración manual

Si prefieres no utilizar la aplicación IVPN, sigue la guía de configuración correspondiente a continuación.

- [WireGuard (Windows 10)](/setup/windows-10-wireguard/)  
- [OpenVPN GUI (Windows 10)](/setup/windows-10-openvpn-community/)
- [OpenVPN GUI (Windows 8)](/setup/windows-8-openvpn-community/)
- [IPSec with IKEv2 (Windows 10)](/setup/windows-10-ipsec-with-ikev2/)

## Descarga versiones anteriores

[IVPN-Client-v3.12.0.exe](https://repo.ivpn.net/windows/bin/IVPN-Client-v3.12.0.exe)  
SHA256: 2425f3e339eeb8bb8ac11734b2db918083eea6d2cd9172109e0748b2fcd62f19  

[IVPN-Client-v2.12.17.exe](https://cdn.ivpn.net/releases/win/IVPN-Client-v2.12.17.exe)  
SHA256: 7dce2cd90a2828f308c5c9063776d05af6074d974c57ee69a7ea79030640149a  
