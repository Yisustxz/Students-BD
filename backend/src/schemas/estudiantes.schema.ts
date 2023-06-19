import { z } from 'zod'

export const estudiantesSchema = z.object({
  cedula_est: z
    .string()
    .nonempty('Es necesario indicar una cedula de identidad')
    .min(6, 'La cédula es demasiado corta')
    .max(10, 'La cédula es demasiado larga')
    .regex(/^\d+$/, {
      message: 'La cédula debe contener solo números'
    }),
  nombre_est: z
    .string()
    .nonempty('Es necesario indicar un nombre')
    .max(24, 'El nombre debe ser menor a 24 carácteres'),
  cod_escuela: z
    .string()
    .nonempty('Es necesario indicar la escuela a la que pertenecerá el estudiante'),
  direccion_est: z
    .string()
    .nonempty('Es necesario indicar una dirección'),
  telefono_est: z
    .string()
    .min(11, 'El número de teléfono debe ser de 11 carácteres numéricos')
    .max(11, 'El número de teléfono debe ser de 11 carácteres numéricos')
    .regex(/^\d+$/, {
      message: 'El número de teléfono debe contener solo números'
    })
    .optional(),
  fecha_nac: z
    .string()
    .refine(
      (fecha) => {
        const regex = /^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/
        return regex.test(fecha)
      },
      {
        message:
        'La fecha debe estar en formato AAAA-MM-DD y ser una fecha válida'
      }
    ),
  status_est: z.enum(['A', 'R', 'N', 'E'])
})
