import { json, Op } from 'sequelize'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import serviceEncryption from './encryption.service.js'
const servCrypto = new serviceEncryption()

export const getUsersss = () => {
    return User.findAll()
}

class services {
    getUsers() {
        return User.findAll()
    }
    async setUser(object) {
        const newUser = User.build(object)
        await newUser.save()
        return newUser
    }
    async deleteUser(id) {
        const existeID = await User.findOne({ where: id })
        if (existeID) {
            await User.destroy({ where: id })
            return json(`Usuario ${existeID.username} eliminado`)
        } else {
            return json({ error: 'No existe el usuario' })
        }
    }
    getUser(id) {
        const uss = User.findOne({ where: id })
        if (!uss) {
            return json('No existe el Usuario')
        }
        return uss
    }
    async updateUser(id, object) {
        const findUser = await User.findOne({ where: id })
        if (findUser) {
            await User.update(object, { where: id })
            return User.findByPk(id.id)
        } else {
            return json('No existe el usuario')
        }
    }
    async signUp(object) {
        const { username, password, email, rol } = object
        const existMail = await User.findOne({ where: { email } })
        if (!existMail) {
            const passCrypt = await servCrypto.encryptPassword(password)
            const newUser = User.create({
                username,
                email,
                password: passCrypt,
                role: 'user'
            })
            const token = jwt.sign({ id: newUser.id }, 'palabraSecreta', {
                expiresIn: 86400
            })
            return { token }
        } else {
            return { Email: `El Email: ${email} ya existe` }
        }
    }
    async mathPasswotd(bodyPass, bodyEmail) {
        const user = await User.findOne({ where: { Email: bodyEmail } })
        const comparePass = await servCrypto.comparePassword(
            bodyPass,
            user.password
        )
        if (comparePass) {
            const token = jwt.sign({ id: user.id }, 'palabraSecreta', {
                expiresIn: 86400
            })
            return { token }
        } else {
            return { Password: 'Password Incorrecto', token: 'Null' }
        }
    }
}
export default services
