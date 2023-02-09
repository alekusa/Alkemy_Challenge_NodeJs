import { Router } from 'express'
import {
    characterList,
    detailCharacters,
    findToCharacters
} from '../controllers/character.controlle.js'
const router = Router()

router.get('/characters', characterList)
router.get('/character/:id', detailCharacters)
router.get('/character', findToCharacters)

export default router
