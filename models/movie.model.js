import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const Movie = db_Conect.define(
    'Movie',
    {
        img: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        creationData: {
            type: DataTypes.STRING
        },
        calification: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        }
    },
    {}
)

export default Movie
