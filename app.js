import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

import userRoutes from './routes/user.routes.js'
import indexRoutes from './routes/index.routes.js'
//* Crea tablas las llena de datos
import cargarDatosUser from './config/configDB.js'
cargarDatosUser()
//*Rutas
app.use(userRoutes, indexRoutes)

export default app
