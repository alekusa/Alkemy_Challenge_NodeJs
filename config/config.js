import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const NEW_INSTALL = process.env.NEW_INSTALL || 'false' //! Colocar en true en la primera instalacion
