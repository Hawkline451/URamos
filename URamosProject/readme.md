# Backend URamos
_Esta es la capa que se encarga del procesamiento y guardado de los datos. Esta diseñada usando el Framework Django_

# Estructura Basica
<pre>
|-- URamosProject
|   |-- URamosProject
|   |   |-- settings.py
|   |   |-- urls.py
|   |   |-- wsgi.py
|   |-- comments
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- log
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- serializers.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- login
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- serializers.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- moderator
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- naturalUser
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- serializers.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- subject
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- teacher
|   |   |-- admin.py
|   |   |-- apps.py
|   |   |-- models.py
|   |   |-- tests.py
|   |   |-- urls.py
|   |   |-- views.py
|   |-- manage.py
|   |-- requirements.txt
|   |-- script.py
|   |-- cursosTest1.py
|   |-- cursosTest2.py
|   |-- readme.md
</pre>

El proyecto principal se encuentra en la carpeta URamosProject, que contiene las configuraciones globales del proyecto en ```settings.py```, las urls por defecto que mappeara django desde los request estarán en el archivo ```urls.py```.

Ademas se generan app's (log, login, teacher, etc.) en sus carpetas respectivas. Cada una de estas tendrá consigo:
* urls.py : Archivo que contiene las rutas y conexiones con las funciones respuestas.
* views.py : Archivo que contiene la lógica de respuestas a las peticiones.
* models.py : Archivo que contiene las clases que representan los objetos que el ORM de django mappeara y guardara en la base de datos.
* serializers.py: Archivo que se encarga de convertir los modelos a objetos JSON (no todas las aplicaciones poseen serializers).

## Pre-requisitos del proyecto
Para la correcta ejecución de este proyecto se requiere python 3 y pip. 
Luego de esto, instalar las librerias de python necesarias:
``` pip install -r requirements.txt ```

## Cargar cursos a base de datos
Debido a que la plataforma utiliza una lista de ramos de la FCFM, es ncesario cargar los ramos antes de poder usarla.
El archivo ```script.py``` crea un json para luego exportarlo a la base de datos, hay que ejecutar lo siguiente:
``` python script.py ```
Luego hacer las migraciones de python:
``` python manage.py makemigrations```
``` python manage.py migrate --run-syncdb```
Luego cargar el archivo creado a la base de datos
``` python manage.py loaddata ParserCursos.json ```

## Finalizar
Ahora el proyecto se encuentra listo para ser usado, se puede correr para probarlo de la siguiente manera:

``` python manage.py runserver```







