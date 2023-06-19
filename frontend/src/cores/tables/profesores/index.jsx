import { useState, useEffect } from 'react'
import { getProfesores } from '../../../services/profesores.services'
import { toast } from 'react-toastify'

const Profesores = () => {
  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfesores()
        setProfesores(data.items)
        console.log(profesores.status_p)
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
        Listado de Profesores
      </h1>
      <table className='mx-auto'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            <th className='py-2 px-3 text-center'>Cedula</th>
            <th className='py-2 px-3 text-center'>Nombre</th>
            <th className='py-2 px-3 text-center'>Direccion</th>
            <th className='py-2 px-3 text-center'>Telefono</th>
            <th className='py-2 px-3 text-center'>Categoria</th>
            <th className='py-2 px-3 text-center'>Dedicacion</th>
            <th className='py-2 px-3 text-center'>Fecha Ingreso</th>
            <th className='py-2 px-3 text-center'>Fecha Egreso</th>
            <th className='py-2 px-3 text-center'>Status</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map((fila, index) => (
            <tr key={index} className='border-b border-gray-200'>
              <td className='py-2 px-3 text-center'>{fila.cedula_profesor}</td>
              <td className='py-2 px-3 text-center'>{fila.nombre_p}</td>
              <td className='py-2 px-3 text-center'>{fila.direccion_p}</td>
              <td className='py-2 px-3 text-center'>{fila.telefono_p}</td>
              <td className='py-2 px-3 text-center'>{fila.categoria}</td>
              <td className='py-2 px-3 text-center'>{fila.dedicacion}</td>
              <td className='py-2 px-3 text-center'>
                {getDate(fila.fecha_ingreso)}
              </td>
              <td className='py-2 px-3 text-center'>
                {getDate(fila.fecha_egreso)}
              </td>
              <td className='py-2 px-3 text-center'>{fila.status_p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Profesores
