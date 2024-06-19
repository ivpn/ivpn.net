---
title: IVPN para iOS - Aplicación VPN de código abierto para tu iPhone y iPad
description: La IVPN app para iOS, diseñada para iPhone y iPad, te ofrece una protección integral contra filtraciones de privacidad, conexión automática en redes Wi-Fi inseguras y Multi-hop.
h1: IVPN para iOS
subtitle: Compatible con iOS/iPadOS 15.0+
url: /es/apps-ios/
params:
  translated: true
platform: ios
layout: apps
image: apps/ios-app
releases: [{
    cta: Consíguela en la App Store,
    download: "https://apps.apple.com/us/app/ivpn-serious-privacy-protection/id1193122683?mt=8",
    github: https://github.com/ivpn/ios-app,
    changelog: https://github.com/ivpn/ios-app/blob/master/CHANGELOG.md,
    note: "Nota: Vulnerabilidades en iOS podrían afectar todas las conexiones VPN, sin importar qué servicio VPN utilices. Para obtener más información, revisa nuestra publicación de blog sobre el [problema de fuga de servicios de Apple](https://www.ivpn.net/blog/removal-of-kill-switch-from-our-ios-app-due-to-apple-ip-leak-issue/), o la evaluación de la vulnerabilidad de [TunnelVision](https://github.com/ivpn/desktop-app/issues/374) ."
}]
---
## Funciones

- Protocolos WireGuard, OpenVPN y IPSec.
- Controles de privacidad de WireGuard - Define un calendario de rotación automática de claves y direcciones IP.
- AntiTracker que bloquea anuncios, adware, páginas web maliciosas y rastreadores de recopilación de datos.
- Capacidad para definir redes Wi-Fi de confianza y crear reglas para la conexión/desconexión automática de la VPN.
- Rutas VPN de Multi-hop. Conéctate a través de múltiples servidores en jurisdicciones diferentes para mejorar la privacidad.
- Servidores DNS personalizados, con DoH y DoT.

## Manual configuration

Si prefieres no utilizar la aplicación IVPN, sigue la guía de configuración correspondiente a continuación.

- [WireGuard](/setup/ios-wireguard/)
- [OpenVPN Connect](/setup/ios-openvpn-connect/)  
- [IPSec con IKEv2](/setup/ios-ipsec-ikev2/)
