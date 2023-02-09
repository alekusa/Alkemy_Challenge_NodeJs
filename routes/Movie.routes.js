import { Router } from 'express'
import {
    addMovie,
    deletedMovie,
    getMovie,
    getMovieDetail,
    getMovies,
    getMoviesList,
    updateMovie
} from '../controllers/movie.controller.js'
const router = Router()

router.get('/movieList', getMoviesList)
router.get('/movie', getMovies)
router.get('/movie/:id', getMovie)
router.get('/movie/:id/detail', getMovieDetail)
router.post('/movie', addMovie)
router.delete('/movie/:id', deletedMovie)
router.put('/movie/:id', updateMovie)

export default router
