import { Request, Response } from 'express'
import { pool } from '../database'

import { successItemsResponse } from '../utils/responses'
import StatusError from '../utils/responses/status-error'
import { handleControllerError } from '../utils/responses/handleControllerError'

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

export const getEscuelas = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response = await pool.query('SELECT * FROM escuelas')
    if (response.rowCount === 0) {
      throw new StatusError('La tabla está vacía', STATUS_NOT_FOUND)
    }
    return successItemsResponse(res, STATUS_OK, response.rows)
  } catch (error: unknown) {
    return handleControllerError(error, res)
  }
}
