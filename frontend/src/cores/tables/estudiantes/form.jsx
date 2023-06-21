import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { createEstudiante } from '../../../services/estudiantes.services'
import { getEscuelas } from '../../../services/escuelas.services'
import { Link, useNavigate } from 'react-router-dom'

function EstudiantesForm() {
  const [estudiante, setEstudiante] = useState({
    cedula_est: '',
    nombre_est: '',
    cod_escuela: '',
    direccion_est: '',
    telefono_est: null,
    fecha_nac: '',
    status_est: ''
  })

  const [escuelas, setEscuelas] = useState([])

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEstudiante({
      ...estudiante,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createEstudiante(estudiante)
      console.log(response)
      toast.success('Estudiante Creado Satisfactoriamente')
      navigate('/Estudiantes')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchData = async () => {
    try {
      const data = await getEscuelas()
      setEscuelas(data.items)
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='flex items-center justify-center bg-violet-400 my-8 mx-48 rounded-xl'>
        <Link to='/Estudiantes'>
          <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3 ml-8'>
            Volver
          </button>
        </Link>
        <h1 className='text-center w-screen text-4xl font-extrabold py-8 bg-violet-400 mr-24'>
          Crear Estudiante
        </h1>
      </div>
      <form
        className='flex flex-col items-center justify-center container'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-wrap mx-64 mb-6'>
          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-last-name'
            >
              cedula
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-last-name'
              name='cedula_est'
              type='text'
              placeholder='25595817'
              onChange={handleChange}
              value={estudiante.cedula_est}
            />
          </div>

          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Nombre
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              name='nombre_est'
              placeholder='Jane'
              onChange={handleChange}
              value={estudiante.nombre_est}
            />
          </div>

          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              escuela del estudiante
            </label>
            <select
              data-te-select-init
              className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500  bg-gray-200 dark:border-gray-700 dark:text-gray-400'
              name='cod_escuela'
              onChange={handleChange}
              value={estudiante.cod_escuela}
            >
              <option value=''>--</option>
              {escuelas.map((escuela) => (
                <option key={escuela.cod_escuela} value={escuela.cod_escuela}>
                  {escuela.cod_escuela}
                </option>
              ))}
            </select>
          </div>

          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='address'
            >
              Direccion
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='address'
              name='direccion_est'
              type='text'
              placeholder='Avenida Guayana'
              onChange={handleChange}
              value={estudiante.direccion_est}
            />
          </div>

          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='phone'
            >
              Numero de Telefono
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='phone'
              name='telefono_est'
              type='text'
              placeholder='04147691677'
              onChange={handleChange}
              value={estudiante.telefono_est}
            />
          </div>

          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='birth'
            >
              Fecha de Nacimiento
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2'
              id='birth'
              name='fecha_nac'
              type='date'
              min='1970-01-01'
              max='2020-12-31'
              onChange={handleChange}
              value={estudiante.fecha_nac}
            />
          </div>

          <div className='w-full md:w-1/2 px-3'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
              estatus del estudiante
            </label>
            <select
              data-te-select-init
              className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500  bg-gray-200 dark:border-gray-700 dark:text-gray-400'
              name='status_est'
              onChange={handleChange}
              value={estudiante.status_est}
            >
              <option value=''>--</option>
              <option value='A'>Activo</option>
              <option value='R'>Retirado</option>
              <option value='N'>No inscrito</option>
              <option value='E'>Egresado</option>
            </select>
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Procesar
        </button>
      </form>
    </>
  )
}

export default EstudiantesForm
