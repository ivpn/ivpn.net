---
title: IVPN para Android - Aplicación VPN de código abierto para Android
description: La aplicación IVPN para Android te ofrece una protección integral contra filtraciones de privacidad con el firewall IVPN, conexión automática en redes de Wi-Fi inseguras y Multi-hop.
h1: IVPN para Android
subtitle: Compatible con Android 5.0+
url: /es/apps-android/
params:
  translated: true
platform: android
layout: apps
image: apps/android-app
releases: [{
    cta: Download,
    downloads: [
        {
            cta: Google Play,
            url: "https://play.google.com/store/apps/details?id=net.ivpn.client"
        },
        {
            cta: F-Droid,
            url: https://f-droid.org/en/packages/net.ivpn.client/
        },
        {
            cta: Accrescent,
            url: https://accrescent.app/app/net.ivpn.client
        },
        {
            cta: .APK file,
            url: https://www.ivpn.net/releases/android/IVPNv2.10.7site.apk
        }
    ],
    github: https://github.com/ivpn/android-app,
    changelog: https://github.com/ivpn/android-app/blob/main/CHANGELOG.md,
    checksum: [
        {
            title: .apk SHA256,
            value: e091ee87d73eda39036854ca02be2c0451502730043fe39a8242403124965ceb
        },
        {
            title: .apk sign cert SHA256,
            value: 88a6b40fc97fdc842f231f50eb12de116f5b759e3c5b38aaccaf6a7b393c85bb
        }
    ]
}]
---
## Funciones

- Protocolos WireGuard y OpenVPN.
- Controles de privacidad de WireGuard - Define un programa de rotación automática de claves y direcciones IP.
- AntiTracker que bloquea anuncios, adware, páginas web maliciosos y rastreadores de recopilación de datos.
- Capacidad para definir redes Wi-Fi de confianza y crear reglas para la conexión/desconexión automática de VPN.
- Túnel dividido para permitir que algunas aplicaciones omitan la VPN.
- Rutas VPN de Multi-hop. Conéctate a través de múltiples servidores en jurisdicciones diferentes para mejorar la privacidad.
- Servidores DNS personalizados, DoT a través de DNS privado nativo de Android.
- Ubicación simulada para GPS.
- Protección contra Tapjacking.

## Configuración manual

Si prefiere no utilizar la aplicación IVPN, sigue la guía de configuración correspondiente a continuación.

- [WireGuard](/setup/android-wireguard/)
- [OpenVPN for Android](/setup/android-openvpn-for-android/)  
- [IPSec with IKEv2](/setup/android-ipsec-with-ikev2/)  
