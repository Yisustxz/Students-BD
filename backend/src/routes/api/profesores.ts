import { Router } from 'express'
import {
  getProfesores,
  getProfesorById,
  addProfesor,
  deleteProfesor,
  updateProfesor
} from '../../controllers/profesores.controller'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getProfesores)
router.get('/:profesorId', getProfesorById)
router.post('/', addProfesor)
router.put('/:profesorId', updateProfesor)
router.delete('/:profesorId', deleteProfesor)

export default router
