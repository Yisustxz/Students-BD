/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express'
import { pool } from '../database'

import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError'

const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_BAD_REQUEST = 400
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

const validatePageAndSize = (
  page: any,
  size: any
): [number, number] | string => {
  let pageAsNumber: number
  let sizeAsNumber: number

  if (!isNaN(Number(page)) && Number.isInteger(Number(page))) {
    pageAsNumber = Number.parseInt(page)
    if (pageAsNumber < 1) {
      pageAsNumber = 1
    }
  } else {
    return 'La página debe ser un número entero'
  }

  if (!isNaN(Number(size)) && Number.isInteger(Number(size))) {
    sizeAsNumber = Number.parseInt(size)
    if (sizeAsNumber < 1) {
      sizeAsNumber = 1
    }
  } else {
    return 'La tamaño debe ser un número entero'
  }

  return [pageAsNumber, sizeAsNumber]
}

export const getEstudiantes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query
  const validatedParams = validatePageAndSize(page, size)

  try {
    if (typeof validatedParams === 'string') {
      throw new StatusError(validatedParams, STATUS_BAD_REQUEST)
    }

    const [pageAsNumber, sizeAsNumber] = validatedParams

    let offset = (pageAsNumber - 1) * sizeAsNumber

    if (pageAsNumber < 1) {
      offset = 0
    }

    const isEmpty = await pool.query({ text: 'SELECT * FROM estudiantes' })
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM estudiantes ORDER BY id_estudiante LIMIT $1 OFFSET $2',
      values: [sizeAsNumber, offset]
    })
    const pagination: PaginateSettings = {
      total: isEmpty.rowCount,
      currentPage: pageAsNumber,
      perPage: sizeAsNumber
    }
    return paginatedItemsResponse(res, STATUS_OK, response.rows, pagination)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const getEstudianteById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM estudiantes WHERE id_estudiante = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el estudiante de ID: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEstudianteDataFromRequestBody = (
  requestBody: any
): Array<string | number> => {
  const {
    cedula_est,
    nombre_est,
    cod_escuela,
    direccion_est,
    telefono_est,
    fecha_nac,
    status_est
  } = requestBody

  const newEstudiante = [
    cedula_est,
    nombre_est,
    cod_escuela,
    direccion_est,
    telefono_est,
    fecha_nac,
    status_est
  ]

  return newEstudiante
}

export const addEstudiante = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEstudiante = getEstudianteDataFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO estudiantes (cedula_est, nombre_est, cod_escuela, direccion_est, telefono_est, fecha_nac, status_est) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cedula_est',
      values: newEstudiante
    })
    const insertedId: string = insertar.rows[0].cedula_est
    const response = await pool.query({
      text: 'SELECT * FROM estudiantes WHERE cedula_est = $1',
      values: [insertedId]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const updateEstudiante = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEstudiante = getEstudianteDataFromRequestBody(req.body)
    updatedEstudiante.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE estudiantes SET cedula_est = $1, nombre_est = $2, cod_escuela = $3, direccion_est = $4, telefono_est = $5, fecha_nac = $6, status_est = $7 WHERE id_estudiante = $8',
      values: updatedEstudiante
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el estudiante de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    if (response.rowCount === 0) {
      return successResponse(
        res,
        STATUS_OK,
        'Operación PUT exitosa pero el contenido del registro no cambió'
      )
    }
    return successResponse(res, STATUS_OK, 'estudiante modificado exitosamente')
  } catch (error: unknown) {
    console.log(error)
    return handleControllerError(error, res)
  }
}

export const deleteEstudiante = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM estudiantes WHERE id_estudiante = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el estudiante de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'estudiante eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
