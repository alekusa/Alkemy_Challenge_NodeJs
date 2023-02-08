import movieServices from '../services/movie.service.js'
const serv = new movieServices()

export const getMovies = async (req, res) => {
    try {
        res.status(200).json(await serv.getAllMovies(req.query))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getMoviesList = async (req, res) => {
    try {
        res.status(200).json(await serv.getMoviesList(req.query))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getMovie = async (req, res) => {
    try {
        res.status(200).json(await serv.getMovie(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getMovieDetail = async (req, res) => {
    try {
        res.status(200).json(await serv.getMovieDetail(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
