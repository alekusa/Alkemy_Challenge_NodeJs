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
            include: [{ model: Img, attributes: ['secure_url'] }]
        })
        if (result) {
            response.status(200)
            return result
        } else {
            response.status(204) //No Content / Sin Contenido
            return { Error: 'No data Stored' }
        }
    }
    //* GET details for characters **/
    async detailCharacters(id) {
        //TODO CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            response.status(400) //Bad Request / Mala peticion
            return { Error: 'you did not enter data' }
        }
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
        response.status(404) //The requested resource was not found / No se encontró el recurso solicitado
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
        const result = await Character.findAll({
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

        response.status(200)
        return result
    }
    //* CREATED Character *//
    async addCharacrter(object, file) {
        //TODO CREAR UN MIDDELWARE
        if (JSON.stringify(object) == '{}') {
            response.status(400)
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
            response.status(201)
            return newCharacter
        } else {
            response.status(500)
            return { Error: 'The data is wrong' }
        }
    }
    //* UPDATE Character and images Cloud and db *//
    async updateCharacter(object, id, file) {
        //TODO CREAR UN MIDDELWARE //
        if (JSON.stringify(object) == '{}') {
            response.status(400)
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
                const newImgDB = await Img.create(newImg) //solo va a cargar los datos que coincida con las columnas de la db
                object.img = newImgDB.id //cargo la id al objeto para luego actualizar
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
            response.status(200)
            return updateCharacter
        } else {
            response.status(400)
            return { Error: 'the Character does not exist' }
        }
    }
    //* DELETED Characters and Images cloud and db *//
    async deletedCharacter(id) {
        //TODO CREAR UN MIDDELWARE //
        if (JSON.stringify(object) == '{}') {
            response.status(400)
            return { Error: 'you did not enter data' }
        }
        //! FIN MIDDLEWARE //
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
