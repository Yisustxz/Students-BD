import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'
import { errorResponse, errorResponseWithField } from '../utils/responses'

export const schemaValidator =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body)
        return next()
      } catch (error) {
        if (error instanceof ZodError) {
          return errorResponseWithField(res, 400, error.issues[0].path[0], error.issues[0].message)
          // return res
          //   .status(400)
          //   .json(
          //     error.issues.map((issue) => ({
          //       sucess: false,
          //       field: issue.path[0],
          //       message: issue.message
          //     }))
          //   )
        }
        return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR')
      }
    }
