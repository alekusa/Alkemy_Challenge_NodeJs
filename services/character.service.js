import { Op } from 'sequelize'
import Character from '../models/character.model.js'
import Img from '../models/img.model.js'
import Movie from '../models/movie.model.js'
import { deleteImg, uploadImg } from '../libs/cloudinary.js'
import fs from 'fs-extra'
import Genre from '../models/genre.model.js'
import Type from '../models/type.model.js'
import { response } from 'express'
class characterService {
    //* GET a List of Characters *//
    async characterList() {
        const result = await Character.findAll({
            attributes: ['name'],
            include: Img
        })
        //response.status(200)
        return result
    }
    //* GET details for characters **/
    async detailCharacters(id) {
        const result = await Character.findOne({
            where: id,
            include: [
                {
                    model: Movie,
                    as: 'movies',
                    through: { attributes: [] },
                    include: [Genre, Type]
                },
                { model: Img }
            ]
        })
        if (result) {
            response.status(200)
            return result
        }
        response.status(500)
        return { Error: 'the Character does not exist' }
    }
    //* SEARCH Character by name, age, weigth *//
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
                return { Eroor: `${name} does not exist` }
            }
        }
        if (age) {
            const exist = await Character.findOne({ where: { age } })
            if (exist) {
                queryToFind.age = age
            } else {
                return { Error: `No character is ${age} years old` }
            }
        }
        if (weigth) {
            const exist = await Character.findOne({ where: { weigth } })
            if (exist) {
                queryToFind.weigth = weigth
            } else {
                return { Error: `there is no character with ${weigth} kg` }
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
                    where: searchMovie,
                    through: { attributes: [] },
                    include: [Genre, Type]
                },
                {
                    model: Img
                }
            ]
        })
    }
    //* CREATED Character *//
    async addCharacrter(object, file) {
        //! CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            return { Error: 'you did not enter data' }
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
    //* UPDATE Character and images Cloud and db *//
    async updateCharacter(object, id, file) {
        //! CREAR UN MIDDELWARE //
        if (JSON.stringify(object) == '{}') {
            return { Error: 'you did not enter data' }
        }
        //! FIN MIDDLEWARE //
        const movie = []
        const existCharacter = await Character.findByPk(id.id)
        if (existCharacter) {
            if (file) {
                const imgdeCharacter = await Img.findByPk(existCharacter.img)
                if (imgdeCharacter) {
                    await deleteImg(imgdeCharacter.public_id) //deleted from the cloudinary
                    await Img.destroy({ where: { id: imgdeCharacter.id } }) //deleted from the DB
                }
                const newImg = await uploadImg(file.img.tempFilePath) // upload on the cloudinary
                const newImgDB = await Img.create(newImg)
                object.img = newImgDB.id
            }
        }
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
    //* DELETED Characters and Images cloud and db *//
    async deletedCharacter(id) {
        const existCharacter = await Character.findByPk(id.id)
        if (existCharacter) {
            const imgdeCharacter = await Img.findByPk(existCharacter.img)
            if (imgdeCharacter) {
                await deleteImg(imgdeCharacter.public_id)
                await Img.destroy({ where: { id: imgdeCharacter.id } })
            }
            await Character.destroy({ where: id })
            return { Error: `Character ${existCharacter.name} deleted` }
        } else {
            return { Error: 'The Character does not exist' }
        }
    }
}
export default characterService
