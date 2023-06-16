import express from 'express'

import profesoresRouter from './api/profesores'
import escuelasRouter from './api/escuelas'
import estudiantesRouter from './api/estudiantes'

const router = express.Router()

router.use('/profesores', profesoresRouter)
router.use('/escuelas', escuelasRouter)
router.use('/estudiantes', estudiantesRouter)

export default router
