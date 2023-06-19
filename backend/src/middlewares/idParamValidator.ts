import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

const schema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "El parámetro 'id' debe ser un número")
})

export const idParamValidator =
  () =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.params)
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
