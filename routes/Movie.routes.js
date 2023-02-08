import { Router } from 'express'
import {
    getMovie,
    getMovies,
    getMoviesList
} from '../controllers/movie.controller.js'
const router = Router()

router.get('/moviesList', getMoviesList)
router.get('/movies', getMovies)
router.get('/movie/:id', getMovie)

export default router
