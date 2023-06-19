import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

export const schemaValidator =
  (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body)
        return next()
      } catch (error) {
        if (error instanceof ZodError) {
          return res
            .status(400)
            .json(
              error.issues.map((issue) => ({
                field: issue.path[0],
                message: issue.message
              }))
            )
        }
        return res.status(500).json({ message: 'ISE' })
      }
    }
