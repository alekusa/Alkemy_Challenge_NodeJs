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

## API Reference

#### Get all Users

```http
  GET /user
```

#### Add User

```http
  POST /user
```

| Parameter  | Type     | Description     |
| :--------- | :------- | :-------------- |
| `username` | `string` | Nombre Completo |
| `password` | `string` | 8 caracteres    |

#### Get One User

```http
  GET /user/:id
```

| Parameter | Type  | Description                 |
| :-------- | :---- | :-------------------------- |
| `id`      | `int` | **Required**.Id of the User |

#### Delete User

```http
  DELETE /user/:id
```

| Parameter | Type  | Description                 |
| :-------- | :---- | :-------------------------- |
| `id`      | `int` | **Required**.Id of the User |

## Author

-   [@alekusa](https://www.github.com/alekusa)

## Deployment

Proyeto corriendo en Fly.io
para ejecutarlo despues de instalar las dependecias con

```bash
  npm i
```

fue echo el deploy en fli.io

```bash
  fly deploy
```

## Environment Variables

las variables de entorno .env

`NEW_INSTALL` -> en true para crear y rellenar las tablas

`PORT` -> establece el puerto para deploy y en local

## 🚀 About Me

Soy un programador developer desde 2008, mayormente backend...

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexis-kuseman/)

## 🛠 Skills

Javascript, NodeJs, React-Native...

## Other Common Github Profile Sections

👩‍💻 Me encuentro trabajndo para el Ejercito Argentino...

🧠 Me encuentro estudiando mas backend...

💬 Ask me about...

📫 Pueden escrivir en alekusa@gmail.com...

⚡️ Batallon de Comunicaciones 141
