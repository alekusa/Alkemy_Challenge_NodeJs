import characterService from '../services/character.service.js'
const serv = new characterService()
//import { uploadImg } from '../libs/cloudinary.js'

export const characterList = async (req, res) => {
    try {
        res.json(await serv.characterList())
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const detailCharacters = async (req, res) => {
    try {
        res.json(await serv.detailCharacters(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const findToCharacters = async (req, res) => {
    try {
        res.json(await serv.findCharacter(req.query))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const addCharacter = async (req, res) => {
    try {
        res.json(await serv.addCharacrter(req.body, req.files))
    } catch (error) {
        res.status(500).json({ messaje: error.message })
    }
}
export const updateCharacter = async (req, res) => {
    try {
        res.json(await serv.updateCharacter(req.body, req.params, req.files))
    } catch (error) {
        res.status(500).json({ messaje: error.message })
    }
}
export const deleteCharacter = async (req, res) => {
    try {
        res.json(await serv.deletedCharacter(req.params))
    } catch (error) {
        res.status(500).json({ messaje: error.message })
    }
}
