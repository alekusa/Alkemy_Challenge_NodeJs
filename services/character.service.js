import { json, Op } from 'sequelize'
import Character from '../models/character.model.js'
import Movie from '../models/movie.model.js'

class characterService {
    async characterList() {
        return await Character.findAll({
            attributes: ['img', 'name']
        })
    }
    async detailCharacters(id) {
        return await Character.findAll({
            where: id,
            include: [
                {
                    model: Movie,
                    as: 'movies',
                    through: { attributes: [] }
                }
            ]
        })
    }
    async findCharacter(query) {
        const { name, age, weigth } = query
        let queryToFind = {}
        let searchMovie = {}
        if (name) {
            const search = { [Op.like]: `%${name}%` }
            const exist = await Character.findOne({ where: { name: search } })
            if (exist) {
                queryToFind.name = search
            } else {
                return json(`${name} does not exist`)
            }
        }
        if (age) {
            const exist = await Character.findOne({ where: { age } })
            if (exist) {
                queryToFind.age = age
            } else {
                return json(`No character is ${age} years old`)
            }
        }
        if (weigth) {
            const exist = await Character.findOne({ where: { weigth } })
            if (exist) {
                queryToFind.weigth = weigth
            } else {
                return json(`there is no character with ${weigth} kg`)
            }
        }
        if (query.movie) {
            searchMovie = { title: { [Op.like]: `%${query.movie}%` } }
        }
        return await Character.findAll({
            where: queryToFind,
            include: [
                {
                    model: Movie,
                    as: 'movies',
                    where: searchMovie
                }
            ]
        })
    }
    async addCharacrter(object) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return json('you did not enter data')
        }
        const movie = []
        if (object) {
            const newCharacter = await Character.create(object)
            if (object.movie) {
                for (let i = 0; i < object.movie.length; i++) {
                    const oneMovie = await Movie.findOne({
                        where: { title: object.movie[i] }
                    })
                    movie.push(oneMovie)
                }
                await newCharacter.addMovies(movie)
            }
            return newCharacter
        }
    }
    async updateCharacter(object, id) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return json('you did not enter data')
        }
        const movie = []
        if (object.addMovie) {
            for (let i = 0; i < object.addMovie.length; i++) {
                const oneMovie = await Movie.findOne({
                    where: { title: object.addMovie[i] }
                })
                movie.push(oneMovie)
            }
        }
        await Character.update(object, {
            where: id
        })
        const updateCharacter = await Character.findByPk(id.id)
        await updateCharacter.addMovies(movie)
        return updateCharacter
    }
    async deletedCharacter(id) {
        const existCharacter = await Character.findByPk(id.id)
        if (existCharacter) {
            await Character.destroy({ where: id })
            return json(`Character ${existCharacter.name} deleted`)
        } else {
            return json('The Character does not exist')
        }
    }
}
export default characterService
