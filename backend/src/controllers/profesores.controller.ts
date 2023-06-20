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
const STATUS_NOT_FOUND = 404

const DEFAULT_PAGE = 1
const DEFAULT_SIZE = 10

export const getProfesores = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query({ text: 'SELECT * FROM profesores' })
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM profesores ORDER BY nombre_p LIMIT $1 OFFSET $2',
      values: [size, offset]
    })
    const pagination: PaginateSettings = {
      total: isEmpty.rowCount,
      currentPage: Number(page),
      perPage: Number(size)
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
    const response = await pool.query({
      text: 'SELECT * FROM profesores WHERE cedula_profesor = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.id}`,
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
): any[] => {
  const {
    cedula_profesor,
    nombre_p,
    direccion_p,
    telefono_p,
    categoria,
    dedicacion,
    fecha_ingreso,
    fecha_egreso,
    status_p
  } = requestBody

  const newProfesor = [
    cedula_profesor,
    nombre_p,
    direccion_p,
    telefono_p,
    categoria,
    dedicacion,
    fecha_ingreso,
    fecha_egreso,
    status_p
  ]

  return newProfesor
}

export const addProfesor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newProfesor = getProfesorDataFromRequestBody(req.body)

    const insertar = await pool.query({
      text: 'INSERT INTO profesores (cedula_profesor, nombre_p, direccion_p, telefono_p, categoria, dedicacion, fecha_ingreso, fecha_egreso, status_p) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING cedula_profesor',
      values: newProfesor
    })
    const insertedId: string = insertar.rows[0].cedula_profesor
    const response = await pool.query({
      text: 'SELECT * FROM profesores WHERE cedula_profesor = $1',
      values: [insertedId]
    })
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
    updatedProfesor.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE profesores SET cedula_profesor = $1, nombre_p = $2, direccion_p = $3, telefono_p = $4, categoria = $5, dedicacion = $6, fecha_ingreso = %7, fecha_egreso = $8, status_p = $9 WHERE cedula_profesor = $10',
      values: updatedProfesor
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
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
    const response = await pool.query({
      text: 'DELETE FROM profesores WHERE cedula_profesor = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar el profesor de CI: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'El profesor ha sido eliminado')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
