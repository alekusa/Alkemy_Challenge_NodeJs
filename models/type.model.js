import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const Type = db_Conect.define('Type', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Type
