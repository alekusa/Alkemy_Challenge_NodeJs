//Comentario prueva GitHub
import { Router } from 'express'
import {
    addCharacter,
    characterList,
    deleteCharacter,
    detailCharacters,
    findToCharacters,
    updateCharacter
} from '../controllers/character.controlle.js'
import { isAdmin, veryfyToken } from '../middleware/auth.middleware.js'
const router = Router()

router.get('/characters', [veryfyToken], characterList)
router.get('/character/:id', veryfyToken, detailCharacters)
router.get('/character', veryfyToken, findToCharacters)
router.post('/character', [veryfyToken, isAdmin], addCharacter)
router.put('/character/:id', [veryfyToken, isAdmin], updateCharacter)
router.delete('/character/:id', [veryfyToken, isAdmin], deleteCharacter)

export default router
