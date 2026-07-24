# Watches Frontend

Frontend de la aplicación **Watches**, desarrollado con **Angular 20**. La aplicación permite gestionar y visualizar productos, principalmente relojes, y se comunica con un backend mediante una API REST.

Este proyecto utiliza Angular CLI y está preparado para trabajar con diferentes configuraciones de entorno, permitiendo utilizar una API local durante el desarrollo y una API remota en otros ambientes.

---

# Contenido

- [Requisitos previos](#requisitos-previos)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración del entorno](#configuración-del-entorno)
- [Variables de entorno](#variables-de-entorno)
- [Configuración del Backend](#configuración-del-backend)
- [Servidor de desarrollo](#servidor-de-desarrollo)
- [Compilación del proyecto](#compilación-del-proyecto)
- [Pruebas unitarias](#pruebas-unitarias)
- [Pruebas end-to-end](#pruebas-end-to-end)
- [Generación de componentes](#generación-de-componentes)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Flujo para nuevos desarrolladores](#flujo-para-nuevos-desarrolladores)
- [Despliegue](#despliegue)
- [Recursos adicionales](#recursos-adicionales)

---

# Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados:

- Node.js
- npm
- Git
- Angular CLI 20

Puedes comprobar las versiones instaladas ejecutando:

```bash
node --version
```

```bash
npm --version
```

```bash
ng version
```

Si Angular CLI no está instalado globalmente, puedes instalarlo con:

```bash
npm install -g @angular/cli
```

---

# Tecnologías utilizadas

El proyecto está desarrollado utilizando las siguientes tecnologías y herramientas:

- Angular 20
- Angular CLI 20.3.9
- TypeScript
- HTML
- CSS
- Tailwind CSS
- DaisyUI
- RxJS
- Signals de Angular
- Reactive Forms
- Angular Router
- API REST
- Git
- GitHub

El frontend consume los servicios proporcionados por el backend de la aplicación Watches.

---

# Instalación

## 1. Clonar el repositorio

Clona el repositorio utilizando Git:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entra en la carpeta del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

---

## 2. Instalar las dependencias

Una vez dentro del proyecto, ejecuta:

```bash
npm install
```

Este comando instalará todas las dependencias especificadas en:

```text
package.json
```

También se utilizará el archivo:

```text
package-lock.json
```

para instalar las versiones correspondientes de las dependencias.

No es necesario instalar manualmente cada dependencia del proyecto.

---

# Configuración del entorno

El proyecto utiliza los archivos de environment de Angular para manejar las diferentes configuraciones de la aplicación.

La estructura esperada es:

```text
src/
└── environments/
    ├── environment.ts
    └── environment.development.ts
```

Estos archivos contienen información de configuración que puede variar dependiendo del ambiente en el que se ejecute la aplicación.

Actualmente, la principal configuración necesaria es la URL base del backend.

---

# Variables de entorno

## `BASE_URL`

La aplicación utiliza la variable:

```ts
BASE_URL;
```

Esta variable representa la URL base de la API REST utilizada por el frontend.

Ejemplo:

```ts
export const environment = {
  BASE_URL: 'http://localhost:3000/api',
};
```

A partir de esta URL se construyen las diferentes rutas utilizadas para realizar peticiones al backend.

Por ejemplo:

```text
http://localhost:3000/api/watches
```

o:

```text
http://localhost:3000/api/auth
```

dependiendo de los endpoints disponibles en el backend.

---

# Configuración de desarrollo

El archivo:

```text
src/environments/environment.development.ts
```

debe utilizarse para trabajar durante el desarrollo local.

Ejemplo:

```ts
export const environment = {
  BASE_URL: 'http://localhost:3000/api',
};
```

Esto supone que el backend está ejecutándose localmente en:

```text
http://localhost:3000
```

Por lo tanto, el frontend realizará las peticiones a:

```text
http://localhost:3000/api
```

El backend debe estar ejecutándose antes de utilizar funcionalidades que dependan de la API.

---

# Configuración de producción

El archivo:

```text
src/environments/environment.ts
```

se utiliza para la configuración de producción.

Ejemplo:

```ts
export const environment = {
  BASE_URL: 'https://tu-backend-produccion.com/api',
};
```

Si el proyecto utiliza un túnel de desarrollo para realizar pruebas externas, también podría configurarse temporalmente una URL como:

```ts
export const environment = {
  BASE_URL: 'https://tu-tunnel.example.com/api',
};
```

Sin embargo, una URL de Dev Tunnel o Ngrok no debe considerarse una URL permanente de producción, ya que puede dejar de estar disponible cuando el túnel se detenga o cambie.

Para un ambiente de producción real se recomienda utilizar una URL permanente del backend.

---

# Importante sobre los environments

Los archivos de environment pueden mantenerse en el repositorio siempre que no contengan información sensible.

Es correcto almacenar:

```ts
export const environment = {
  BASE_URL: 'https://mi-backend.com/api',
};
```

No se deben almacenar en estos archivos:

- Contraseñas
- API Keys privadas
- API Secrets
- JWT Secrets
- Tokens privados
- Credenciales de bases de datos

Cualquier información incluida en el frontend puede ser accesible para los usuarios finales después de compilar la aplicación.

Por esta razón, los environments del frontend deben contener únicamente información que pueda ser expuesta públicamente.

---

# Configuración del Backend

Para que la aplicación funcione correctamente, el backend debe estar ejecutándose.

El backend de Watches debe configurarse siguiendo las instrucciones de su propio archivo `README.md`.

De forma general, el flujo es:

```text
Frontend Angular
       |
       | HTTP Requests
       v
Backend Node.js / Express
       |
       v
PostgreSQL
```

El frontend no se conecta directamente a PostgreSQL.

Todas las operaciones relacionadas con usuarios, autenticación y productos se realizan mediante la API proporcionada por el backend.

---

# Ejecutar el Backend localmente

Antes de iniciar el frontend, asegúrate de que el backend esté ejecutándose.

El backend normalmente estará disponible en:

```text
http://localhost:3000
```

Por lo tanto, el environment de desarrollo debe apuntar a:

```ts
export const environment = {
  BASE_URL: 'http://localhost:3000/api',
};
```

El backend debe tener correctamente configurados:

- PostgreSQL
- Variables de entorno
- Cloudinary
- Servicio de correo
- JWT
- Prisma
- Docker, si el proyecto lo requiere

Consulta el README del backend para obtener instrucciones completas.

---

# Servidor de desarrollo

Para iniciar el servidor de desarrollo de Angular, ejecuta:

```bash
ng serve
```

También puedes utilizar:

```bash
npm start
```

si el script correspondiente está configurado en `package.json`.

Una vez iniciado el servidor, abre:

```text
http://localhost:4200/
```

La aplicación se actualizará automáticamente cuando se realicen cambios en los archivos del proyecto.

---

# Ejecutar el servidor en una red local

Si necesitas acceder al frontend desde otro dispositivo conectado a la misma red local, puedes iniciar Angular utilizando:

```bash
ng serve --host 0.0.0.0
```

Luego puedes acceder desde otro dispositivo utilizando la dirección IP local del equipo donde se ejecuta Angular.

Por ejemplo:

```text
http://192.168.1.100:4200
```

La dirección IP dependerá de la configuración de la red local.

---

# Exponer el Frontend a Internet

Para realizar pruebas externas, puedes utilizar herramientas como:

- Ngrok
- Visual Studio Dev Tunnels

Si utilizas un túnel, debes asegurarte de que:

1. El frontend esté ejecutándose.
2. El backend esté ejecutándose.
3. El frontend tenga configurada la URL pública del backend.
4. El backend permita mediante CORS el origen público del frontend.
5. El túnel del frontend esté activo.
6. El túnel del backend esté activo.

Por ejemplo:

```text
Frontend
https://frontend-tunnel.example.com

Backend
https://backend-tunnel.example.com
```

El frontend debe utilizar:

```ts
export const environment = {
  BASE_URL: 'https://backend-tunnel.example.com/api',
};
```

El backend debe permitir el origen del frontend mediante CORS:

```text
https://frontend-tunnel.example.com
```

Para pruebas locales:

```text
http://localhost:4200
```

es suficiente si el backend está configurado para aceptar dicho origen.

---

# CORS

Si el frontend y backend se ejecutan en diferentes dominios o puertos, el backend debe permitir el origen del frontend mediante CORS.

Por ejemplo:

```text
Frontend:
http://localhost:4200

Backend:
http://localhost:3000
```

El backend debe permitir:

```text
http://localhost:4200
```

Si se utiliza un túnel:

```text
Frontend:
https://frontend-tunnel.example.com

Backend:
https://backend-tunnel.example.com
```

El backend debe permitir:

```text
https://frontend-tunnel.example.com
```

Un error de CORS generalmente significa que el backend no está permitiendo el origen desde el cual se está realizando la petición.

---

# Compilación del proyecto

Para generar una compilación del proyecto, ejecuta:

```bash
ng build
```

Los archivos compilados se almacenarán normalmente dentro de:

```text
dist/
```

La compilación de producción optimiza los archivos para mejorar el rendimiento de la aplicación.

También puedes utilizar:

```bash
ng build --configuration production
```

El resultado generado puede utilizarse posteriormente para desplegar la aplicación en un servidor web o servicio de hosting compatible con aplicaciones frontend estáticas.

---

# Pruebas unitarias

Para ejecutar las pruebas unitarias configuradas en el proyecto:

```bash
ng test
```

El proyecto utiliza el sistema de pruebas configurado en Angular.

Si no existen pruebas unitarias implementadas, este comando puede no tener casos de prueba que ejecutar.

---

# Pruebas end-to-end

Para ejecutar pruebas end-to-end:

```bash
ng e2e
```

Angular no incluye obligatoriamente un framework de pruebas end-to-end.

Si el proyecto no tiene uno configurado, será necesario agregar una herramienta como:

- Playwright
- Cypress

antes de poder ejecutar pruebas E2E.

---

# Generación de componentes

Angular CLI permite generar nuevos componentes utilizando:

```bash
ng generate component component-name
```

También puede utilizarse la versión corta:

```bash
ng g c component-name
```

Ejemplo:

```bash
ng g c shared/components/loading-spinner
```

Para consultar todos los esquemas disponibles:

```bash
ng generate --help
```

---

# Estructura del proyecto

La estructura puede variar dependiendo de la evolución del proyecto, pero actualmente se recomienda mantener una organización similar a:

```text
src/
├── app/
│   ├── core/
│   ├── features/
│   ├── shared/
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/
│
├── environments/
│   ├── environment.ts
│   └── environment.development.ts
│
├── styles.css
└── index.html
```

## `core`

Contiene funcionalidades globales o fundamentales de la aplicación.

Por ejemplo:

- Guards
- Interceptors
- Servicios globales
- Configuraciones generales

---

## `features`

Contiene las funcionalidades principales de la aplicación organizadas por dominio.

Por ejemplo:

```text
features/
├── auth/
├── products/
├── watches/
└── password-reset/
```

La organización puede variar según las funcionalidades implementadas.

---

## `shared`

Contiene elementos reutilizables en diferentes partes de la aplicación.

Por ejemplo:

```text
shared/
├── components/
├── services/
├── pipes/
└── directives/
```

Los componentes que puedan reutilizarse en múltiples funcionalidades deben colocarse preferentemente dentro de esta sección.

---

## `environments`

Contiene la configuración específica para cada ambiente.

```text
environments/
├── environment.ts
└── environment.development.ts
```

---

# Flujo para nuevos desarrolladores

Después de clonar el proyecto, ejecutar:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

Instalar las dependencias:

```bash
npm install
```

Configurar el environment de desarrollo:

```text
src/environments/environment.development.ts
```

Verificar que la URL del backend sea correcta:

```ts
export const environment = {
  BASE_URL: 'http://localhost:3000/api',
};
```

Asegurarse de que el backend esté ejecutándose.

Iniciar el frontend:

```bash
ng serve
```

Abrir:

```text
http://localhost:4200/
```

El flujo completo debe ser:

```text
1. Clonar repositorio
        |
        v
2. npm install
        |
        v
3. Configurar environment.development.ts
        |
        v
4. Ejecutar Backend
        |
        v
5. Ejecutar ng serve
        |
        v
6. Abrir localhost:4200
```

---

# Scripts disponibles

Para consultar todos los scripts definidos en `package.json`:

```bash
npm run
```

Algunos comandos comunes son:

```bash
npm start
```

```bash
npm run build
```

```bash
npm test
```

Los scripts disponibles pueden variar según la configuración actual del proyecto.

---

# Despliegue

Para desplegar el frontend se debe generar primero una compilación de producción:

```bash
ng build --configuration production
```

Los archivos generados estarán dentro de:

```text
dist/
```

Estos archivos pueden desplegarse en servicios de hosting para aplicaciones frontend estáticas.

Algunas opciones son:

- Firebase Hosting
- Vercel
- Netlify
- GitHub Pages
- Servidores web propios

Antes de desplegar, asegúrate de que:

1. El backend esté disponible públicamente.
2. `environment.ts` utilice la URL correcta del backend.
3. El backend permita el dominio del frontend mediante CORS.
4. Las rutas de Angular estén correctamente configuradas para el hosting utilizado.

---

# Seguridad

No almacenes información sensible dentro del código del frontend.

Nunca coloques en:

```text
environment.ts
```

o:

```text
environment.development.ts
```

información como:

- Contraseñas
- Secretos JWT
- API Secrets
- Credenciales de bases de datos
- Tokens privados
- Claves privadas

El frontend es una aplicación que se ejecuta en el navegador del usuario. Por lo tanto, cualquier valor incluido en el código compilado puede potencialmente ser inspeccionado.

Las credenciales sensibles deben permanecer exclusivamente en el backend.

---

# Consideraciones para el desarrollo

Al realizar cambios en el proyecto:

1. Mantener la separación entre funcionalidades.
2. Reutilizar componentes cuando sea posible.
3. Evitar duplicar lógica entre componentes.
4. Mantener los servicios responsables de la comunicación con la API.
5. Mantener la lógica de presentación dentro de los componentes.
6. No colocar credenciales sensibles en el frontend.
7. Actualizar la documentación cuando se agreguen nuevas configuraciones.
8. Verificar que los cambios funcionen tanto en desarrollo como en producción cuando corresponda.

---

# Comandos principales

Instalar dependencias:

```bash
npm install
```

Iniciar servidor de desarrollo:

```bash
ng serve
```

Iniciar servidor accesible desde la red local:

```bash
ng serve --host 0.0.0.0
```

Compilar el proyecto:

```bash
ng build
```

Compilar para producción:

```bash
ng build --configuration production
```

Ejecutar pruebas:

```bash
ng test
```

Ejecutar pruebas E2E:

```bash
ng e2e
```

Generar un componente:

```bash
ng generate component component-name
```

Ver todos los comandos disponibles:

```bash
ng generate --help
```

---

# Recursos adicionales

Para consultar la documentación oficial de Angular:

https://angular.dev/

Para consultar la documentación de Angular CLI:

https://angular.dev/tools/cli

Para consultar la documentación de Tailwind CSS:

https://tailwindcss.com/

Para consultar la documentación de DaisyUI:

https://daisyui.com/

---

# Resumen

Este proyecto representa el frontend de la aplicación Watches.

Para comenzar a trabajar:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
npm install
ng serve
```

El frontend estará disponible en:

```text
http://localhost:4200/
```

Para que la aplicación funcione correctamente, el backend también debe estar ejecutándose y la variable `BASE_URL` del environment correspondiente debe apuntar a la URL correcta de la API.
