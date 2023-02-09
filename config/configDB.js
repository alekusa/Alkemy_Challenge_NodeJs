//* MODELS *//
import User from '../models/user.model.js'
import Character from '../models/character.model.js'
import Movie from '../models/movie.model.js'
import Genre from '../models/genre.model.js'
import Type from '../models/type.model.js'
//* SERVICES *//
import serviceEncryption from '../services/encryption.service.js'
const servCrypt = new serviceEncryption()
import db_Conect from '../db/sqlite.js'
//* Creating the keys *//
//* Generando las claves Foraneas *//
Character.belongsToMany(Movie, {
    as: 'movies',
    through: 'CharactersMovies'
})
Movie.belongsToMany(Character, {
    as: 'characters',
    through: 'CharactersMovies'
})
Movie.belongsTo(Genre, { foreignKey: 'genre' })
Movie.belongsTo(Type, { foreignKey: 'type' })
//* Funcion para cargar datos segun estado true/false en .env
//* Function to load data depending on the true/false state in .env
const db_Configuration = async (option = {}) => {
    try {
        if (option.data === 'true') {
            //* Loading Data *//
            DataLoadUsers()
        } else {
            return
        }
    } catch (error) {
        console.log('Problems Conection database ' + error)
    }
}

//* Loader data - Cargando datos a las tablas*//
const DataLoadUsers = async () => {
    await db_Conect.sync({ force: true })
    await User.bulkCreate([
        {
            username: 'Alexis Kuseman',
            password: await servCrypt.encryptPassword('password'),
            email: 'alekusa@gmail.com',
            role: 'admin'
        },
        {
            username: 'Jose pequerman',
            password: await servCrypt.encryptPassword('password'),
            email: 'josePequerman@gmail.com',
            role: 'user'
        },
        {
            username: 'David Aliases',
            password: await servCrypt.encryptPassword('password'),
            email: 'davidaliaces@gmail.com',
            role: 'user'
        },
        {
            username: 'Mario Estefano',
            password: await servCrypt.encryptPassword('password'),
            email: 'marioestefano@gmail.com',
            role: 'user'
        },
        {
            username: 'Rojelio Gonzalez',
            password: await servCrypt.encryptPassword('password'),
            email: 'rojeliogonzalez@gmail.com',
            role: 'user'
        }
    ])
    const char = await Character.bulkCreate([
        {
            img: 'https://los40es00.epimg.net/los40/imagenes/2021/07/01/bigbang/1625165791_416626_1625166043_miniatura_normal.jpg',
            name: 'Robert Downey',
            age: 41,
            weigth: 78,
            history:
                'Al inicio de su carrera, en la década de los años 80, se consolidó como uno de los actores más sobresalientes, sin embargo, todo cambió cuando en 1996 fue arrestado por posesión de drogas, armas y por causas disturbios en la vía pública.'
        },
        {
            img: 'https://i.pinimg.com/originals/59/3a/88/593a88454de89df4ea0f73d7878c6c85.jpg',
            name: 'Tobey Maguire',
            age: 40,
            weigth: 108.5,
            history:
                'Tobey Maguire es un actor nacido el 27 de junio de 1975 en Santa Mónica, California, Estados Unidos.'
        },
        {
            img: 'https://img.wprost.pl/img/justin-timberlake/59/e4/0993570a6c7c31d36eba8fd6e482.jpeg',
            name: 'justin Timberlake',
            age: 34,
            weigth: 83,
            history:
                'Timberlake and Spears, 38, arrived at the 2001 awards show in coordinated head-to-toe denim outfits, which would become one of the most talked-about fashion moments of the early 2000s.'
        },
        {
            img: 'https://es.web.img3.acsta.net/c_310_420/pictures/17/05/24/16/09/445676.jpg',
            name: 'Ben Stiller',
            age: 44,
            weigth: 75,
            history:
                'Después de estudiar en la sección de cine de Ucla, Ben Stiller comienza su carrera como actor en 1985. Aparece en la comedia ‘Persecución muy, muy caliente’ (1987) y en ‘El imperio del sol’ (1987), de Steven Spielberg. Rueda el cortometraje ‘The hustler of money’, una parodia de la película de Martin Scorsese ‘El color del dinero’.'
        }
    ])
    const genre = await Genre.bulkCreate([
        {
            name: 'accion',
            img: 'https://i.ytimg.com/vi/ApX2e9kchC4/maxresdefault.jpg'
        },
        {
            name: 'drama',
            img: 'https://assets.afcdn.com/story/20160805/949656_w807h1200cx401cy608.jpg'
        },
        {
            name: 'comedia',
            img: 'https://i.ytimg.com/vi/xg0eNDIWYho/mqdefault.jpg'
        },
        {
            name: 'terror',
            img: 'https://ae01.alicdn.com/kf/Sef225ce7b47240508a4f19034336a1344/M-scara-de-grito.jpg_Q90.jpg_.webp'
        }
    ])
    //! VER DE CREAR UN ARRAY PELICULA / SERIE !//
    const type = await Type.bulkCreate([
        {
            description: 'pelicula'
        },
        {
            description: 'serie'
        }
    ])
    const movie = await Movie.bulkCreate([
        {
            img: 'https://phantom-marca.unidadeditorial.es/fc378f0edd2fa62521d030401fc5ce93/resize/414/f/jpg/assets/multimedia/imagenes/2022/08/21/16610668074092.jpg',
            title: 'La Casa Del Dragon',
            creationData: '20 ENE 23',
            calification: 5
        },
        {
            img: 'https://phantom-marca.unidadeditorial.es/fc378f0edd2fa62521d030401fc5ce93/resize/414/f/jpg/16610668074092.jpg',
            title: 'Game Of Trones',
            creationData: '24 ENE 18',
            calification: 4
        },
        {
            img: 'https://phantom-marca.unidadeditorial.es/',
            title: 'Forest Gump',
            creationData: '14 DIC 00',
            calification: 3
        },
        {
            img: 'https://16610668074092.jpg',
            title: 'La Caida del Alcon Negro',
            creationData: '2 MAR 15',
            calification: 2
        }
    ])

    //* Insertando datos en la tabla CaractersMovies (Actores que trabajan en las Peliculas)
    await char[0].addMovies([movie[0]])
    await char[1].addMovies([movie[0], movie[1], movie[2]])
    await char[2].addMovies([movie[0], movie[1], movie[2], movie[3]])
    await char[3].addMovies([movie[0], movie[1]])
    //* Agregando generos a las peliculas (Accion, Terror, Comedia, Drama )
    await movie[0].setGenre(genre[0])
    await movie[1].setGenre(genre[1])
    await movie[2].setGenre(genre[2])
    await movie[3].setGenre(genre[3])
    //* Agregando typos a las peliculas ( Pelicula / Serie)
    await movie[0].setType(type[0])
    await movie[1].setType(type[1])
    await movie[2].setType(type[1])
    await movie[3].setType(type[0])
}

export default db_Configuration
