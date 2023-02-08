import { Op } from 'sequelize'
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
            if (order === 'ascendiente') {
                orderBy.push(['createdAt', 'ASC'])
            } else {
                orderBy.push(['createdAt', 'DESC'])
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
            attributes: ['title', 'img', 'createdAt']
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
                    attributes: ['name']
                }
            ],
            attributes: ['title', 'img', 'creationData', 'calification']
        })
    }
}

export default movieServices
