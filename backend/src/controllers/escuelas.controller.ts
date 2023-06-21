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

export const getEscuelas = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page = DEFAULT_PAGE, size = DEFAULT_SIZE } = req.query

  try {
    let offset = (Number(page) - 1) * Number(size)

    if (Number(page) < 1) {
      offset = 0
    }

    const isEmpty = await pool.query({ text: 'SELECT * FROM escuelas' })
    if (isEmpty.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    const response = await pool.query({
      text: 'SELECT * FROM escuelas ORDER BY cod_escuela LIMIT $1 OFFSET $2',
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

export const getEscuelaById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'SELECT * FROM escuelas WHERE cod_escuela = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar la escuela de Codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

const getEscuelaDataFromRequestBody = (requestBody: any): any[] => {
  const { cod_escuela, nombre_esc, fecha_creacion } = requestBody
  let newEscuela
  if (fecha_creacion != null) {
    newEscuela = [cod_escuela, nombre_esc, fecha_creacion]
  } else {
    newEscuela = [cod_escuela, nombre_esc]
  }

  return newEscuela
}

export const addEscuela = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const newEscuela = getEscuelaDataFromRequestBody(req.body)
    let query =
      'INSERT INTO escuelas (cod_escuela, nombre_esc, fecha_creacion) VALUES ($1, $2, $3) RETURNING cod_escuela'

    if (newEscuela.length === 2) {
      query =
        'INSERT INTO escuelas (cod_escuela, nombre_esc) VALUES ($1, $2) RETURNING cod_escuela'
    }

    const insertar = await pool.query({
      text: query,
      values: newEscuela
    })
    const insertedId: string = insertar.rows[0].cod_escuela
    const response = await pool.query({
      text: 'SELECT * FROM escuelas WHERE cod_escuela = $1',
      values: [insertedId]
    })
    return successItemsResponse(res, STATUS_CREATED, response.rows[0])
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const updateEscuela = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const updatedEscuela = getEscuelaDataFromRequestBody(req.body)
    updatedEscuela.push(req.params.id)
    const response = await pool.query({
      text: 'UPDATE escuelas SET cod_escuela = $1, nombre_esc = $2, fecha_creacion = $3 WHERE cod_escuela = $4',
      values: updatedEscuela
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar la escuela de Codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'Escuela modificado exitosamente')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}

export const deleteEscuela = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({
      text: 'DELETE FROM escuelas WHERE cod_escuela = $1',
      values: [req.params.id]
    })
    if (response.rowCount === 0) {
      throw new StatusError(
        `No se pudo encontrar la escuela de Codigo: ${req.params.id}`,
        STATUS_NOT_FOUND
      )
    }
    return successResponse(res, STATUS_OK, 'La escuela ha sido eliminada')
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
