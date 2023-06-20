import { useState, useEffect } from 'react'
import {
  deleteProfesor,
  getProfesores
} from '../../../services/profesores.services'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const categoria = {
  A: 'Asistente',
  I: 'Instructor',
  G: 'Agregado',
  S: 'Asociado',
  T: 'Titular'
}

const dedicacion = {
  TC: 'Tiempo Completo',
  MT: 'Medio Tiempo',
  TV: 'Tiempo Convencional'
}

const status = {
  A: 'Activo',
  R: 'Retirado',
  P: 'De Permiso',
  J: 'Jubilado'
}

const Profesores = () => {
  const [profesores, setProfesores] = useState([])

  const fetchData = async () => {
    try {
      const data = await getProfesores(0, 100)
      setProfesores(data.items)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onDelete = async (index) => {
    try {
      const data = await deleteProfesor(index)
      toast.success(data.item)
      fetchData()
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
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
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-center bg-violet-400 my-8 mx-48 rounded-xl'>
          <Link to='/'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3 ml-8'>
              Volver
            </button>
          </Link>
          <h1 className='text-center w-screen text-4xl font-extrabold py-8 bg-violet-400 mr-8'>
            Listado de Profesores
          </h1>
        </div>
        <table className='mx-24'>
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
              <th className='py-2 px-3 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((fila) => (
              <tr
                key={fila.cedula_profesor}
                className='border-b border-gray-200'
              >
                <td className='py-2 px-3 text-center'>
                  {fila.cedula_profesor}
                </td>
                <td className='py-2 px-3 text-center'>{fila.nombre_p}</td>
                <td className='py-2 px-3 text-center'>{fila.direccion_p}</td>
                <td className='py-2 px-3 text-center'>{fila.telefono_p}</td>
                <td className='py-2 px-3 text-center'>
                  {categoria[fila.categoria]}
                </td>
                <td className='py-2 px-3 text-center'>
                  {dedicacion[fila.dedicacion]}
                </td>
                <td className='py-2 px-3 text-center'>
                  {getDate(fila.fecha_ingreso)}
                </td>
                <td className='py-2 px-3 text-center'>
                  {getDate(fila.fecha_egreso)}
                </td>
                <td className='py-2 px-3 text-center'>
                  {status[fila.status_p]}
                </td>
                <td
                  key={fila.cedula_profesor}
                  className='flex justify-center py-3 px-6 text-sm'
                >
                  <>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded-full'>
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(fila.cedula_profesor)}
                      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
                    >
                      Eliminar
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Profesores
