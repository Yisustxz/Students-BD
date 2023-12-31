import { Router } from 'express'
import {
  getProfesores,
  getProfesorById,
  addProfesor,
  deleteProfesor,
  updateProfesor
} from '../../controllers/profesores.controller'
import { reqQueryValidator } from '../../middlewares/reqQueryPageSizeValidator'
import { idParamValidator } from '../../middlewares/idParamValidator'
import { profesoresSchema } from '../../schemas/profesores.schema'
import { schemaValidator } from '../../middlewares/schemaValidator'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', reqQueryValidator(), getProfesores)
router.get('/:id', idParamValidator(), getProfesorById)
router.post('/', schemaValidator(profesoresSchema), addProfesor)
router.put('/:id', idParamValidator(), schemaValidator(profesoresSchema), updateProfesor)
router.delete('/:id', idParamValidator(), deleteProfesor)

export default router
