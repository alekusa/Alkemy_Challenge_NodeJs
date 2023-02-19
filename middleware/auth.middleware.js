import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { token } from '../config/config.js'
export const veryfyToken = async (req, res, next) => {
    try {
        const token = req.headers['acces-token']
        if (!token)
            return res
                .status(403)
                .json({ 'Error Message': 'No token provider' })
        //BUG colocar palabraSecreta en Archivo .enc
        const decoder = jwt.verify(token, token)
        req.userId = decoder.id
        next()
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}
export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId)
        if (user.role === 'admin') {
            next()
            return
        } else {
            res.status(200).json({
                Error: `El Usuario ${user.username} no es Administrador`
            })
            return
        }
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}
