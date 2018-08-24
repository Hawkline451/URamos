# Frontend URamos
_Esta es la capa que se encarga de la presentación de los datos. Esta diseñada usando el Framework React_

# Estructura Basica
<pre>
|-- frontend
|   |-- public
|   |   |-- favicon.ico
|   |   |-- index.html
|   |   |-- manifest.json
|   |-- src
|   |   |-- actions
|   |   |   |-- index.js
|   |   |-- components
|   |   |   |-- ActividadRecient
|   |   |   |-- Buscador
|   |   |   |-- Busqueda
|   |   |   |-- ButtonReload
|   |   |   |-- Comentario
|   |   |   |-- Cursos
|   |   |   |-- CursosEvaluar
|   |   |   |-- Evaluacion
|   |   |   |-- GraficosCursos
|   |   |   |-- GraficosProfe
|   |   |   |-- Login
|   |   |   |-- Moderador
|   |   |   |-- Profesores
|   |   |   |-- RadioButtons
|   |   |   |-- URamos-Bar
|   |   |-- reducers
|   |   |   |-- authStatus.js
|   |   |   |-- index.js
|   |   |   |-- jwtStatus.js
|   |   |   |-- normalUser.js
|   |   |   |-- user.js
|   |   |-- routes
|   |   |   |-- verificarLogin.js
|   |   |   |-- verificarModerador.js
|   |   |-- utils
|   |   |   |-- URamos-BarUtils.js
|   |   |-- static

|   |   |-- App.css
|   |   |-- App.js
|   |   |-- App.test.js
|   |   |-- index.css
|   |   |-- index.js
|   |   |-- logo.svg
|   |   |-- registerServiceWorker.js
|   |-- package-lock.json
|   |-- package.json
|   |-- readme.md
</pre>

La carpeta  ```src``` posee todo el contenido del proyecto. En ```public``` se encuentra el archivo HTML que se usa como template. Mientras que los archivos ```package.json``` y ```package-lock.json```son las configuraciones y las dependencias a instalar para el uso del proyecto.

La carpeta  ```src``` contiene los siguientes directorios:
*  ```actions```: Contiene las acciones que se pueden realizar con respecto al reductor del proyecto (REDUX).
*  ```components```: Posee los diferentes componentes de la aplicación.
*  ```reducers```: Contiene el reductor de las acciones (REDUX).
*  ```routes```: Contiene el comportamiento de ciertos componentes con respecto a los diferentes tipos de usuarios.

## Pre-requisitos del proyecto
Para la correcta instalacion de este proyecto se requiere tener instalado ```node``` y ```npm```.
Luego se deben instalar las dependencias, para esto hay que entrar en la carpeta ```frontend``` y ejecutar lo siguiente:

``` npm install ```


## Finalizar
Ahora el proyecto se encuentra listo para ser usado, se puede correr para probarlo de la siguiente manera:

``` npm start ```







