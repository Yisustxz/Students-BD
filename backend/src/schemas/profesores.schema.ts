import { z } from 'zod'

export const profesoresSchema = z.object({
  cedula_profesor: z
    .string()
    .nonempty('Es necesario indicar una cedula de identidad')
    .min(6, 'La cédula es demasiado corta')
    .max(10, 'La cédula es demasiado larga')
    .regex(/^\d+$/, 'La cédula debe contener solo números'),
  nombre_p: z
    .string()
    .nonempty('Es necesario indicar un nombre')
    .max(24, 'El nombre debe ser menor a 24 carácteres'),
  direccion_p: z
    .string()
    .nonempty('Es necesario indicar una dirección'),
  telefono_p: z
    .string()
    .min(11, 'El número de teléfono debe ser de 11 carácteres numéricos')
    .max(11, 'El número de teléfono debe ser de 11 carácteres numéricos')
    .regex(/^\d+$/, 'El número de teléfono debe contener solo números')
    .optional(),
  categoria: z
    .enum(['A', 'I', 'G', 'S', 'T']),
  dedicacion: z
    .enum(['TC', 'MT', 'TV']),
  fecha_ingreso: z
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
    .optional(),
  fecha_egreso: z.nullable(z
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
  ),
  status_p: z.enum(['A', 'R', 'P', 'J'])
})
