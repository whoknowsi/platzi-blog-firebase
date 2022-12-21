# PlatziBlog
Proyecto de práctica para el uso de Firebase usando javascript vanilla, html y css.

El proyecto base le pertenece a Juan Guillermo Gómez Torres de Platzi, el diseño y funcionamiento básico es de su autoría. El proyecto fue completado y modificado por mí para poder ser usado con live-server y refactorizado para usar firebase modularizado usando la última versión de firebase a la fecha (9.2.0).

## Características
- Uso de firebase para autenticación de usuarios:
  - Email y contraseña
  - Google
  - Facebook
  - Twitter
- Uso de firebase messaging para notificaciones push. (Las notificaciones se pueden enviar manualmente desde la consola de firebase, no se implementó el envío automático de notificaciones por el hecho que se debe pagar por el servicio de cloud functions)
- Uso de firebase storage para almacenar imágenes.
- Uso de firebase hosting para el despliegue de la aplicación.
- Uso de reglas de firebase para proteger tanto la base de datos como el storage.

## Web del proyecto desplegado
[https://platzi-blog-firebase.web.app/](https://platzi-blog-firebase.web.app/)

## ¿Cómo ponerlo en funcionamiento?

* Clonar el repositorio
* Instalar las dependencias con `npm install`
* Crear archivo firebase-config.js en la carpeta public/config con el formato:
```javascript
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

export default firebaseConfig;
```

modificar ```firebase-messaging-sw.js``` con los mismos datos de firebase-config.js 

* Iniciar el servidor con `npm start`
* Para poder probar la autorización de firebase es necesario ejecutarlo en localhost:3000 y no usando la ip local.

## Créditos
- Juan Guillermo Gómez Torres
- Platzi

