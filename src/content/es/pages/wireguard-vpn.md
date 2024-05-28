---
title: Protocolo WireGuard VPN para privacidad - comienza a usarlo con IVPN
description: WireGuard es un protocolo VPN revolucionario que promete mayor seguridad y velocidades más rápidas en comparación con las soluciones existentes. IVPN ofrece WireGuard en nuestras aplicaciones de Windows, macOS, Linux, iOS y Android. Configura y ejecuta WireGuard VPN en dos minutos.
url: /es/wireguard/
params:
  translated: true
---
# WireGuard<sup>®</sup> VPN

[WireGuard](https://www.wireguard.com/) es un protocolo VPN revolucionario que utiliza criptografía de última generación prometiendo mayor seguridad y velocidades más rápidas en comparación con las soluciones existentes. Consulta la [página del protocolo WireGuard](https://www.wireguard.com/) para obtener una descripción general rápida del protocolo y la criptografía. Para mayor información, revisa el [documento técnico](https://www.wireguard.com/papers/wireguard.pdf).

## IVPN + WireGuard

Desde su fusión con Linux Kernel v5.6, el lanzamiento de WireGuard 1.0 y una auditoría de seguridad de terceros, consideramos que el protocolo está listo para un uso a gran escala. Creemos que WireGuard es el mejor protocolo para la mayoría de los clientes debido a su rendimiento excepcional, propiedades de seguridad, capacidad de itinerancia entre direcciones IP sin pérdida de paquetes ni desconexiones y conexión/desconexión instantánea.

Sin embargo, WireGuard® no fue diseñado pensando en los proveedores de VPN de privacidad. Además, deja ciertos aspectos (por ejemplo, asignación de dirección IP, distribución de claves, etc.) a la responsabilidad del desarrollador. Como resultado, existen algunos problemas de privacidad que todos los proveedores de VPN responsables deben resolver. Estos problemas no representan de ninguna manera una debilidad del protocolo WireGuard en sí, son simplemente aspectos que los diseñadores del protocolo omitieron intencionalmente. Hemos identificado e implementado las siguientes soluciones en la red IVPN.

<span class="badge">Asunto</span>

#### La dirección IP pública del par se almacena en la memoria indefinidamente

Hemos implementado un servicio de administración de claves en todos los servidores que escanea la lista de pares cuyo último enlace de conexión es > 180 segundos y elimina/restablece su configuración..

<span class="badge">Asunto</span>

#### No hay mecanismo para la asignación o rotación de direcciones IP del túnel

Las aplicaciones IVPN llaman al backend de forma automática y transparente cada 24 horas para generar una nueva dirección IP aleatoria y distribuirla a todos los servidores.

<span class="badge">Asunto</span>

#### Sin secreto previo que oculte la identidad

Las aplicaciones IVPN regeneran de forma automática y transparente un nuevo par de claves cada 24 horas y cargan la clave pública al backend para distribuirla a todos los servidores. 

## WireGuard FAQ

#### ¿Cómo puedo utilizar WireGuard?

* [Configura tu propio servidor WireGuard](https://www.wireguard.com/quickstart/) y conéctate usando una de las aplicaciones oficiales.
* Suscríbete a un proveedor de VPN que admita WireGuard. Si bien IVPN no es el único servicio que ofrece WireGuard, fuimos [los primeros en adoptarlo](/blog/introducing-wireguard-fully-automated/) y tener una experiencia significativa dándole soporte.

#### ¿Qué sistemas operativos admite WireGuard?

WireGuard es compatible con todos los principales sistemas operativos. La compatibilidad con WireGuard está integrada en las aplicaciones de IVPN para Windows, macOS, Linux, iOS y Android.

#### ¿Qué criptografía se utiliza en WireGuard?

WireGuard utiliza los siguientes protocolos y primitivas:

* [ChaCha20](http://cr.yp.to/chacha.html) para cifrado simétrico, autentificado con [Poly1305](http://cr.yp.to/mac.html), usando [construcción AEAD del RFC7539](https://tools.ietf.org/html/rfc7539)
* [Curve25519](http://cr.yp.to/ecdh.html) para ECDH
* [BLAKE2s](https://blake2.net/) para hash y hash con clave, como se describe en [RFC7693](https://tools.ietf.org/html/rfc7693)
* [SipHash](http://cr.yp.to/siphash/siphash-20120918.pdf) para claves de tabla hash
* [HKDF](https://eprint.iacr.org/2010/264) para la derivación de claves, como se describe en [RFC5869](https://tools.ietf.org/html/rfc5869)
* [Noise_IK handshake](https://www.wireguard.com/protocol/#key-exchange-and-data-packets) de [Noise](http://noiseprotocol.org/noise.pdf), basándose en el trabajo de [CurveCP](http://www.curvecp.org/), [NaCL](http://cr.yp.to/highspeed/naclcrypto-20090310.pdf), [KEA+](http://research.microsoft.com/en-us/um/people/klauter/security_of_kea_ake_protocol.pdf), [SIGMA](http://webee.technion.ac.il/~hugo/sigma-pdf.pdf), [FHMQV](https://eprint.iacr.org/2009/408.pdf), and [HOMQV](https://eprint.iacr.org/2010/638.pdf)
* Todos los paquetes se envían a través de UDP.

#### ¿Dónde tienes los servidores WireGuard?

Ofrecemos servidores WireGuard en 45 ubicaciones en 32 países. Revisa la lista completa de servidores en nuestra [página de estado de servidores](/status/).

#### Soy usuario de IVPN. ¿Necesito registrarme en WireGuard?

WireGuard está disponible y listo para su uso para todos los clientes de IVPN existentes. No es necesario registrarse por separado.

#### ¿Se ofrecen todas las funciones de IVPN para WireGuard?

Admitimos las mismas funciones de seguridad y privacidad que con OpenVPN, por ejemplo, Firewall, protección de redes inseguras, AntiTracker y Multi-hop.

#### ¿Se ofrece soporte IPv6 para WireGuard?

Si.

#### ¿Qué puertos se utilizan para WireGuard?

Puertos UDP 53, 80, 443, 1194, 2049, 2050, 30587, 41893, 48574, 58237.

#### ¿Necesito crear y agregar manualmente una clave pública en el Área de Cliente IVPN al agregar un nuevo dispositivo?

No, cuando se utiliza la aplicación IVPN, las claves se generan automáticamente y la clave pública se carga en nuestro servidor en el momento en que selecciona el protocolo WireGuard en la aplicación.

Si no estás utilizando una aplicación IVPN, también puedes generar y descargar archivos de configuración WireGuard en el [Área de cliente](/account/wireguard-config).

#### ¿Qué servidor DNS se utiliza al conectarse con WireGuard?

Alojamos nuestros propios servidores DNS sin registros que se envían y aplican automáticamente a tu dispositivo cuando te conectas. Cuando estás conectado, la dirección IP del servidor DNS es 172.16.0.1
