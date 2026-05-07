---
title: Unlinked Access por IVPN
description: Unlinked Access es un sistema desarrollado por IVPN que permite a Mailx, modDNS y Portmaster conceder y sincronizar el acceso a suscripciones sin recibir ni almacenar tu ID de cuenta de IVPN.
url: /es/unlinked-access/
---
# Unlinked Access por IVPN

## Acceso a suscripciones sin compartir tu ID de cuenta de IVPN

Unlinked Access es un sistema desarrollado por IVPN que permite a Mailx, modDNS y Portmaster conceder y sincronizar el acceso a suscripciones sin recibir ni almacenar tu ID de cuenta de IVPN.

## El problema del acceso a servicios agrupados

La mayoría de las plataformas que agrupan múltiples servicios bajo una sola suscripción utilizan la federación de cuentas: una única identidad vinculada a todos los productos a los que accedes. Cada servicio termina teniendo un enlace almacenado hacia el mismo usuario. Incluso cuando ese vínculo se usa solo de forma operativa, tiende a propagarse a bases de datos, registros, copias de seguridad y herramientas administrativas. Con el tiempo, esto crea un perfil entre servicios.

Las cuentas de IVPN son intencionadamente mínimas. No se requiere una dirección de correo electrónico para crear una, y el identificador principal es un ID de cuenta aleatorio. Cuando añadimos Mailx, modDNS y Portmaster a los planes de IVPN, no queríamos resolver el problema del acceso a múltiples servicios propagando ese ID de cuenta a cada servicio.

## Cómo funciona Unlinked Access

Cuando activas un servicio desde el área de tu cuenta, IVPN genera un token criptográfico derivado de tu ID de cuenta. Ese token se envía al servicio de destino durante la activación, no tu ID de cuenta de IVPN. Cada servicio almacena un hash de ese token, no el token en sí.

Para la sincronización continua, los servicios adicionales utilizan un hash almacenado del token en lugar del ID de cuenta de IVPN. El estado de la suscripción, como el plan, estado activo y fecha de expiración, se sincroniza regularmente mediante un manifiesto distribuido que contiene los hashes.

Esto significa que Mailx, modDNS y Portmaster pueden confirmar que tienes derecho a acceder al servicio y mantener actualizado el estado de tu suscripción sin necesidad de tu ID de cuenta de IVPN.

## Qué significa esto para ti

- Mailx, modDNS y Portmaster no almacenan tu ID de cuenta de IVPN.  
- Un compromiso de la base de datos de un servicio no revela por sí solo tu ID de cuenta de IVPN ni un mapeo directo a tus otras cuentas de servicio.  
- La sincronización de la suscripción es automática. No necesitas volver a autorizar manualmente el acceso cuando tu plan de IVPN se renueva.  

## Lo que Unlinked Access no cubre

Unlinked Access resuelve un problema específico: el enlace directo entre cuentas de diferentes servicios mediante identificadores compartidos.

No aborda todos los posibles riesgos de correlación, como:

- Correlación de direcciones IP  
- Análisis de patrones de uso  
- Inferencias basadas en el tiempo  
- Huellas digitales del navegador o del dispositivo  
- Errores operativos fuera del diseño de Unlinked Access  

Estos son aspectos de modelo de amenazas separados y quedan fuera del alcance directo de Unlinked Access.

La implementación es de código abierto. Puedes revisar el código fuente en GitHub.

## Preguntas frecuentes

### ¿Puede el personal de IVPN vincular mi cuenta de IVPN con mi cuenta de Mailx, modDNS o Portmaster?

No a partir de los datos que almacenan los servicios. Los servicios adicionales utilizan hashes derivados de tokens en lugar de IDs de cuenta de IVPN, y no contienen un mapeo directo hacia tu cuenta de IVPN. El personal de IVPN con acceso únicamente a la base de datos de un servicio no puede identificar qué cuenta de IVPN posees.

Dicho esto, Unlinked Access no garantiza una desvinculación perfecta. La derivación del token es determinista. Recuperar el vínculo entre una cuenta de IVPN y una cuenta de servicio requeriría acceso a múltiples sistemas separados, no solo a la base de datos del servicio.

### ¿Unlinked Access me protege completamente del rastreo entre estos servicios?

No. Unlinked Access elimina la forma más directa de correlación interna: compartir el identificador de la cuenta de IVPN entre servicios adicionales. No pretende eliminar todas las formas posibles de correlación entre servicios en todos los escenarios de compromiso.

Lo que Unlinked Access evita de forma más directa es una consulta sencilla desde una base de datos de Mailx, modDNS o Portmaster hacia tu ID de cuenta de IVPN.

### Si Mailx, modDNS o Portmaster se ve comprometido, ¿se expone mi cuenta de IVPN?

Un compromiso de la base de datos de un servicio no revela por sí solo tu ID de cuenta de IVPN. Normalmente, expondría los datos que ese servicio almacena para su propio funcionamiento, junto con datos derivados de tokens utilizados para la sincronización de la suscripción.

Unlinked Access está diseñado para que la sincronización de la suscripción no requiera que tu ID de cuenta de IVPN esté presente en las bases de datos de servicios adicionales.

### ¿Por qué Mailx y modDNS requieren una dirección de correo electrónico si mi cuenta de IVPN no la necesita?

IVPN no utiliza una capa de identidad compartida entre servicios. Esto significa que los servicios adicionales gestionan sus propios requisitos de cuenta y recuperación de forma independiente. El personal de IVPN no puede recuperar rutinariamente tus cuentas de Mailx o modDNS mediante una identidad vinculada.

En Mailx, necesitas acceso real al buzón de correo, ya que es la dirección a la que el servicio envía los mensajes. En modDNS, el requisito de correo electrónico es para la recuperación de la cuenta, pero puedes usar el servicio sin verificarlo. Portmaster admite una dirección de correo electrónico para la recuperación de la cuenta, pero no es obligatoria.

### ¿Cómo se detiene el acceso a servicios adicionales cuando expira mi suscripción de IVPN?

IVPN publica datos de autorización actualizados de forma periódica. Cuando cambia el estado de la suscripción, los servicios adicionales obtienen el último manifiesto y actualizan su estado de autorización local.

Cualquier comportamiento específico del servicio tras la expiración es gestionado por el propio servicio.

Existe una ventana de acceso limitado de 14 días después de la expiración para los servicios adicionales. Mailx continúa reenviando correo, modDNS sigue resolviendo consultas. No se aceptan cambios en alias ni perfiles durante este período. Portmaster vuelve a Portmaster Free inmediatamente después de que la cuenta expire.