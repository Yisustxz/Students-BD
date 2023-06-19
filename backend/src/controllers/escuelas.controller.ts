import { Request, Response } from 'express'
import { pool } from '../database'

import { successItemsResponse } from '../utils/responses'
import StatusError from '../utils/status-error'
import { handleControllerError } from '../utils/handleControllerError'

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

export const getEscuelas = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query({ text: 'SELECT * FROM escuelas' })
    if (response.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    return successItemsResponse(res, STATUS_OK, response.rows)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
