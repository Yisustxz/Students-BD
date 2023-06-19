import { useState, useEffect } from 'react'
import { getEstudiantes } from '../../../services/estudiantes.services'
import { toast } from 'react-toastify'

const Profesores = () => {
  const [estudiantes, setEstudiantes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEstudiantes()
        console.log(data)
        setEstudiantes(data.items)
        console.log(estudiantes)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchData()
  }, [])

  const getDate = (String) => {
    const fechaString = String
    const fecha = new Date(fechaString)

    const year = fecha.getFullYear() // obtener el año
    const month = fecha.getMonth() + 1 // obtener el mes (los meses empiezan en cero)
    const day = fecha.getDate() // obtener el día
    return year + '/' + month + '/' + day
  }

  return (
    <div className='container mx-auto'>
      <h1 className='flex-w-screen text-center text-4xl font-extrabold my-8 bg-violet-400'>
        Listado de Estudiantes
      </h1>
      <table className='mx-auto'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-2 px-3 text-center'>Id</th>
            <th className='py-2 px-3 text-center'>Cedula</th>
            <th className='py-2 px-3 text-center'>Nombre</th>
            <th className='py-2 px-3 text-center'>Cod Escuela</th>
            <th className='py-2 px-3 text-center'>Direccion</th>
            <th className='py-2 px-3 text-center'>Telefono</th>
            <th className='py-2 px-3 text-center'>Fecha Nacimiento</th>
            <th className='py-2 px-3 text-center'>Status</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((fila, index) => (
            <tr key={index} className='border-b border-gray-200'>
              <td className='py-2 px-3 text-center'>{fila.id_estudiante}</td>
              <td className='py-2 px-3 text-center'>{fila.cedula_est}</td>
              <td className='py-2 px-3 text-center'>{fila.nombre_est}</td>
              <td className='py-2 px-3 text-center'>{fila.cod_escuela}</td>
              <td className='py-2 px-3 text-center'>{fila.direccion_est}</td>
              <td className='py-2 px-3 text-center'>{fila.telefono_est}</td>
              <td className='py-2 px-3 text-center'>
                {getDate(fila.fecha_nac)}
              </td>
              <td className='py-2 px-3 text-center'>{fila.status_est}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Profesores
