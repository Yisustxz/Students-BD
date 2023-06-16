import { Request, Response } from 'express'
import { pool } from '../database'

import {
  PaginateSettings,
  paginatedItemsResponse,
  successItemsResponse,
  successResponse
} from '../utils/responses'
import { parseName } from '../utils/parsers'
import StatusError from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

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

export const getProfesores = async (
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

    const isEmpty = await pool.query('SELECT * FROM profesores')
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query(
      'SELECT * FROM profesores LIMIT $1 OFFSET $2',
      [sizeAsNumber, offset]
    )
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

export const getProfesorById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query(
      'SELECT * FROM profesores WHERE cedula_profesor = $1',
      [req.params.profesorId]
    )
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.profesorId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getProfesorDataFromRequestBody = (
  requestBody: any
): Array<string | number> => {
  const newProfesor: Array<string | number> = []
  newProfesor.push(parseName(requestBody.nombre))
  return newProfesor
}

export const addProfesor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newProfesor = getProfesorDataFromRequestBody(req.body)

    const insertar = await pool.query(
      'INSERT INTO profesor (cedula_profesor, nombre_p, direccion_p, telefono_p, categoria, dedicacion, fecha_ingreso, fecha_egreso, status_p) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING cedula_profesor',
      newProfesor
    )
    const insertedId: string = insertar.rows[0].id_estado
    const response = await pool.query(
      `SELECT * FROM profesores WHERE cedula_profesor = ${insertedId}`
    )
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateProfesor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedProfesor = getProfesorDataFromRequestBody(req.body)
    const response = await pool.query(
      'UPDATE profesores SET nombre = $1 WHERE cedula_profesor = $2',
      [updatedProfesor, req.params.profesorId]
    )
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.profesorId}`,
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
    return successResponse(res, STATUS_OK, 'Profesor modificado exitosamente')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteProfesor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query(
      'DELETE FROM profesores WHERE cedula_profesor = $1',
      [req.params.profesorId]
    )
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.profesorId}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Profesor eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
