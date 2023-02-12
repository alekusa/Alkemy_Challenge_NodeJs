import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const Genre = db_Conect.define(
    'Genre',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
)

export default Genre
