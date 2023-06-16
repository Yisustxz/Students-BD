import { Router } from 'express'
import {
  getEstudiantes,
  getEstudianteById,
  addEstudiante,
  deleteEstudiante,
  updateEstudiante
} from '../../controllers/estudiantes.controller'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEstudiantes)
router.get('/:estudianteId', getEstudianteById)
router.post('/', addEstudiante)
router.put('/:estudianteId', updateEstudiante)
router.delete('/:estudianteId', deleteEstudiante)

export default router
