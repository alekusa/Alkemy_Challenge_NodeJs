import { Router } from 'express'
import {
    addCharacter,
    characterList,
    detailCharacters,
    findToCharacters
} from '../controllers/character.controlle.js'
const router = Router()

router.get('/characters', characterList)
router.get('/character/:id', detailCharacters)
router.get('/character', findToCharacters)
router.post('/character', addCharacter)

export default router
