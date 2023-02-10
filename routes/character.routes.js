import { Router } from 'express'
import {
    addCharacter,
    characterList,
    deleteCharacter,
    detailCharacters,
    findToCharacters,
    updateCharacter
} from '../controllers/character.controlle.js'
const router = Router()

router.get('/characters', characterList)
router.get('/character/:id', detailCharacters)
router.get('/character', findToCharacters)
router.post('/character', addCharacter)
router.put('/character/:id', updateCharacter)
router.delete('/character/:id', deleteCharacter)

export default router
