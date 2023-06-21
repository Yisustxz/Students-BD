import { useState, useEffect } from 'react'
import { deleteEscuela, getEscuelas } from '../../../services/escuelas.services'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Escuelas = () => {
  const [escuelas, setEscuelas] = useState([])

  const fetchData = async () => {
    try {
      const data = await getEscuelas(0, 100)
      setEscuelas(data.items)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onDelete = async (index) => {
    try {
      const data = await deleteEscuela(index)
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

    const year = fecha.getFullYear()
    let month = fecha.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day = fecha.getDate()
    if (day < 10) {
      day = '0' + day
    }
    return day + '/' + month + '/' + year
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
          <h1 className='text-center w-screen text-4xl font-extrabold py-8 bg-violet-400 mr-24'>
            Listado de Escuelas
          </h1>
        </div>
        <div className='flex justify-center'>
          <Link className='flex w-full justify-center' to='/EscuelasForm'>
            <button className='text-violet-600 w-2/4 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3 mr-8'>
              Crear Escuela
            </button>
          </Link>
        </div>
        <table className='mx-auto'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-2 px-3 text-center'>Código de escuela</th>
              <th className='py-2 px-3 text-center'>Nombre de Escuela</th>
              <th className='py-2 px-3 text-center'>Fecha de Creación</th>
              <th className='py-2 px-3 text-center'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {escuelas.map((fila) => (
              <tr key={fila.cod_escuela} className='border-b border-gray-200'>
                <td className='py-2 px-3 text-center'>{fila.cod_escuela}</td>
                <td className='py-2 px-3 text-center'>{fila.nombre_esc}</td>
                <td className='py-2 px-3 text-center'>
                  {getDate(fila.fecha_creacion)}
                </td>
                <td
                  key={fila.cod_escuela}
                  className='flex justify-center py-3 px-6 text-sm'
                >
                  <>
                    <button
                      // onClick={() => edit}
                      className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded-full'
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(fila.cod_escuela)}
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

export default Escuelas
