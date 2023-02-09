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
        console.log(name)
        let queryToFind = {}
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

        return await Character.findAll({
            where: queryToFind
        })
    }
}
export default characterService
