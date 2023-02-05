import { Router } from 'express'
import {
    addUser,
    deleteUser,
    getUser,
    getUsers,
    signUp,
    singIn,
    updateUser
} from '../controllers/user.controller.js'
import { isAdmin, veryfyToken } from '../middleware/auth.middleware.js'
const router = Router()

router.get('/user', [veryfyToken, isAdmin], getUsers)
router.post('/user', [veryfyToken, isAdmin], addUser)
router.put('/user/:id', [veryfyToken, isAdmin], updateUser)
router.delete('/user/:id', [veryfyToken, isAdmin], deleteUser)
router.get('/user/:id', [veryfyToken, isAdmin], getUser)
router.post('/signup', signUp)
router.post('/signin', singIn)

export default router
