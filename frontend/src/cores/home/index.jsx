import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProfesores } from '../../services/profesores.services'
import { getEstudiantes } from '../../services/estudiantes.services'
import { getEscuelas } from '../../services/escuelas.services'

function Home() {
  const [profesoresQuantity, setProfesoresQuantity] = useState()
  const [estudiantesQuantity, setEstudiantesQuantity] = useState()
  const [escuelasQuantity, setEscuelasQuantity] = useState()

  const loadHomeInfo = async () => {
    try {
      const profesoresData = await getProfesores()
      const estudiantesData = await getEstudiantes()
      const escuelasData = await getEscuelas()
      setProfesoresQuantity(profesoresData.paginate.total)
      setEstudiantesQuantity(estudiantesData.paginate.total)
      setEscuelasQuantity(escuelasData.paginate.total)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadHomeInfo()
  }, [])

  return (
    <div className='flex flex-col items-center justify-evenly w-screen h-screen'>
      <div className='flex w-screen justify-center bg-violet-400'>
        <h2 className='text-5xl font-extrabold py-10 w-1/3 text-center self-center'>
          Sistema de Administración Estudiantil
        </h2>
      </div>
      <div className='flex flex-row w-full justify-evenly text-center'>
        <div className='flex flex-col items-center md:w-1/4 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold my-8'>
            Escuelas: {escuelasQuantity}
          </h2>
          <Link to='/Escuelas'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3'>
              Ir a escuelas
            </button>
          </Link>
        </div>

        <div className='w-full md:w-1/4 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold my-8 '>
            Profesores: {profesoresQuantity}
          </h2>
          <Link to='/Profesores'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3'>
              Ir a profesores
            </button>
          </Link>
        </div>

        <div className='flex flex-col items-center md:w-1/4 px-3 border-4 rounded-lg hover:border-violet-300'>
          <h2 className='text-4xl font-extrabold my-8'>
            Estudiantes: {estudiantesQuantity}
          </h2>
          <Link to='/Estudiantes'>
            <button className='text-violet-600 bg-[#f9f9f9] rounded-lg text-[1em] font-medium cursor-pointer px-[0.6em] py-[1em] transition-all border-2 hover:border-violet-400 mb-3'>
              Ir a estudiantes
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
