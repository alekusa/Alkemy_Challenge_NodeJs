# Challenge Alkemi NodeJs

Api para el challenge de Alkemi.

## Librerias

-   [Sequelize](https://sequelize.org/)
-   [Express](https://expressjs.com/)
-   [sqlite3](https://www.npmjs.com/package/sqlite3)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## DB, Diseño de la Base de Datos

![Screenshot](db.png)

## API Reference Users

#### Registrarse para generar el token,

```http
  POST /auth/register
```
```json
{
  "username": "TuNombre",
  "email": "TuEmail@gmail.com",
  "password": "password",
  "role": "admin"
}
```

#### Loguearse si ya esta registrado

```http
  POST /auth/login
```
```json
{
  "email": "TuEmail@gmail.com",
  "password": "password"
}
```
#### Get User's

```http
  GET /user
```
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |


#### Get One User

```http
  GET /user/:id
```
### Id
/user/12
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |


#### Delete User

```http
  DELETE /user/:id
```
### Id
/user/12
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |

```http
  PUT /user/:id
```
### Id
/user/12
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |
```json
{
  "username": "NameUpdate",
  "email": "EmailUpdate@gmail.com",
  "password": "passwordUpdate",
  "role": "user"
}
```
## API Reference Characters
#### Get Character's

```http
  GET /characters
```
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |


#### Get One Character

```http
  GET /character/:id
```
### Id
/character/1
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |


#### Delete Chararter

```http
  DELETE /character/:id
```
### Id
/character/1
### Headers
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |

```http
  PUT /character/:id
```
### Id
/user/12
### **Headers**
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `acces-token` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc2OTIwMzk0fQ.XcppbNmZHrR9IsQ6SYeOgImd2PE3aUT2leehBhylyVU` | Generado en Login |
### **Form-data**
| KEY           | VALUE    | Description     |
| :-----------  | :------- | :-------------- |
| `name` | `nameCharacter` | type text       |
| `age`  | 35              | type integer    |
| `weigth`| 80             | type doube     |
| `history`|`History del character,, details`| type text |
| `img`  | file Upload     | type file    |


## Author

-   [@alekusa](https://www.github.com/alekusa)

## Deployment

Proyeto corriendo en Fly.io
instalar las dependecias con

```bash
  npm i
```

deploy en fli.io, con el nombre de limpio en (https://limpio.fly.dev/)

```bash
  fly deploy
```

## Environment Variables

las variables de entorno .env -> manejadas por el archivo de configuracion config/config.js

`NEW_INSTALL` -> en true para crear y rellenar las tablas

`PORT` -> establece el puerto para deploy y en local

`cloud_name` -> nombre de la nube CLOUDINARY. almacena las imagenes
`api_key` -> api key provista por cloudinary
´api_secret` -> api secret provista por cludinari
`token` -> "palabraSecreta"

## 🚀 About Me

Soy un programador developer desde 2008, mayormente backend.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexis-kuseman/)

## 🛠 Skills

Javascript, NodeJs, React-Native...

## Algunos Datos mas

👩‍💻 Me encuentro trabajndo para el Ejercito Argentino...

🧠 Me encuentro estudiando mas backend...

📫 Pueden escrivir en alekusa@gmail.com...

⚡️ Mi unidad de destino es el Batallon de Comunicaciones 141
