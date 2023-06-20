import { Router } from 'express'
import {
  getEscuelas,
  getEscuelaById,
  addEscuela,
  deleteEscuela,
  updateEscuela
} from '../../controllers/escuelas.controller'
import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { escuelasSchema } from '../../schemas/escuelas.schema'
import { schemaValidator } from '../../middlewares/schemaValidator'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', reqQueryValidator(), getEscuelas)
router.get('/:id', getEscuelaById)
router.post('/', schemaValidator(escuelasSchema), addEscuela)
router.put('/:id', updateEscuela)
router.delete('/:id', deleteEscuela)

export default router
