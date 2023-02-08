import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())

//* Crea tablas las llena de datos
import { NEW_INSTALL } from './config/config.js'
import db_Configuration from './config/configDB.js'
db_Configuration({ data: NEW_INSTALL })

//*Rutas
import indexRoutes from './routes/index.routes.js'
import userRoutes from './routes/user.routes.js'
import movieRoutes from './routes/Movie.routes.js'

app.use(userRoutes, indexRoutes, movieRoutes)

export default app
