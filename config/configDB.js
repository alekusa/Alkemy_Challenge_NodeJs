import User from '../models/user.model.js'
import db_Conect from '../db/sqlite.js'
import serviceEncryption from '../services/encryption.service.js'
import { NEW_INSTALL } from './config.js'
const servCrypt = new serviceEncryption()
const cargarDatosUser = async () => {
    if (NEW_INSTALL == 'true') {
        await db_Conect.sync({ force: true })
        await User.bulkCreate([
            {
                username: 'Alexis Kuseman',
                password: await servCrypt.encryptPassword('password'),
                email: 'alekusa@gmail.com',
                role: 'admin'
            },
            {
                username: 'Jose pequerman',
                password: await servCrypt.encryptPassword('password'),
                email: 'josePequerman@gmail.com',
                role: 'user'
            },
            {
                username: 'David Aliases',
                password: await servCrypt.encryptPassword('password'),
                email: 'davidaliaces@gmail.com',
                role: 'user'
            },
            {
                username: 'Mario Estefano',
                password: await servCrypt.encryptPassword('password'),
                email: 'marioestefano@gmail.com',
                role: 'user'
            },
            {
                username: 'Rojelio Gonzalez',
                password: await servCrypt.encryptPassword('password'),
                email: 'rojeliogonzalez@gmail.com',
                role: 'user'
            }
        ])
        return
    }
}
export default cargarDatosUser
