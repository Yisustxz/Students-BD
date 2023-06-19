import { Router } from 'express'
import {
  getEstudiantes,
  getEstudianteById,
  addEstudiante,
  deleteEstudiante,
  updateEstudiante
} from '../../controllers/estudiantes.controller'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { estudiantesSchema } from '../../schemas/estudiantes.schema'
import { schemaValidator } from '../../middlewares/schemaValidator'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEstudiantes)
router.get('/:id', idParamValidator(), getEstudianteById)
router.post('/', schemaValidator(estudiantesSchema), addEstudiante)
router.put('/:id', idParamValidator(), updateEstudiante)
router.delete('/:id', idParamValidator(), deleteEstudiante)

export default router
