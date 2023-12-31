import { Response } from 'express'
import StatusError from './status-error'
import { errorResponse } from './responses'

const STATUS_INTERNAL_SERVER_ERROR = 500
// const INTERNAL_SERVER_ERROR = 'Ha ocurrido un error interno del servidor.'

export const handleControllerError = (error: any, res: Response): Response => {
  if (error instanceof StatusError) {
    return errorResponse(res, error.getStatus(), error.message)
  }
  return errorResponse(res, STATUS_INTERNAL_SERVER_ERROR, error.detail)
}
