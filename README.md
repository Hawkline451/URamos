# URamos
_URamos es una plataforma que se desarolló para el curso CC5401 Ingenieria de Software II en Otoño 2018, bajo petición de
Nicolas Varas y Paulo Chacoff, pertenecientes del CEI del mismo año_
La plataforma consiste en que alumnas7os de la facultad puedan evaluar los ramos que han cursado a traves de notas y comentarios. 
De esta manera, se cree un lugar donde Profesores/as y alumnas/os puedan ver comentario y evaluaciones de los cursos de la facutad.

## Estructura General del Proyecto
_El proyecto esta separado principalmente en dos capas. Las capa de datos o Back-end y la capa de de presentación o Front-end, 
su contenido y documentación se encuentra en las carpetas **URamosProject** y **frontend** respectivamente_

## Construido en
_El proyecto fue hecho con los siguientes frameworks:_
* **Back-end** [Django](https://www.djangoproject.com/)
* **Front-end** [React](https://reactjs.org/)

## Deploy
_Debido que las capas de datos y presentación utilizan frameworks diferentes, el deploy esta explicado en el readme de cada carpeta_

## Configuracion en desarrollo
Cuando se mantuvo en desarrollo se usaba la url http://142.93.4.35/ donde el puerto 3000 correspondia a Django y el 8000 correspondia a React.

Para usar el puerto 3000 en django y probar la aplicacion en un servidor externo: 

```python manage.py runserver 0.0.0.0:3000```

Para ocupar el puerto 8000 en react, la configuración se encuentra en ```frontend/package.json``` solo hay que hacer:

```npm start```

Al montarlo en un servidor nuevo hay que darle al ADI la nueva URL de la aplicación de URamos, esta url es la base de Django mas ```auth``` y en ```URamosProject/login/views.py```  hay que cambiar el return de ```AuthView``` y poner la url que usará el frontend.

