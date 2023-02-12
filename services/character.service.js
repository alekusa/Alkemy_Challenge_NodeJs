import { json, Op } from 'sequelize'
import Character from '../models/character.model.js'
import Img from '../models/img.model.js'
import Movie from '../models/movie.model.js'
import { deleteImg, uploadImg } from '../libs/cloudinary.js'
import fs from 'fs-extra'
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
    async addCharacrter(object, file) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return json('you did not enter data')
        }
        const movie = []
        if (file) {
            const imgClud = await uploadImg(file.img.tempFilePath)
            await fs.remove(file.img.tempFilePath)
            const imgEndb = await Img.create(imgClud)
            object.img = imgEndb.id
        }
        if (object) {
            const newCharacter = await Character.create(object)
            if (object.movie) {
                const moviesString = object.movie.split(', ')
                for (let i = 0; i < moviesString.length; i++) {
                    const oneMovie = await Movie.findOne({
                        where: { title: moviesString[i] }
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
            const imgdeCharacter = await Img.findByPk(existCharacter.img)
            if (imgdeCharacter) {
                await deleteImg(imgdeCharacter.public_id)
                await Img.destroy({ where: { id: imgdeCharacter.id } })
            }
            await Character.destroy({ where: id })
            return json(`Character ${existCharacter.name} deleted`)
        } else {
            return json('The Character does not exist')
        }
    }
}
export default characterService
