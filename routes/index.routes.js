import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
    res.send('Ruta home index')
})

export default router
