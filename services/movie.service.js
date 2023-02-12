import { Op } from 'sequelize'
import Character from '../models/character.model.js'
import Genre from '../models/genre.model.js'
import Movie from '../models/movie.model.js'
import Type from '../models/type.model.js'

class movieServices {
    //* BUSQUEDA DE PELICULAS POR GENERO O TITULO, ORDENADAS ASCENDIENTE O DESCENDIENTE. RESULTADO CON SUS ACTORES RESPECTIVOS
    async getAllMovies(query) {
        const { title, genre, order } = query
        let queryToFind = {}
        let orderBy = []
        if (title) {
            queryToFind.title = { [Op.like]: `%${title}%` }
        }
        if (genre) {
            const genrefind = await Genre.findOne({ where: { name: genre } })
            queryToFind.genre = genrefind.id
        }
        if (order) {
            if (order === 'desc') {
                orderBy.push(['createdAt', 'DESC'])
            } else {
                orderBy.push(['createdAt', 'ASC'])
            }
        }

        return await Movie.findAll({
            where: queryToFind,
            attributes: ['title', 'img', 'creationData', 'calification'],
            include: [
                {
                    model: Genre,
                    attributes: ['name']
                },
                {
                    model: Type,
                    attributes: ['description']
                }
            ],
            order: orderBy
        })
    }
    //* LISTADO DE PELICULAS ATRIBUTOS (TITULO, IMAGEN, FECHA DE CREACION) *//
    async getMoviesList() {
        return await Movie.findAll({
            attributes: ['title', 'img', 'creationData']
        })
    }
    //* DETALLE DE UNA PELICULA CON SUS ACTORES *//
    async getMovie(id) {
        return await Movie.findOne({
            where: id,
            include: [
                { model: Type, attributes: ['description'] },
                { model: Genre, attributes: ['name'] },
                {
                    model: Character,
                    as: 'characters',
                    through: { attributes: [] }
                }
            ]
        })
    }
    //* No requerido en Alkemy,. *//
    async getMovieDetail(id) {
        return await Movie.findOne({
            where: id,
            include: [
                { model: Type, attributes: ['description'] },
                { model: Genre, attributes: ['name'] },
                {
                    model: Character,
                    as: 'characters',
                    attributes: ['name', 'img'],
                    through: { attributes: [] }
                }
            ],
            attributes: ['title', 'img', 'creationData', 'calification']
        })
    }
    //* CREANDO NUEVA PELICULA *//
    async addMovie(object) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return { Error: 'you did not enter data' }
        }
        if (object) {
            const { genre, type } = object
            const characters = []
            const chars = object.characters
            if (chars) {
                for (let i = 0; i < chars.length; i++) {
                    const oneCharacter = await Character.findOne({
                        where: { name: chars[i] }
                    })
                    characters.push(oneCharacter)
                }
            }
            const newMovie = Movie.build(object)
            if (genre) {
                const objectGenre = await Genre.findOne({
                    where: { name: genre }
                })
                if (objectGenre) {
                    newMovie.genre = objectGenre.id
                } else {
                    newMovie.genre = 1
                    console.log(
                        'the Genre does not exist, set genre default (Accion)'
                    )
                }
            } else {
                newMovie.genre = 1
                console.log(
                    'the Genre does not exist, set genre default (Accion)'
                )
            }
            if (type) {
                const objectTypo = await Type.findOne({
                    where: { description: type }
                })
                if (objectTypo) {
                    newMovie.type = objectTypo.id
                } else {
                    newMovie.type = 1
                    console.log(
                        'the type does not exist, set type default (Pelicula)'
                    )
                }
            } else {
                newMovie.type = 1
                console.log(
                    'the type does not exist, set type default (Pelicula)'
                )
            }
            await newMovie.save()
            await newMovie.addCharacters(characters)
            return newMovie
        }
    }
    //* ACTUALIZANDO UNA PELICULA - INCLUYENDO SUS ACTORES*//
    async updateMovie(object, id) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return { Error: 'you did not enter data' }
        }
        const movie = {}
        const characters = []
        const deleteCharacters = []
        const character = object.characters
        const deleteCharacter = object.deleteCharacters
        if (character) {
            for (let i = 0; i < character.length; i++) {
                const oneCharacter = await Character.findOne({
                    where: { name: character[i] }
                })
                characters.push(oneCharacter)
            }
        }
        if (deleteCharacter) {
            for (let i = 0; i < deleteCharacter.length; i++) {
                const oneCharacterDelete = await Character.findOne({
                    where: { name: deleteCharacter[i] }
                })
                deleteCharacters.push(oneCharacterDelete)
            }
        }
        if (object.title) {
            movie.title = object.title
        }
        if (object.img) {
            movie.img = object.img
        }
        if (object.creationData) {
            movie.creationData = object.creationData
        }
        if (object.calification) {
            movie.calification = object.calification
        }

        if (object.genre) {
            const objectGenre = await Genre.findOne({
                where: { name: object.genre }
            })
            if (objectGenre) {
                movie.genre = objectGenre.id
            }
        }
        if (object.type) {
            const objectTypo = await Type.findOne({
                where: { description: object.type }
            })
            if (objectTypo) {
                movie.type = objectTypo.id
            }
        }
        await Movie.update(movie, {
            where: id
        })
        const updateMovie = await Movie.findByPk(id.id)
        await updateMovie.addCharacters(characters)
        await updateMovie.removeCharacters(deleteCharacters)
        return updateMovie
    }
    //* BORRANDO UNA PELICULA *//
    async deletedMovie(id) {
        const existMovie = await Movie.findByPk(id)
        if (existMovie) {
            await Movie.destroy({ where: { id } })
            return { Error: `Movie ${existMovie.title} deleted` }
        } else {
            return { Error: 'the Movie does not exist' }
        }
    }
}

export default movieServices
