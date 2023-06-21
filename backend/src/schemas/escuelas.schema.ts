import { z } from 'zod'

export const escuelasSchema = z.object({
  cod_escuela: z
    .string()
    .nonempty('Es necesario indicar un código de escuela')
    .max(16, 'El código de escuela es demasiado largo'),
  nombre_esc: z
    .string()
    .nonempty('Es necesario indicar un nombre de escuela')
    .max(32, 'El nombre debe ser menor a 32 carácteres'),
  fecha_creacion: z
    .string()
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
        'La fecha debe estar en formato DD-MM-AAAA y ser una fecha válida'
      }
    )
    .optional()
})
