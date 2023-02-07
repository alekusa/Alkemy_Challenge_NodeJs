import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const Character = db_Conect.define(
    'Character',
    {
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        weigth: {
            type: DataTypes.FLOAT
        },
        history: {
            type: DataTypes.STRING
        }
    },
    {}
)

export default Character
