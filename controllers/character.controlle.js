import characterService from '../services/character.service.js'
const serv = new characterService()

export const characterList = async (req, res) => {
    try {
        res.status(200).json(await serv.characterList())
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const detailCharacters = async (req, res) => {
    try {
        res.status(200).json(await serv.detailCharacters(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const findToCharacters = async (req, res) => {
    try {
        res.status(200).json(await serv.findCharacter(req.query))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
