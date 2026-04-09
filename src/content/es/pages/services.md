---
title: Precios de IVPN – Selecciona tu plan
description: Tres niveles. Sin ventas adicionales. Elige según tu modelo de amenazas y tus necesidades de red.
url: /es/services/
sections:
  - type: heading_logos_two_column
    title: Stack de Privacidad de IVPN
    content: >-
      Cuatro servicios del equipo de IVPN: VPN, alias de correo electrónico, filtrado DNS y firewall de aplicaciones. 


      Diseñado para resistir la vigilancia masiva abordando el rastreo en las capas de red, identidad de correo electrónico y aplicaciones.
    logos:
      - image: /images/ivpn.png
        alt: IVPN Logo
      - image: /images/mailx_white.png
        alt: Mailx Logo
      - image: /images/mod_white.png
        alt: modDNS Logo
      - image: /images/pm_light_contrast.svg
        alt: Portmaster
        text: Portmaster
  - type: service_card
    section_title: Resumen de Servicios
    name: IVPN
    logo: /images/ivpn.png
    plans:
      - Standard
      - Plus
      - Pro Suite
    content: >-
      IVPN es un servicio de VPN auditado que opera desde 2009. IVPN cifra el tráfico entre tu dispositivo y los servidores VPN, evitando que tu proveedor de Internet, los operadores de Wi-Fi público y los observadores de la red supervisen tu actividad.


      Una VPN no puede hacerte anónimo, pero reduce de manera significativa el seguimiento a nivel de red. Nuestro servicio fue creado para personas que valoran la privacidad y la seguridad verificables por encima del marketing: sin registros de actividad, sin necesidad de correo electrónico para crear una cuenta, sitio web y aplicaciones de código abierto, y gateways VPN que funcionan en servidores dedicados.
  - type: overlapping_images
    images:
      - src: /images/product1.png
        alt: IVPN CLI terminal interface
      - src: /images/product2.png
        alt: IVPN desktop app interface with map
  - type: features_list
    title: Funciones de IVPN
    features:
      - Aplicaciones de código abierto para iOS, Android, macOS, Windows y Linux, además de un generador de configuraciones para configuraciones personalizadas.
      - Servidores dedicados en 58 ubicaciones de 41 países.
      - Elección entre WireGuard, OpenVPN e IPSec (iOS) con rotación automática de claves y secreto perfecto hacia adelante.
      - Firewall/killswitch integrado y protección contra fugas de DNS.
      - Enrutamiento multi-hop a través de servidores en jurisdicciones separadas para mayor privacidad.
      - AntiTracker para bloquear anuncios y dominios de rastreo (lista predefinida única).
    links:
      - text: IVPN en GitHub
        url: https://github.com/ivpn/
      - text: Ayuda y base de conocimiento
        url: https://www.ivpn.net/knowledgebase/general/
      - text: Servidores IVPN
        url: https://www.ivpn.net/status/
      - text: Política de privacidad
        url: https://www.ivpn.net/privacy/
  - type: service_card
    name: Mailx
    logo: /images/mailx_white.png
    plans:
      - Plus
      - Pro Suite
    content: >-
      [Mailx](https://mailx.net) es una herramienta de alias de correo electrónico y reenvío de [código abierto](https://github.com/ivpn/mailx), que ayuda a ocultar tu dirección de correo principal frente a los servicios que utilizas.


      Tu dirección de correo electrónico es un identificador universal que se utiliza para rastrear tu actividad. Las empresas correlacionan tu correo a través de filtraciones, bases de datos de marketing y registros en servicios para crear un perfil sobre ti. Mailx mitiga este problema generando direcciones de correo únicas para cada registro, reenviando los mensajes a tu dirección real y evitando que los servicios te rastreen entre cuentas.
  - type: single_image
    src: /images/mailx-dashboard.png
    alt: Mailx dashboard showing email aliases
  - type: features_list
    title: Funciones de Mailx
    features:
      - Crea y gestiona alias de correo electrónico, eligiendo entre múltiples dominios y tipos de alias.
      - Selecciona uno o varios destinatarios para los correos reenviados.
      - Crea instantáneamente nuevos alias al momento con alias comodín (Wildcard).
      - Protege el contenido de los correos con cifrado PGP.
      - Revisa problemas de reenvío y estadísticas de correos reenviados.
    links:
      - text: Mailx en GitHub
        url: https://github.com/ivpn/mailx
      - text: Obtén más información sobre Mailx
        url: https://mailx.net
      - text: Mailx FAQ
        url: https://mailx.net/faq
      - text: Política de privacidad
        url: https://mailx.net/privacy
  - type: service_card
    name: modDNS
    logo: /images/mod_white.png
    plans:
      - Plus
      - Pro Suite
    content: >-
      [modDNS](https://moddns.net) es un servicio de DNS auditado y de [código abierto](https://github.com/ivpn/moddns) que bloquea anuncios, rastreadores y dominios maliciosos a nivel de DNS.


      Tus consultas DNS son un vector importante para la vigilancia. Los proveedores de Internet las utilizan para monitorizar tu navegación, y los sitios web las emplean para enviar tus datos a redes de publicidad y rastreo de terceros. modDNS mitiga esto cifrando tu tráfico DNS y filtrando activamente las solicitudes. Aunque usar el resolutor DNS de tu proveedor de VPN y su herramienta bloqueadora de rastreadores puede abordar este problema, modDNS ofrece mayor visibilidad y un control más detallado sobre lo que se bloquea.
  - type: single_image
    src: /images/moddns-dashboard.png
    alt: modDNS blocklists dashboard
  - type: features_list
    title: Funciones de modDNS
    features:
      - Configúralo a nivel de sistema en cualquier sistema operativo, en tu aplicación de VPN preferida o directamente en los navegadores.
      - Añade y combina listas de bloqueo de código abierto que contienen dominios e IPs que vulneran la privacidad o son maliciosos.
      - Ajusta el filtrado con reglas personalizadas para permitir o denegar dominios o IPs específicos.
      - Activa el registro opcional de consultas (desactivado por defecto) con información del dispositivo y un período de retención configurable.
      - Utiliza protocolos DNS modernos, incluyendo DNS sobre HTTPS, DNS sobre TLS o DNS sobre QUIC.
    links:
      - text: modDNS en GitHub
        url: https://github.com/ivpn/moddns
      - text: Obtén más información sobre modDNS
        url: https://moddns.net
      - text: modDNS FAQ
        url: https://moddns.net/standalone-faq
      - text: Política de privacidad
        url: https://moddns.net/privacy
  - type: service_card
    name: Portmaster
    logo: /images/pm_light_contrast.svg
    platform_note: "(Disponible en Linux y Windows)"
    plans:
      - Pro Suite
    content: >-
      Portmaster es un firewall de aplicaciones de código abierto que te ofrece una visión clara de todo tu tráfico de red. Muestra qué aplicaciones se conectan a Internet y te permite bloquear las conexiones que no consideres confiables. Portmaster opera en la capa de aplicaciones, inspeccionando cada conexión para identificar el proceso de software exacto responsable. Este enfoque proporciona un contexto más profundo que la mayoría de los firewalls, permitiéndote definir políticas de filtrado precisas para cada aplicación. Portmaster Pro ofrece acceso opcional a la Safing Privacy Network (SPN), una alternativa a la VPN que mejora la privacidad al enrutar tu tráfico a través de una red de enrutamiento en cebolla multi-hop.
  - type: single_image
    src: /images/portmaster-dashboard.png
    alt: Portmaster application firewall interface
  - type: features_list
    title: Funciones de Portmaster
    features:
      - Supervisa, permite o bloquea el acceso a Internet y establece reglas para aplicaciones, sitios web, IPs o países específicos.
      - Visualiza las conexiones en tiempo real por aplicación, incluyendo dominio, IP, país, puerto y protocolo.
      - Bloquea anuncios, rastreadores y hosts de malware a nivel del sistema.
      - Activa SPN, una red de enrutamiento en cebolla multi-hop con un kill switch integrado.
    links:
      - text: Portmaster en GitHub
        url: https://github.com/safing
      - text: Visita Safing.io
        url: https://safing.io
      - text: Wiki de la Comunidad Safing
        url: https://wiki.safing.io/en/Portmaster/App/Introduction
      - text: Política de privacidad
        url: https://safing.io/privacy/
  - type: pricing_table
    title: Planes de producto
    subtitle: Nuestros servicios están disponibles como parte de una suscripción a IVPN.
    header:
      services: Servicios
      plans:
        - IVPN Standard
        - IVPN Plus
        - IVPN Pro Suite
    rows:
      - service: IVPN
        values:
          - 5 dispositivos
          - 5 dispositivos
          - 10 dispositivos
      - service: Mailx
        values:
          - ✗
          - Incluido
          - Incluido
      - service: modDNS
        values:
          - ✗
          - Incluido
          - Incluido
      - service: Portmaster Pro
        values:
          - ✗
          - ✗
          - Incluido
    price_row:
      label: Precio / año
      values:
        - $60
        - $80
        - $100
    note: "Planes disponibles: semanal, mensual y anual."
  - type: content_with_image
    title: Stack compartimentalizado
    image: /images/stack-diagram-dark.png
    image_light: /images/stack-diagram-white.png
    alt: Stack Diagram
    paragraphs:
      - Con los planes Plus y Pro, puedes crear una cuenta para Mailx, modDNS y Safing Portmaster sin revelar los detalles de tu cuenta de IVPN.
      - Nuestro acceso sin enlace, diseñado específicamente, funciona creando tokens seguros que demuestran que eres un cliente de IVPN con un plan activo, sin exponer tu ID de cuenta ni la información de pago a otros servicios. Esto significa que si Mailx, modDNS o Portmaster fueran comprometidos, los atacantes no podrían obtener ninguna información sobre tu cuenta de IVPN.
    link:
      text: Lee sobre el acceso sin enlace
      url: "#"
  - type: text_cta
    title: Resiste la vigilancia en línea
    content: Comienza seleccionando un plan según los servicios que necesites.
    cta:
      text: ELIGE TU PLAN
      url: pricing
---
   