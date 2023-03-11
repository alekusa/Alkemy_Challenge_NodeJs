//Comentario prueva GitHub
//* git:https://github.com
//*
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

router.get('/characters', characterList) //*elimine el veryfyToken para pruebas de la app Flutter
router.get('/character/:id', veryfyToken, detailCharacters)
router.get('/character', findToCharacters) //* Eliminado para pruebas con Flutter veryfyToken,
router.post('/character', [veryfyToken, isAdmin], addCharacter)
router.put('/character/:id', [veryfyToken, isAdmin], updateCharacter)
router.delete('/character/:id', [veryfyToken, isAdmin], deleteCharacter)

export default router
