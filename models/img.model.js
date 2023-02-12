import { DataTypes } from 'sequelize'
import db_Conect from '../db/sqlite.js'

const Img = db_Conect.define(
    'Img',
    {
        public_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secure_url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

export default Img
