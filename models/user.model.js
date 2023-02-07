import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const User = db_Conect.define(
    'User',
    {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Deve ingresar Email, correcto'
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    },
    {}
)

export default User
