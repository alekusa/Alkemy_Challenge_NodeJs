import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'
import Genre from './genre.model.js'
import Type from './type.model.js'

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
        },
        genre: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.INTEGER
        }
    },
    {}
)

export default Movie
Movie.belongsTo(Genre, { foreignKey: 'genre' })
Movie.belongsTo(Type, { foreignKey: 'type' })
