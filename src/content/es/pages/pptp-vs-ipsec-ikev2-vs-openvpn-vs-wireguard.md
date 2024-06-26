---
title: PPTP vs IPSec IKEv2 vs OpenVPN vs WireGuard
description: Compara PPTP, IPSec IKEv2, OpenVPN y WireGuard para determinar qué protocolo VPN ofrece la mejor combinación de seguridad, velocidad y facilidad de uso para tus necesidades.
url: /es/pptp-vs-ipsec-ikev2-vs-openvpn-vs-wireguard/
layout: full-width
---
# Comparativa de protocolos VPN

{{< raw-html >}}
<div class="content--hidden-mobile">
{{< / raw-html >}}

<div class="navbar" id="navbar">
    <div id="sticky">
        <h3>PPTP</h3>
        <h3>IPSec IKEv2</h3>
        <h3>OpenVPN</h3>
        <h3>WireGuard</h3>
    </div>
</div>

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Introducción</h3>
        </th>
    </tr>
    <tr>
        <td>Un protocolo VPN muy básico basado en PPP. La especificación PPTP en realidad no describe funciones de cifrado o autenticación y se basa en el protocolo PPP que se tuneliza para implementar la funcionalidad de seguridad.</td>
        <td>IKEv2 (intercambio de claves de Internet versión 2) es parte del conjunto de protocolos IPSec. Estandarizado en <a href="https://tools.ietf.org/html/rfc7296">RFC 7296</a>. IPSec se ha convertido en el protocolo estándar de facto para comunicaciones seguras en Internet, proporcionando confidencialidad, autenticación e integridad.</td>
        <td>Protocolo VPN de código abierto desarrollado por tecnologías OpenVPN. Muy popular, aunque no se basa en estándares (RFC). Utiliza un protocolo de seguridad personalizado y <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">SSL/TLS</a> para el intercambio de claves. Proporciona total confidencialidad, autenticación e integridad.</td>
        <td><a href="https://www.wireguard.com/">WireGuard®</a> es un protocolo VPN extremadamente rápido con muy poca sobrecarga y criptografía de última generación. Tiene el potencial de ofrecer una VPN más simple, más segura, más eficiente y más fácil de usar sobre las tecnologías existentes.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Cifrado</h3>
        </th>
    </tr>
    <tr>
        <td>La carga útil de PPP se cifra mediante el protocolo de cifrado punto a punto de Microsoft. (<a href="http://en.wikipedia.org/wiki/Microsoft_Point-to-Point_Encryption">MPPE</a>). MPPE implementa el algoritmo de cifrado RSA <a href="http://en.wikipedia.org/wiki/RC4">RC4</a> con un máximo de claves de sesión de 128 bits.</td>
        <td>IKEv2 implementa una gran cantidad de <a href="https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2CipherSuites">algoritmos criptográficos</a>, incluidos 3DES, AES, Blowfish y Camellia. IVPN implementa IKEv2 usando AES con claves de 256 bits.</td>
        <td>OpenVPN utiliza la biblioteca <a href="http://en.wikipedia.org/wiki/OpenSSL">OpenSSL</a> para proporcionar cifrado. OpenSSL implementa una gran cantidad de <a href="https://en.wikipedia.org/wiki/OpenSSL#Algorithms">algoritmos criptográficos</a> como 3DES, AES, RC5, Blowfish.<br> Al igual que IKEv2 , IVPN implementa AES con claves de 256 bits.</td>
        <td>Construido sobre ChaCha20 para cifrado simétrico (<a href="https://tools.ietf.org/html/rfc7539">RFC7539</a>), Curve25519 para acuerdo de clave anónima Diffie-Hellman (ECDH) de curva elíptica, BLAKE2s para hash (<a href="https://tools.ietf.org/html/rfc7693">RFC7693</a>), SipHash24 para claves de tabla hash y HKDF para derivación de claves (<a href="https:// tools.ietf.org/html/rfc5869">RFC5869</a>). Hace uso de un protocolo de enlace basado en UDP y el intercambio de claves utiliza un secreto directo perfecto al tiempo que evita tanto la suplantación de compromiso de claves como los ataques de repetición.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Debilidades de seguridad</h3>
        </th>
    </tr>
    <tr>
        <td>La implementación de PPTP de Microsoft tiene <a href="http://www.schneier.com/paper-pptpv2.html">graves vulnerabilidades de seguridad</a>. MSCHAP-v2 es vulnerable a ataques de diccionario y el algoritmo RC4 está sujeto a ataques de inversión de bits. Microsoft recomienda encarecidamente actualizar a IPSec cuando la confidencialidad sea una preocupación.</td>
        <td>IPSec no tiene vulnerabilidades importantes conocidas y generalmente se considera seguro cuando se implementa utilizando un algoritmo de cifrado seguro y certificados para autenticación. Sin embargo, las <a href="https://github.com/nsa-observer/documents/blob/master/files/pdf/media-35529.pdf">presentaciones filtradas de la NSA</a> indican que IKE podría explotarse en una manera desconocida de descifrar el tráfico IPSec.</td>
        <td>OpenVPN no tiene vulnerabilidades importantes conocidas y generalmente se considera seguro cuando se implementa utilizando un algoritmo de cifrado seguro y certificados de autenticación.</td>
        <td>WireGuard® no tiene vulnerabilidades importantes conocidas. Es relativamente nuevo y no ha sido objeto de una investigación exhaustiva como OpenVPN, aunque la base de código es extremadamente pequeña, por lo que las auditorías completas son posibles por parte de individuos y no solo de grandes organizaciones. WireGuard® está integrado en el árbol de Linux Kernel 5.6 y ha sido revisado por un auditor externo.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Velocidad</h3>
        </th>
    </tr>
    <tr>
        <td>Con RC4 y claves de 128 bits, la sobrecarga de cifrado es menor que la de todos los protocolos, lo que hace que PPTP sea el más rápido.</td>
        <td>IPSec con IKEv2 debería, en teoría, ser más rápido que OpenVPN debido al cifrado en modo de usuario en OpenVPN; sin embargo, depende de muchas variables específicas de la conexión. En la mayoría de los casos es más rápido que OpenVPN.</td>
        <td>Cuando se utiliza en su modo UDP predeterminado en una red de confianza, OpenVPN funciona de manera similar a IKEv2.</td>
        <td>WireGuard® se beneficia de primitivas criptográficas de velocidad extremadamente alta y de una profunda integración con el núcleo del sistema operativo subyacente, por lo que las velocidades son muy altas con una sobrecarga baja. La mayoría de los clientes reportan velocidades más altas que OpenVPN.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Puertos de cortafuego</h3>
        </th>
    </tr>
    <tr>
        <td>PPTP utiliza el puerto TCP 1723 y GRE (Protocolo 47). PPTP se puede bloquear fácilmente restringiendo el protocolo GRE.</td>
        <td>IKEv2 utiliza UDP 500 para el intercambio de claves inicial, el protocolo 50 para los datos cifrados IPSEC (ESP) y UDP 4500 para el recorrido NAT.<br> IKEv2 es más fácil de bloquear que OpenVPN debido a su dependencia de protocolos y puertos fijos. </td>
        <td>OpenVPN se puede configurar fácilmente para ejecutarse en cualquier puerto utilizando UDP o TCP, evitando así los cortafuegos restrictivos.</td>
        <td>WireGuard® utiliza el protocolo UDP y se puede configurar para utilizar cualquier puerto. Puede sucumbir a la configuración del tráfico más fácilmente que OpenVPN debido a la falta de soporte para TCP.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Instalación/Configuración</h3>
        </th>
    </tr>
    <tr>
        <td>Todas las versiones de Windows y la mayoría de los demás sistemas operativos (incluidos los móviles) tienen soporte nativo para PPTP. PPTP sólo requiere un nombre de usuario, contraseña y dirección de servidor, lo que lo hace increíblemente sencillo de instalar y configurar.</td>
        <td>Windows 7+, macOS 10.11+ y la mayoría de los sistemas operativos móviles tienen soporte nativo para IPSec con IKEv2.</td>
        <td>OpenVPN no está incluido en ninguna versión del sistema operativo y requiere la instalación de software cliente. La instalación suele tardar menos de 5 minutos.</td>
        <td>WireGuard® está en el árbol con Linux Kernel 5.6. Otros sistemas operativos que no son Linux requieren la instalación de una aplicación cliente WireGuard®. La instalación suele tardar menos de 5 minutos.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Estabilidad/Compatibilidad</h3>
        </th>
    </tr>
    <tr>
        <td>PPTP no es tan seguro ni se recupera tan rápido como OpenVPN en conexiones de red inestables. Problemas menores de compatibilidad con el protocolo GRE y algunos enrutadores.</td>
        <td>IPSec es más complejo que OpenVPN y puede requerir configuración adicional entre dispositivos detrás de enrutadores NAT. Sin embargo, siempre que tanto el servidor como el cliente admitan el cruce NAT, no debería haber ningún problema.</td>
        <td>Muy estable y rápido en redes inalámbricas, teléfonos móviles y otras redes inseguras donde la pérdida de paquetes y la congestión son comunes. OpenVPN tiene un modo TCP para conexiones muy poco fiables, pero este modo sacrifica un rendimiento significativo debido a la ineficiencia de encapsular TCP dentro de TCP.</td>
        <td>Extremadamente estable y robusto. Más estable que OpenVPN en roaming entre redes. Utiliza un punto final inicial para las conexiones y puede cambiar de servidor mientras mantiene la conexión. El cliente también puede cambiar de red sin perder la conexión.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Plataformas compatibles</h3>
        </th>
    </tr>
    <tr>
        <td>
            <a href="/es/apps-windows/">Windows</a><br>
            <a href="/es/apps-macos/">macOS</a><br>
            <a href="/es/apps-linux/">Linux</a><br>
            <a href="/es/apps-ios/">Apple iOS</a><br>
            <a href="/es/apps-android/">Android</a><br>
            <a href="/setup/router/">DD-WRT</a>
        </td>
        <td>
            <a href="/es/apps-windows/">Windows</a><br>
            <a href="/es/apps-macos/">macOS</a><br>
            <a href="/es/apps-linux/">Linux</a><br>
            <a href="/es/apps-ios/">Apple iOS</a><br>
            <a href="/es/apps-android/">Android</a>
        </td>
        <td>
            <a href="/es/apps-windows/">Windows</a><br>
            <a href="/es/apps-macos/">macOS</a><br>
            <a href="/es/apps-linux/">Linux</a><br>
            <a href="/es/apps-ios/">Apple iOS</a><br>
            <a href="/es/apps-android/">Android</a><br>
            <a href="/setup/router/">DD-WRT (con la versión correcta)</a>
        </td>
        <td>
            <a href="/es/apps-windows/">Windows</a><br>
            <a href="/es/apps-macos/">macOS</a><br>
            <a href="/es/apps-linux/">Linux</a><br>
            <a href="/es/apps-ios/">Apple iOS</a><br>
            <a href="/es/apps-android/">Android</a>
        </td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
<table class="table--fixed">
    <tr>
        <th colspan="4">
            <h3>Verdicto</h3>
        </th>
    </tr>
    <tr>
        <td><img src="/images-static/uploads/icon-dislike.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
        <td><img src="/images-static/uploads/icon-like.svg"></td>
    </tr>
    <tr>
        <td>Debido a los importantes fallos de seguridad, no hay ninguna buena razón para elegir PPTP aparte de la compatibilidad del dispositivo. Si tienes un dispositivo que solo admite PPTP, entonces deberías considerar cómo cifrar datos en otras capas, por ejemplo. HTTPS.</td>
        <td>IKEv2 es una excelente opción, es extremadamente rápido, seguro y de confianza Además, a diferencia de OpenVPN, no requiere la instalación de software adicional (en la mayoría de los casos) y por lo tanto, es el más rápido de configurar. Si tienes un modelo de amenaza que incluye adversarios sofisticados, es posible que desees considerar OpenVPN debido a las presentaciones filtradas de la NSA discutidas anteriormente.</td>
        <td>OpenVPN es una excelente opción para todas las plataformas. Es extremadamente rápido, seguro y de confianza</td>
        <td>WireGuard® es una excelente opción y puede ser el mejor protocolo para altas velocidades. WireGuard® promete mayor seguridad y velocidades más rápidas en comparación con las soluciones existentes. Desde su fusión con el Kernel de Linux (v5.6) y el lanzamiento de la v1.0, consideramos que WireGuard® está listo para su uso a gran escala.</td>
    </tr>
</table>
{{< / raw-html >}}

{{< raw-html >}}
</div>
{{< / raw-html >}}


{{< raw-html >}}
<div class="content--hidden-desktop">
{{< / raw-html >}}

##PPTP

### Introducción

Un protocolo VPN muy básico basado en PPP. La especificación PPTP en realidad no describe funciones de cifrado o autenticación y se basa en el protocolo PPP que se tuneliza para implementar la funcionalidad de seguridad.

### Cifrado

La carga útil de PPP se cifra mediante el protocolo de cifrado punto a punto de Microsoft ([MPPE](http://en.wikipedia.org/wiki/Microsoft_Point-to-Point_Encryption)). MPPE implementa el algoritmo de cifrado RSA <a href="http://en.wikipedia.org/wiki/RC4">RC4</a> con un máximo de claves de sesión de 128 bits.

### Debilidades de seguridad

La implementación de PPTP de Microsoft tiene [graves vulnerabilidades de seguridad] (http://www.schneier.com/paper-pptpv2.html). MSCHAP-v2 es vulnerable a ataques de diccionario y el algoritmo RC4 está sujeto a ataques de inversión de bits. Microsoft recomienda encarecidamente actualizar a IPSec cuando la confidencialidad sea una preocupación.

### Velocidad

Con RC4 y claves de 128 bits, la sobrecarga de cifrado es menor que la de todos los protocolos, lo que hace que PPTP sea el más rápido.

### Puertos de firewall

PPTP utiliza el puerto TCP 1723 y GRE (Protocolo 47). PPTP se puede bloquear fácilmente restringiendo el protocolo GRE.

### Instalación/Configuración

Todas las versiones de Windows y la mayoría de los demás sistemas operativos (incluidos los móviles) tienen soporte nativo para PPTP. PPTP sólo requiere un nombre de usuario, contraseña y dirección de servidor, lo que lo hace increíblemente sencillo de instalar y configurar.

### Estabilidad/Compatibilidad

PPTP no es tan fiable ni se recupera tan rápido como OpenVPN en conexiones de red inestables. Problemas menores de compatibilidad con el protocolo GRE y algunos enrutadores.

### Plataformas compatibles

[Windows](/es/apps-windows/)  
[macOS](/es/apps-macos/)  
[Linux](/es/apps-linux/)  
[Apple iOS](/es/apps-ios/)  
[Android](/es/apps-android/)  
[DD-WRT](/es/setup/router/)  

### Verdicto ![](/images-static/uploads/icon-dislike.svg)

Debido a los importantes fallos de seguridad, no hay ninguna buena razón para elegir PPTP aparte de la compatibilidad del dispositivo. Si tienes un dispositivo que solo admite PPTP, entonces deberías considerar cómo cifrar datos en otras capas, por ejemplo. HTTPS.


##IPSec IKEv2

### Introducción

IKEv2 (intercambio de claves de Internet versión 2) es parte del conjunto de protocolos IPSec. Estandarizado en [RFC 7296](https://tools.ietf.org/html/rfc7296). IPSec se ha convertido en el protocolo estándar de facto para las comunicaciones seguras en Internet, proporcionando confidencialidad, autenticación e integridad.

### Cifrado

IKEv2 implementa una gran cantidad de [algoritmos criptográficos](https://wiki.strongswan.org/projects/strongswan/wiki/IKEv2CipherSuites), incluidos 3DES, AES, Blowfish, Camellia. IVPN implementa IKEv2 usando AES con claves de 256 bits.

### Debilidades de seguridad

IPSec no tiene vulnerabilidades importantes conocidas y generalmente se considera seguro cuando se implementa utilizando un algoritmo de cifrado seguro y certificados para autenticación. Sin embargo, las [presentaciones filtradas de la NSA] (https://github.com/nsa-observer/documents/blob/master/files/pdf/media-35529.pdf) indican que IKE podría explotarse de una manera desconocida para descifrar el tráfico IPSec.

### Velocidad

En teoría, IPSec con IKEv2 debería ser más rápido que OpenVPN debido al cifrado en modo de usuario en OpenVPN; sin embargo, depende de muchas variables específicas de la conexión. En la mayoría de los casos es más rápido que OpenVPN.

### Puertos de firewall

IKEv2 utiliza UDP 500 para el intercambio de claves inicial, el protocolo 50 para los datos cifrados IPSEC (ESP) y UDP 4500 para el recorrido NAT.
IKEv2 es más fácil de bloquear que OpenVPN debido a su dependencia de protocolos y puertos fijos.

### Instalación/Configuración

Windows 7+, macOS 10.11+ y la mayoría de los sistemas operativos móviles tienen soporte nativo para IPSec con IKEv2.

### Estabilidad/Compatibilidad

IPSec es más complejo que OpenVPN y puede requerir una configuración adicional entre dispositivos detrás de enrutadores NAT. Sin embargo, siempre que tanto el servidor como el cliente admitan el cruce NAT, no debería haber ningún problema.

### Plataformas compatibles

[Windows](/es/apps-windows/)  
[macOS](/es/apps-macos/)  
[Linux](/es/apps-linux/)  
[Apple iOS](/es/apps-ios/)  
[Android](/es/apps-android/)  

### Veredicto ![](/images-static/uploads/icon-like.svg)

IKEv2 es una excelente opción, es extremadamente rápido, seguro y de confianza. Además, a diferencia de OpenVPN, no requiere la instalación de software adicional (en la mayoría de los casos) y por lo tanto, es el más rápido de configurar. Si tienes un modelo de amenaza que incluye adversarios sofisticados, es posible que desees considerar OpenVPN debido a las presentaciones filtradas de la NSA discutidas anteriormente.


## OpenVPN

### Introducción

Protocolo VPN de código abierto desarrollado por tecnologías OpenVPN. Muy popular, aunque no se basa en estándares (RFC). Utiliza un protocolo de seguridad personalizado y [SSL/TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) para el intercambio de claves. Proporciona total confidencialidad, autenticación e integridad.

### Cifrado

OpenVPN utiliza la biblioteca [OpenSSL](http://en.wikipedia.org/wiki/OpenSSL) para proporcionar cifrado. OpenSSL implementa una gran cantidad de [algoritmos criptográficos](https://en.wikipedia.org/wiki/OpenSSL#Algorithms) como 3DES, AES, RC5, Blowfish.
Al igual que IKEv2, IVPN implementa AES con claves de 256 bits.

### Debilidades de seguridad

OpenVPN no tiene vulnerabilidades importantes conocidas y generalmente se considera seguro cuando se implementa utilizando un algoritmo de cifrado seguro y certificados de autenticación.

### Velocidad

Cuando se utiliza en su modo UDP predeterminado en una red de confianza, OpenVPN funciona de manera similar a IKEv2.

### Puertos de firewall

OpenVPN se puede configurar fácilmente para ejecutarse en cualquier puerto utilizando UDP o TCP, evitando así los cortafuegos restrictivos.

### Instalación/Configuración

OpenVPN no está incluido en ninguna versión del sistema operativo y requiere la instalación de software cliente. La instalación suele tardar menos de 5 minutos.

### Estabilidad/Compatibilidad

Muy estable y rápido en redes inalámbricas, celulares y otras redes inseguras donde la pérdida de paquetes y la congestión son comunes. OpenVPN tiene un modo TCP para conexiones muy poco seguras, pero este modo sacrifica un rendimiento significativo debido a la ineficiencia de encapsular TCP dentro de TCP.

### Plataformas compatibles

[Windows](/es/apps-windows/)  
[macOS](/es/apps-macos/)  
[Linux](/es/apps-linux/)  
[Apple iOS](v/es/apps-ios/)  
[Android](/es/apps-android/)  
[DD-WRT (with the correct build)](/setup/router/) 

### Veredicto ![](/images-static/uploads/icon-like.svg)

OpenVPN es una excelente opción para todas las plataformas. Es extremadamente rápido, seguro y de confianza.


## WireGuard

### Introducción

[WireGuard®](https://www.wireguard.com/) es un protocolo VPN extremadamente rápido con muy poca sobrecarga y criptografía de última generación. Tiene el potencial de ofrecer una VPN más simple, más segura, más eficiente y más fácil de usar sobre las tecnologías existentes.

### Cifrado

Construido sobre ChaCha20 para cifrado simétrico ([RFC7539](https://tools.ietf.org/html/rfc7539)), Curve25519 para acuerdo de clave anónima Diffie-Hellman (ECDH) de curva elíptica, BLAKE2 para hash ([RFC7693]( https://tools.ietf.org/html/rfc7693)), SipHash24 para claves de tabla hash y HKDF para derivación de claves ([RFC5869](https://tools.ietf.org/html/rfc5869)). Hace uso de un protocolo de enlace basado en UDP y el intercambio de claves utiliza un secreto directo perfecto al tiempo que evita tanto la suplantación de compromiso de claves como los ataques de repetición.

### Debilidades de seguridad

WireGuard® no tiene vulnerabilidades importantes conocidas. Es relativamente nuevo y no ha sido objeto de una investigación exhaustiva como OpenVPN, aunque la base de código es extremadamente pequeña, por lo que las auditorías completas son posibles por parte de individuos y no solo de grandes organizaciones. WireGuard® está integrado en el árbol de Linux Kernel 5.6 y ha sido revisado por un auditor externo.

### Velocidad

WireGuard® se beneficia de primitivas criptográficas de velocidad extremadamente alta y de una profunda integración con el núcleo del sistema operativo subyacente, por lo que las velocidades son muy altas con una sobrecarga baja. La mayoría de los clientes reportan velocidades más altas que OpenVPN.

### Puertos de firewall

WireGuard® utiliza el protocolo UDP y se puede configurar para utilizar cualquier puerto. Puede sucumbir a la configuración del tráfico más fácilmente que OpenVPN debido a la falta de soporte para TCP.

### Instalación/Configuración

WireGuard® está integrado en el árbol con Linux Kernel 5.6. Otros sistemas operativos que no son Linux requieren la instalación de una aplicación cliente WireGuard®. La instalación suele tardar menos de 5 minutos.

### Estabilidad/Compatibilidad

Extremadamente estable y robusto. Más estable que OpenVPN en roaming entre redes. Utiliza un punto final inicial para las conexiones y puede cambiar de servidor mientras mantiene la conexión. El cliente también puede cambiar de red sin perder la conexión.

### Plataformas compatibles

[Windows](/es/apps-windows/)  
[macOS](/es/apps-macos/)  
[Linux](/es/apps-linux/)  
[Apple iOS](/es/apps-ios/)  
[Android](/es/apps-android/)  

### Veredicto ![](/images-static/uploads/icon-like.svg)

WireGuard® es una excelente opción y puede ser el mejor protocolo para altas velocidades. WireGuard® promete mayor seguridad y velocidades más rápidas en comparación con las soluciones existentes. Desde su fusión con el kernel de Linux (v5.6) y el lanzamiento de la v1.0, consideramos que WireGuard® está listo para su uso a gran escala.

{{< raw-html >}}
</div>
{{< / raw-html >}}
