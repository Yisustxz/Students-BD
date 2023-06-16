import { Router } from 'express'
import {
  getEscuelas
} from '../../controllers/escuelas.controller'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */
router.get('/', getEscuelas)

export default router
