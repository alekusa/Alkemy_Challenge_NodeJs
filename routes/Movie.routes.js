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
import { isAdmin, veryfyToken } from '../middleware/auth.middleware.js'

router.get('/movieList', veryfyToken, getMoviesList)
router.get('/movie/:id', veryfyToken, getMovie)
router.get('/movie', veryfyToken, getMovies)
router.get('/movie/:id/detail', veryfyToken, getMovieDetail)
router.post('/movie', [veryfyToken, isAdmin], addMovie)
router.delete('/movie/:id', [veryfyToken, isAdmin], deletedMovie)
router.put('/movie/:id', [veryfyToken, isAdmin], updateMovie)

router.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

export default router
