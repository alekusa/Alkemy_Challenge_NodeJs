import services from '../services/user.service.js'
const serv = new services()

export const getUsers = async (req, res) => {
    try {
        res.status(200).json(await serv.getUsers())
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const addUser = async (req, res) => {
    try {
        res.status(200).json(await serv.setUser(req.body))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const deleteUser = async (req, res) => {
    try {
        res.status(200).json(await serv.deleteUser(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getUser = async (req, res) => {
    try {
        res.status(200).json(await serv.getUser(req.params))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const updateUser = async (req, res) => {
    try {
        res.status(200).json(await serv.updateUser(req.params, req.body))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const signUp = async (req, res) => {
    try {
        res.status(200).json(await serv.signUp(req.body))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const singIn = async (req, res) => {
    try {
        res.status(200).json(
            await serv.mathPasswotd(req.body.password, req.body.email)
        )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
