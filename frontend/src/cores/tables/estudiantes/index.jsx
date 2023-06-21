import { useState, useEffect } from 'react'
import {
  deleteEstudiante,
  getEstudiantes
} from '../../../services/estudiantes.services'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const status = {
  A: 'Activo',
  R: 'Retirado',
  N: 'No inscrito',
  E: 'Egresado'
}

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([])

  const fetchData = async () => {
    try {
      const data = await getEstudiantes(0, 100)
      setEstudiantes(data.items)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onDelete = async (index) => {
    try {
      const data = await deleteEstudiante(index)
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
            Listado de Estudiantes
          </h1>
        </div>
        <div className='flex justify-center'>
          <Link className='flex w-full justify-center' to='/EstudiantesForm'>
            <button className='text-violet-600 w-2/4 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3 mr-8'>
              Añadir Estudiantes
            </button>
          </Link>
        </div>
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
              <th className='py-2 px-3 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((fila) => (
              <tr key={fila.id_estudiante} className='border-b border-gray-200'>
                <td className='py-2 px-3 text-center'>{fila.id_estudiante}</td>
                <td className='py-2 px-3 text-center'>{fila.cedula_est}</td>
                <td className='py-2 px-3 text-center'>{fila.nombre_est}</td>
                <td className='py-2 px-3 text-center'>{fila.cod_escuela}</td>
                <td className='py-2 px-3 text-center'>{fila.direccion_est}</td>
                <td className='py-2 px-3 text-center'>{fila.telefono_est}</td>
                <td className='py-2 px-3 text-center'>
                  {getDate(fila.fecha_nac)}
                </td>
                <td className='py-2 px-3 text-center'>
                  {status[fila.status_est]}
                </td>
                <td
                  key={fila.id_estudiante}
                  className='flex justify-center py-3 px-6 text-sm'
                >
                  <>
                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded-full'>
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(fila.id_estudiante)}
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

export default Estudiantes
