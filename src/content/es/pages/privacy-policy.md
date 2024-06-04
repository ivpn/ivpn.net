Como servicio de privacidad, creemos que es de vital importancia recopilar la información mínima necesaria para utilizar nuestro servicio. Muchas empresas requieren al menos una dirección de correo electrónico para presionar con  las renovaciones de suscripciones y permitir otras estrategias de crecimiento. Cuando te registras en IVPN, no se te pedirá ninguna información personal, como dirección de correo electrónico, nombre, etc. Tampoco registraremos ninguna información de identificación personal, como la Dirección IP. 

Esto también significa que no tenemos forma de comunicarnos contigo en caso de tener problemas con la cuenta, inactividad de la red, etc. Si deseas proporcionarnos una dirección de correo electrónico para que podamos comunicarnos contigo sobre problemas futuros, opcionalmente puedes añadir una en el area del cliente después de registrarte.

### ¿Qué datos no se registran?

No registramos ningún dato relacionado con la actividad VPN de un usuario (mientras está conectado o conectándose a la VPN).

* No registramos el tráfico

* No registramos la fecha de conexión ni duración de la conexión

* No registramos las peticiones de DNS

* No registramos el ancho de banda del usuario

* No registramos las direcciones IP de clientes

* No registramos ninguna actividad de la cuenta, excepto las conexiones simultáneas totales activas (se explica a continuación) 

### ¿Qué datos se registran al crear una cuenta?

Cuando se crea una nueva cuenta, almacenamos los siguientes datos: (ten en cuenta que utilizamos nombres de campo simplificados y el siguiente formato para resaltar la información relevante)

<div class="table-container-mobile">

| ID | Creado en | Producto | Dispositivos máx |
|---|---|---|---|
| i-XXXX-XXXX-XXXX | 2020-09-21 05:03:13 | IVPN Pro | 7 |

</div>

### ¿Qué información se registra al realizar un pago con tarjeta de crédito, PayPal, efectivo, criptomoneda o código de cupón?

Cuando añades tiempo a tu cuenta, se almacena la siguiente información:

<div class="table-container-mobile">

| ID de pago | ID de cuenta | Cantidad | Moneda | Fecha | ID de transacción |
|---|---|---|---|---|---|
| xxx | xxx | 100 | USD | 2020-10-2 14:01:11 | xxx |

</div>

Parte de la información de pago puede estar relacionada con tu cuenta; por ejemplo, si se utiliza PayPal, se asociará un ID de transacción de PayPal con tu cuenta, así como un ID de suscripción para crear una suscripción de PayPal. Si el pago se realiza utilizando nuestro servidor BTCPay, el ID de la transacción BTCPay se asociará con tu cuenta (ten en cuenta que utilizamos nuestro propio servidor BTCPay). Si añades tiempo con un código de cupón, se almacena en nuestro sistema y se asocia con tu ID de cuenta durante 30 días después canjearlo y luego se elimina. 

Para pagos con tarjeta de crédito, utilizamos Braintree como nuestro procesador de pagos y almacenamos un ID de transacción de Braintree en tu cuenta. Si eliges habilitar la renovación automática de la suscripción, también se almacenará una identificación de suscripción.

Estos son los datos que almacenamos para un pago con tarjeta de crédito:

<div class="table-container-mobile">

| ID de pago | ID de la cuenta | Cantidad | Moneda | Fecha |
|---|---|---|---|---|---|
| xxx | xxx | 100 | USD | 2018-10-2 14:01:11 |

</div>

Para procesar tu pago, Braintree y PayPal solicitarán información adicional. Braintree requiere la recopilación de los datos de tu tarjeta para procesar tu pago, y PayPal requerirá nombre, correo electrónico y dirección para crear una nueva cuenta de PayPal, así como la aceptación de sus términos de servicio. IVPN no almacena estos datos adicionales, aunque Braintree y PayPal están obligados a conservarlos durante muchos años. Ningún proveedor de pagos externo tiene acceso a tu ID de cuenta IVPN.

En resumen, cuando podamos ofrecer métodos de pago anónimos, lo haremos y recopilaremos la menor cantidad de información posible para procesarlos. Sin embargo, los sistemas de pago centralizados o de terceros, y su procesamiento y almacenamiento de datos, están fuera de nuestro control.

Seleccione pagos en efectivo o criptomonedas si esto te preocupa.

### ¿Por qué se almacena la ID de transacción y ID de suscripción?

Para poder procesar reembolsos de nuestra garantía de devolución de 30 días y resolver otros problemas de pago, así como permitir la renovación automática de la suscripción si esta fuese habilitada por el usuario.

### ¿Qué información se registra cuando visito la página web de IVPN?

IVPN ha seleccionado [Matomo](https://matomo.org) como su plataforma de análisis web. Los análisis web nos permiten comprender la interacción de nuestros usuarios con nuestra página web para comprender dónde se puede mejorar en términos de usabilidad, simplicidad y velocidad. También nos ayuda a comprender de dónde proceden los visitantes de nuestra página y a auditar estás páginas de referencia para garantizar que no hagan afirmaciones infundadas o exageradas.

Matomo es un software de código abierto que se aloja en nuestra propia infraestructura de servidores para garantizar tu privacidad (a diferencia de plataformas como Google Analytics). Por ejemplo, el Centro para la Protección de la Privacidad de Datos de Francia (CNIL) recomendó Matomo como la única herramienta que puede garantizar fácilmente el pleno cumplimiento de las normas de privacidad. Matomo se utiliza para analizar información agregada sobre los visitantes de nuestra página web.

Cuando tu navegador web carga una página en nuestro sitio, se ejecuta un pequeño fragmento de código JavaScript dentro de tu navegador que envía información como;

* el agente de usuario de tu navegador

* idioma

* resolución de la pantalla

* página web de referencia

* Dirección IP

Para garantizar tu privacidad, IVPN descarta los dos últimos octetos de la dirección IP. Matomo también puede establecer una cookie web para facilitar la identificación de los usuarios que vuelven a visitar el sitio.

### ¿Dónde se almacenan mis datos y quién tiene acceso a ellos?

IVPN está sujeto a la legislación de la UE y cumple con la Directiva de protección de datos de la UE (Directiva 95/46/CE), que prohíbe a las empresas transferir datos a jurisdicciones extranjeras con leyes de privacidad más débiles. IVPN no ubicará servidores en países donde se vea obligado a vulnerar este cumplimiento. Debido a la naturaleza de nuestras prácticas de registro, los servidores VPN no contienen ninguna información de identificación personal y por lo tanto, si son incautados, no podrían usarse para identificar a los usuarios.

Ningún tercero tiene acceso a ninguno de tus datos. Siempre utilizamos herramientas propias o de terceros que podemos alojar en nuestros propios servidores en un entorno protegido y seguro.

### ¿Cómo se limita la cantidad de dispositivos conectados?

Los planes IVPN limitan el uso del servicio a una cantidad determinada de dispositivos. El servidor de autenticación mantiene un registro temporal de todos los ID de cuentas que tienen al menos un dispositivo conectado a una aplicación IVPN. Cuando un usuario inicia sesión en la aplicación IVPN, se agrega una entrada a la base de datos de la sesión del dispositivo que contiene lo siguiente:

* un token único, que contiene una cadena alfanumérica de 16 caracteres utilizada para distinguir las entradas en la base de datos

* la ID de cuenta correspondiente

Cuando un cliente intenta iniciar sesión en una aplicación IVPN, se envía una solicitud a nuestros servidores de autenticación para verificar que la ID de cuenta especificada sea válida y tenga un plan activo asociado. Como siguiente paso, verificamos si la cantidad de tokens asociados con la identificación de la cuenta del cliente excede la cantidad permitida de dispositivos según el plan adquirido. Si la cantidad de tokens es igual a la cantidad permitida por su plan, se deniega el intento de autenticación.

No almacenamos fechas ni ninguna información relacionada con el dispositivo que pueda usarse para identificarlo, como marca del producto, modelo, número IMEI, dirección MAC, etc. Las entradas de la base de datos de sesiones del dispositivo se eliminan permanentemente cuando el cliente cierra sesión de la aplicación IVPN, o cuando su cuenta es cancelada o eliminada. Si un adversario pudiera obtener acceso a estos datos, solo podría determinar qué ID de cuenta se había utilizado para iniciar sesión en al menos un dispositivo en ese momento y la cantidad de dispositivos conectados. Sin embargo, estos datos no proporcionan ninguna información útil sobre conexiones VPN pasadas o presentes iniciadas por el usuario de la cuenta.


### ¿Cómo se limitan las conexiones simultáneas?

Para autenticar a los clientes, nuestros servidores VPN envían una solicitud a un servidor de autenticación central, que contiene el ID de la cuenta del cliente. El servidor de autenticación mantiene un registro temporal de todos los ID de los clientes conectados. Cuando un cliente se conecta a un servidor VPN, el servidor de autenticación verifica cuántos registros de autenticación activos ya hay en la tabla para el ID de la cuenta; si excede el número permitido de conexiones simultáneas, se deniega la autenticación. Cuando un usuario se desconecta, el registro relevante se elimina permanentemente. Si un adversario pudiera obtener acceso a estos datos, solo podría determinar qué ID de cuenta estaba conectada a la red VPN en ese momento exacto.

Como estos datos solo se almacenan durante la sesión de VPN, si alguien solicita saber cuántas conexiones se realizaron en un momento específico en el pasado, no podremos saberlo porque no los almacenamos.

### ¿Qué información se almacena para la administración del dispositivo?

La gestión de dispositivos es una función opcional (deshabilitada de manera predeterminada) que ayuda a los clientes a revisar y eliminar dispositivos que están autenticados para usar el servicio IVPN.

Cuando se activa la gestión de dispositivos, se agrega un campo adicional para el nombre del dispositivo a la tabla de registro temporal que ayuda a limitar la cantidad de dispositivos conectados.
IVPN asigna nombres de dispositivos en una secuencia específica (A-B-C-D-E-F-G) de una lista predefinida de siete nombres. Si se cierra la sesión de un dispositivo, su nombre pasa a estar disponible como siguiente opción para futuras asignaciones. Por ejemplo, si un cliente con siete dispositivos autenticados elimina el dispositivo F, D y luego C, la nueva secuencia se convierte en A-B-E-G-F-D-C, lo que hace que los últimos tres nombres estén disponibles para nuevos dispositivos.

Esta uso de nomenclatura garantiza que los nombres de los dispositivos no se puedan utilizar para identificar tu cuenta en caso de que un adversario pudiera obtener acceso a estos datos específicos.


### ¿Qué información se conserva cuando dejo de utilizar el servicio?
Cuando se cancela una cuenta VPN en nuestra red debido a la finalización de la suscripción, falta de pago o por cualquier otro motivo, todos los datos asociados con esa cuenta VPN, incluida la cuenta misma (con la excepción de los datos contables a continuación) se eliminan automáticamente después de 90 días. Una vez eliminada la cuenta, los datos contables restantes que aparecen a continuación no tienen ningún vínculo con ningún ID de cuenta anterior. Si deseas eliminar tus datos inmediatamente, simplemente haz clic en el botón 'eliminar cuenta' dentro del área de cliente.

<div class="table-container-mobile">

| Fecha de pago | Cantidad | Método de pago | ID de transacción | ID de suscripción |
|---|---|---|---|---|
| 2020-01-24 | $100 | Paypal | XXX | XXX |

</div>

### ¿Cómo puedo obtener acceso a los datos que se almacenan en mi nombre a través de una solicitud de acceso de sujeto?

De acuerdo con la legislación GDPR, las solicitudes razonables de divulgación de datos de un usuario específico se aceptarán dentro de los 28 días posteriores a una solicitud aceptable de un usuario o persona con una relación legal demostrable con ese usuario.

Nos reservamos el derecho de rechazar o cobrar por solicitudes que sean manifiestamente infundadas o excesivas. Cualquier solicitud de acceso de sujeto rechazada será respondida sin demora indebida, incluido el motivo del rechazo, así como el recurso para remitirlo a la autoridad supervisora.

Las solicitudes de acceso a los sujetos deben realizarse por escrito a sar@ivpn.net

### ¿Dónde está la autoridad reguladora que supervisa la jurisdicción en la que opera IVPN según el GDPR?

IVPN está registrada en Gibraltar y, como tal, el organismo regulador del RGPD es la [Autoridad Reguladora de Gibraltar](http://www.gra.gi/).

### ¿Qué sucede si recibo un aviso legal, como una DMCA, para los derechos de autor del material que he descargado?

Dado que nuestros clientes utilizan una dirección IP emitida por IVPN cuando utilizan nuestro servicio, dichos avisos se dirigen a IVPN y nuestro departamento legal emitirá una respuesta adecuada. Dado que no almacenamos registros de conexión, no podemos asociar una solicitud con la identidad de un cliente, incluso si estamos legalmente obligados a hacerlo.

### ¿Cómo se reacciona cuando una autoridad solicita información relativa a un cliente?

La empresa está constituida en Gibraltar. Si se recibe una orden judicial de una autoridad legal reconocida con jurisdicción sobre IVPN, entonces la empresa cumplirá con esa orden. Sin embargo, no se puede obligar a la empresa a entregar información de la que no dispone. Cuando un cliente se registra, no solicitamos información personal. Si alguna vez la ley nos exige mantener un registro persistente de las conexiones de nuestros clientes o cualquier dato personal relacionado con su actividad de red, lo notificaremos inmediatamente a nuestros clientes y haremos todo lo que esté a nuestro alcance para cambiar de jurisdicción o cerrar el servicio para proteger a quienes nos confían su privacidad.

### ¿Qué pasa si las leyes cambian?

IVPN se compromete a mantener informados a sus clientes sobre cualquier amenaza legislativa grave a nuestro servicio. Si las leyes en nuestra jurisdicción cambian de manera que nos impida cumplir con nuestra política de privacidad, siempre informaremos a nuestros clientes antes de que se promulguen esas leyes. También permitiremos a los clientes cancelar su suscripción y reembolsaremos cualquier tarifa que cubra el resto de su período de suscripción.

### Registros de fallos (crash)

De forma predeterminada, si una de nuestras aplicaciones móviles falla mientras la usas, se recopilarán datos anónimos sobre el error en el dispositivo para ayudarnos a identificar su causa y poder solucionarla en una actualización futura. Estos "registros de fallos" contienen información como el estado de la aplicación, el sistema operativo y el dispositivo en el momento del fallo, pero ninguna información de identificación personal.

Recibimos registros de fallos de nuestras aplicaciones de escritorio solo cuando el usuario confirma manualmente el envío de los fallos. Para nuestras aplicaciones móviles, puedes optar por no enviar informes de registro de fallos deshabilitándolos en las preferencias del usuario.

Los registros de fallos se envían a un servidor alojado y administrado por IVPN, y no por proveedores externos ni servicios en la nube.

### Permisos del dispositivo para acceder a datos personales

Las aplicaciones IVPN para iOS y Android pueden solicitar ciertos permisos que le permitan acceder a los datos del dispositivo del usuario como se describe a continuación.

Estos permisos deben ser otorgados por el usuario antes de poder acceder a la información respectiva. Una vez otorgado el permiso, el usuario puede revocarlo en cualquier momento en la configuración del dispositivo.

Ten en cuenta que la revocación de dichos permisos podría afectar el funcionamiento adecuado de la aplicación.

#### Aplicación Android

Permiso de ubicación (continuo):  
Requerido para acceder al SSID de la Wi-Fi actual, cuando la función Protección de red de la aplicación está habilitada.

Permiso de la cámara:  
Se utiliza para escanear códigos QR para iniciar sesión con una ID de cuenta.

#### Aplicación iOS

Permiso para guardar el perfil de VPN:  
Requerido para acceder al SSID de la Wi-Fi actual, cuando la función Protección de red de la aplicación está habilitada.

Permiso de la cámara:  
Se utiliza para escanear códigos QR para iniciar sesión con una ID de cuenta.

### Cambios en la política

IVPN se reserva el derecho de cambiar esta política de privacidad en cualquier momento. En tales casos, tomaremos todas las medidas razonables para garantizar que estos cambios lleguen a tu conocimiento publicando todos los cambios de manera destacada en la página web de IVPN durante un período de tiempo razonable, antes de que la nueva política entre en vigencia, así como enviando correos electrónicos a nuestros clientes existentes.

Si tienes alguna pregunta o comentario sobre esta política, no dudes en contactarnos.