import { useState } from 'react'
import { toast } from 'react-toastify'
import { createEscuela } from '../../../services/escuelas.services'
import { Link, useNavigate } from 'react-router-dom'

function EscuelasForm() {
  const [escuela, setEscuela] = useState({
    cod_escuela: '',
    nombre_esc: '',
    fecha_creacion: null
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setEscuela({
      ...escuela,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createEscuela(escuela)
      console.log(response)
      toast.success('Escuela Creada Satisfactoriamente')
      navigate('/Escuelas')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className='flex items-center justify-center bg-violet-400 my-8 mx-48 rounded-xl'>
        <Link to='/Escuelas'>
          <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3 ml-8'>
            Volver
          </button>
        </Link>
        <h1 className='text-center w-screen text-4xl font-extrabold py-8 bg-violet-400 mr-24'>
          Crear Escuela
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
              Codigo escuela
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-last-name'
              name='cod_escuela'
              type='text'
              placeholder='ESC01'
              onChange={handleChange}
              value={escuela.cod_escuela}
            />
          </div>

          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Nombre de la Escuela
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='grid-first-name'
              type='text'
              name='nombre_esc'
              placeholder='Escuela de Ingenieria'
              onChange={handleChange}
              value={escuela.nombre_esc}
            />
          </div>

          <div className='w-full md:w-1/2 px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='birth'
            >
              Fecha de Creación
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-2'
              id='birth'
              name='fecha_nac'
              type='date'
              min='1970-01-01'
              max='2020-12-31'
              onChange={handleChange}
              value={escuela.fecha_nac}
            />
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

export default EscuelasForm
