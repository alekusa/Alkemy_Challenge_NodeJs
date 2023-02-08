import { json, Op } from 'sequelize'
import Character from '../models/character.model.js'
import Genre from '../models/genre.model.js'
import Movie from '../models/movie.model.js'
import Type from '../models/type.model.js'

class movieServices {
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
    async getMoviesList() {
        return await Movie.findAll({
            attributes: ['title', 'img', 'creationData']
        })
    }
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
    async addMovie(object) {
        const { genre, type } = object
        const chars = object.characters
        const characters = []
        for (let i = 0; i < chars.length; i++) {
            const oneCharacter = await Character.findOne({
                where: { name: chars[i] }
            })
            characters.push(oneCharacter)
        }
        const newMovie = Movie.build(object)
        if (genre) {
            const objectGenre = await Genre.findOne({ where: { name: genre } })
            newMovie.genre = objectGenre.id
        } else {
            newMovie.genre = 1
            json({
                Error: 'the Genre does not exist, set genre default (Accion)'
            })
        }
        if (type) {
            const objectTypo = await Type.findOne({
                where: { description: type }
            })
            newMovie.type = objectTypo.id
        } else {
            newMovie.type = 1
            json({
                Error: 'the type does not exist, set type default (Pelicula)'
            })
        }
        await newMovie.save()
        await newMovie.addCharacters(characters)
        return newMovie
    }
}

export default movieServices
