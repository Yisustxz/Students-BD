import { Router } from 'express'
import {
  getEscuelas,
  getEscuelaById,
  addEscuela,
  deleteEscuela,
  updateEscuela
} from '../../controllers/escuelas.controller'
import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { escuelasSchema } from '../../schemas/escuelas.schema'
import { schemaValidator } from '../../middlewares/schemaValidator'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', reqQueryValidator(), getEscuelas)
router.get('/:id', idParamValidator(), getEscuelaById)
router.post('/', schemaValidator(escuelasSchema), addEscuela)
router.put('/:id', idParamValidator(), updateEscuela)
router.delete('/:id', idParamValidator(), deleteEscuela)

export default router
