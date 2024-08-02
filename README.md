# Proyecto final: Web de social para compartir información sobre videojuegos - BACK.

El objetivo ha sido crear un servidor capaz de responder a las necesidades de uso de las peticiones. Estas se pueden resumir en cuatro categorias: 
- Juegos (games).
- Entradas (posts).
- Usuarios (users).
- Likes.

## Índice

  - [Funcionamiento](#funcionamiento)
  - [Endpoints](#endpoints)

## Funcionamiento

El servidor es capaz de recibir peticiones con o sin parametros, los cuales de tenerlos podra valorarlos, sean parte de una query, parametros puros o parte del body. Si cumple con estos validadores la petición podra proseguir con su camino dentro del servidor para tomar, crear, modificar o borrar las entradas en la base de datos, así como responder según corresponda al front end.

Para la correcta gestión de estas solicitudes se hace uso de las rutas, software intermediario, validadores y controladores.
- Las rutas controlan el direccionamiento de las peticiones dentro del servidor.
- El software intermediario (middleware) controla el resultado de las validaciones así como el logeo del usuario y el control de errores en las peticiones a la base de datos (DB).
- Los validadores comprueban los campos recibidos por el back y así verificar que se corresponden con los parametros esperados antes de dejar proseguír la petición.
- Los controladores contienen las funciones para cada una de las tareas los distintos end points.

## Endpoints

Las rutas para las peticiones respecto a videojuegos:
- `GET /filter` : Devuelve la lista de videojuegos según paginado y filtros recibidos por query params según contenga en la BD.
- `GET /` : Devuelve un listado con todos los juegos en la BD.
- `GET /:id` : Devuelve un juego de la BD por su ID recibido en los params de la URL.
- `GET /tittle/:tittle` : Devuelve el juego de la BD según coincidencia del titulo recibido por param en la URL.
- `PUT /:id` : Edita un juego respecto a su ID en la BD según los parametros recibidos por el body.
- `POST /create` : Crea un nuevo juego en la BD según los parametros recibidos por el body.
- `DELETE /:id` : Borra la entrada de un juego de la BD respecto al ID del juego.

Las rutas para las peticiones respecto a entradas de videojuegos:
- `GET /filter` : Devuelve la lista de entradas según paginado y filtros recibidos por query params según contenga en la BD.
- `GET /:id` : Devuelve una entrada de la BD por su ID recibido en los params de la URL.
- `GET /game/:id` : Devuelve la entrada de la BD según coincidencia del ID respecto a un ID de videojuego.
- `PUT /:id` : Edita un juego respecto a su ID en la BD según los parametros recibidos por el body.
- `POST /create` : Crea una nueva entrada en la BD según los parametros recibidos por el body.
- `DELETE /:id` : Borra una entrada de la BD respecto al ID de la entrada.

Las rutas para las peticiones respecto a los usuarios:
- `GET /` : Devuelve un listado con todos los usuarios en la BD.
- `GET /:id` : Devuelve un usuario de la BD por su ID recibido en los params de la URL.
- `POST /login` : Controla el logeo del usuario según parametros recibidos por body y devuelve un jwt si corresponde.
- `PUT /:id` : Edita un usuario respecto a su ID en la BD según los parametros recibidos por el body.
- `DELETE /:id` : Borra la entrada de un usuario de la BD respecto al ID del juego.
- `POST /register` : Crea un nuevo usuario en la BD según los parametros recibidos por el body.

Las rutas para las peticiones respecto a los likes:
- `GET /` : Devuelve un listado con todos los likes en la BD.
- `POST /` : Crea un nuevo registro de likes en la BD según los parametros recibidos por el body.